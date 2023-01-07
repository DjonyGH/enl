import React from "react";
import cn from "classnames";
import appStore from "stores/appStore";
import userStore from "stores/userStore";

import { EMenuGroups, TMenu } from "types/common.types";
import { appConfig } from "configs/app.config";
import MenuAuth from "./components/MenuAuth";
import { PrivateRoutes } from "routes";
import MenuItem from "./components/MenuItem";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";

interface IProps {
  enlEnabled: boolean;
  enlReadOnlyEnabled: boolean;
  nrEnabled: boolean;
  ftsEnabled: boolean;
  adminEnabled: boolean;
  mode?: string;
}

const Menu: React.FC<IProps> = (props) => {
  const {
    enlEnabled,
    enlReadOnlyEnabled,
    nrEnabled,
    ftsEnabled,
    adminEnabled,
  } = props;

  const history = useHistory();

  console.log(
    "history",
    history.location.pathname,
    PrivateRoutes.efficiencyAnalysis.path
  );

  const menu: TMenu = {
    enl: {
      visible: enlEnabled || enlReadOnlyEnabled || adminEnabled,
      items: [
        {
          title: "Анализ эффективности",
          path: PrivateRoutes.efficiencyAnalysis.path,
          image: `${appConfig.baseUrl}/i/icons/ico-analyze_24.svg`,
          isActive:
            history.location.pathname === PrivateRoutes.efficiencyAnalysis.path,
        },
        {
          title: "Отчеты и справки",
          path: PrivateRoutes.reportsAndReferences.path,
          image: `${appConfig.baseUrl}/i/icons/ico-report_wh_24.svg`,
          isActive:
            history.location.pathname ===
            PrivateRoutes.reportsAndReferences.path,
        },
        {
          title: "Справочники",
          path: PrivateRoutes.directory.path,
          image: `${appConfig.baseUrl}/i/icons/ico-book_512.svg`,
          isActive: history.location.pathname === PrivateRoutes.directory.path,
        },
        {
          title: "База данных",
          path: PrivateRoutes.dataBase.path,
          image: `${appConfig.baseUrl}/i/icons/ico-base_24.svg`,
          isActive: history.location.pathname === PrivateRoutes.dataBase.path,
        },
      ],
    },
    nr: {
      visible: nrEnabled || adminEnabled,
      items: [
        {
          title: "Налоговые расходы",
          path: PrivateRoutes.nrTaxSpent.path,
          image: `${appConfig.baseUrl}/i/icons/ico-expense_24.svg`,
          isActive: history.location.pathname === PrivateRoutes.nrTaxSpent.path,
        },
        {
          title: "Состав налоговых расходов",
          path: PrivateRoutes.nrTaxSpentDetails.path,
          image: `${appConfig.baseUrl}/i/icons/ico-structure_24.svg`,
          isActive:
            history.location.pathname === PrivateRoutes.nrTaxSpentDetails.path,
        },
        {
          title: "Утвержденные отчеты",
          path: PrivateRoutes.nrReports.path,
          image: `${appConfig.baseUrl}/i/icons/ico-reports_24.svg`,
          isActive: history.location.pathname === PrivateRoutes.nrReports.path,
        },
      ],
    },
    fts: {
      visible: ftsEnabled || adminEnabled,
      items: [
        {
          title: "Налоговые расходы",
          path: PrivateRoutes.ftsTaxSpent.path,
          image: `${appConfig.baseUrl}/i/icons/ico-expense_24.svg`,
          isActive:
            history.location.pathname === PrivateRoutes.ftsTaxSpent.path,
        },
        {
          title: "Состав налоговых расходов",
          path: PrivateRoutes.ftsTaxSpentDetails.path,
          image: `${appConfig.baseUrl}/i/icons/ico-structure_24.svg`,
          isActive:
            history.location.pathname === PrivateRoutes.ftsTaxSpentDetails.path,
        },
        {
          title: "Загруженные отчеты",
          path: PrivateRoutes.ftsReports.path,
          image: `${appConfig.baseUrl}/i/icons/ico-reports_24.svg`,
          isActive: history.location.pathname === PrivateRoutes.ftsReports.path,
        },
      ],
    },
  };

  const cnAside = appStore.isMenuCollapsed
    ? cn("template-common__aside")
    : cn("template-common__aside", "template-common__aside_max");

  console.log("appStore.isMenuCollapsed", appStore.isMenuCollapsed);

  return (
    <aside className={cnAside}>
      <div className="template-common__aside-container">
        <section className="aside-param logo-sys">
          <div className="aside-param-min">
            <figure className="logo-sys__img mt-2 mb-2">
              <img src={`${appConfig.baseUrl}/i/logo.svg`} alt="Логотип" />
            </figure>
          </div>
          {appStore.isMenuCollapsed ? (
            <></>
          ) : (
            <div className="aside-param-max">
              <div className="logo-sys__title pl-4 pr-4">
                <div className="logo-sys__name">{appConfig.title}</div>
                <div className="logo-sys__notice">
                  Версия {appStore.version}
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="menu-main">
          <div className="menu-main__block">
            <button
              type="button"
              className="aside-param menu-main__item menu-main__trigger"
              tabIndex={-3}
              onKeyPress={() => appStore.toggleIsMenuCollapsed()}
              onClick={() => appStore.toggleIsMenuCollapsed()}
              title="Главное меню"
            >
              <div className="aside-param-min">
                <div
                  className="btn-ico btn-dataurl ico-menu menu-main__trigger-ico"
                  title="Главное меню"
                >
                  Главное меню
                </div>
              </div>

              {appStore.isMenuCollapsed ? (
                <></>
              ) : (
                <div className="aside-param-max">
                  <div className="menu-main__item-title pl-4 pr-4">
                    <div className="menu-main__item-name menu-main__trigger">
                      Свернуть меню
                    </div>
                  </div>
                </div>
              )}
            </button>
          </div>

          <div className="menu-main__block">
            <div className="menu-main__section-main justify-content-start">
              {(Object.keys(menu) as EMenuGroups[]).map((group) => {
                if (
                  group === EMenuGroups.Enl &&
                  menu[EMenuGroups.Enl].visible
                ) {
                  return menu[EMenuGroups.Enl].items.map((item) => (
                    <MenuItem
                      key={item.path}
                      title={item.title}
                      path={item.path}
                      image={item.image}
                      isActive={item.isActive}
                    />
                  ));
                }

                if (group === EMenuGroups.Nr && menu[EMenuGroups.Nr].visible) {
                  return menu[EMenuGroups.Nr].items.map((item) => (
                    <MenuItem
                      key={item.path}
                      title={item.title}
                      path={item.path}
                      image={item.image}
                      isActive={item.isActive}
                    />
                  ));
                }

                if (group === EMenuGroups.Fts && menu[EMenuGroups.Nr].visible) {
                  return menu[EMenuGroups.Fts].items.map((item) => (
                    <MenuItem
                      key={item.path}
                      title={item.title}
                      path={item.path}
                      image={item.image}
                      isActive={item.isActive}
                    />
                  ));
                }
              })}
            </div>
          </div>

          <div className="menu-main__block">
            <MenuAuth
              name={userStore.authData?.fioUser ?? "-"}
              isMenuCollapsed={!appStore.isMenuCollapsed}
              title={userStore.authData?.rankUser ?? "-"}
              image={`${appConfig.baseUrl}/i/icons/ico-user_24.svg`}
            />
          </div>
        </section>
      </div>
    </aside>
  );
};

export default observer(Menu);
