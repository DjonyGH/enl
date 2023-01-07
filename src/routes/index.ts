import { TPrivateRoutes } from "types/routes.types.ts";
import FtsReports from "pages/FtsReports";

export const PrivateRoutes: TPrivateRoutes = {
  efficiencyAnalysis: { path: "/p1", component: FtsReports },
  reportsAndReferences: { path: "/p2", component: FtsReports },
  directory: { path: "/p3", component: FtsReports },
  dataBase: { path: "/p4", component: FtsReports },

  nrTaxSpent: { path: "/p6", component: FtsReports },
  nrTaxSpentDetails: { path: "/p7", component: FtsReports },
  nrReports: { path: "/p8", component: FtsReports },

  ftsTaxSpent: { path: "/p9", component: FtsReports },
  ftsTaxSpentDetails: { path: "/p10", component: FtsReports },
  ftsReports: { path: "/p11", component: FtsReports },
};
