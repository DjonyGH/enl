import { appConfig } from "configs/app.config";
import { map } from "lodash";
import { DateTime } from "luxon";
import * as XLSX from "sheetjs-style";
import { TCodeTitlePair } from "types/common.types";

export const tools = {
  emulateSleep(isPrototype = true): Promise<void> {
    if (isPrototype) {
      return new Promise((resolve) =>
        setTimeout(resolve, appConfig.mockTimeout)
      );
    }
    return Promise.resolve();
  },

  codeTitlePairsFromObject: (obj: any): TCodeTitlePair[] =>
    map(obj, (value, prop) => ({ code: prop, title: value })),

  isEkp(): boolean {
    return "CefSharp" in window;
  },

  dateToString2(date: Date): string {
    return DateTime.fromJSDate(date).toFormat("dd.MM.yyyy, HH:mm");
  },

  exportXLSFile<T extends { [key in keyof T]: unknown }>(
    fileName: string,
    rows: T[],
    columns: { title: string; name: string; width: string }[],
    listName?: string
  ): void {
    const font = { name: "Arial", sz: 10 };
    const border = {
      top: { style: "thin", color: "000000" },
      right: { style: "thin", color: "000000" },
      bottom: { style: "thin", color: "000000" },
      left: { style: "thin", color: "000000" },
    };
    const rowCellStyle = {
      font,
      alignment: {
        wrapText: true,
      },
      border,
    };
    const headerCellStyle = {
      font: { ...font, bold: true },
      alignment: {
        vertical: "center",
        horizontal: "center",
        wrapText: true,
      },
      border,
    };

    const headersOrder = columns.map((item) => item.name);

    const columnWidth = columns.map((item) => ({
      wch: +item.width.replace(/[\D]+/g, "") / 10,
    }));

    const headers = columns.reduce((acc, item) => {
      acc[item.name] = item.title;
      return acc;
    }, {} as { [key: string]: string });

    const rowsWithHeaders = [headers, ...rows];

    const worksheet = XLSX.utils.json_to_sheet(rowsWithHeaders, {
      header: headersOrder,
      skipHeader: true,
    });
    const workbook = XLSX.utils.book_new();

    worksheet["!cols"] = columnWidth;

    rowsWithHeaders.forEach((row, indexRow) => {
      Object.keys(rowsWithHeaders[indexRow]).forEach((item, idx) => {
        worksheet[XLSX.utils.encode_cell({ c: idx, r: indexRow })].s = indexRow
          ? rowCellStyle
          : headerCellStyle;
      });
    });

    XLSX.utils.book_append_sheet(workbook, worksheet, listName || "new list");
    XLSX.writeFile(workbook, `${fileName}.xlsx`, { compression: true });
  },
};
