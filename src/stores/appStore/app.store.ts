import { action, makeObservable, observable } from "mobx";
import { appConfig } from "configs/app.config";
import { EAppMode } from "types/common.types";

class AppStore {
  version = appConfig.version;

  isPrototype = appConfig.isDefaultMock;

  appMode: EAppMode | undefined = undefined;

  isTableMaximized = false;

  isMenuCollapsed = true;

  featureFlags = {
    // reportModePdfLink: true,
    // reportBenefitPdfLink: true,
    // reportNpPdfLink: true,
    // serviceAnalysis: true,
    // serviceRef: true,
    // serviceTaxpayer: true,
    // serviceTaxspent: false,
    user: true,
    // serviceAdmin: false,
    ftsTaxSpent: false,
    ftsTaxSpentDetails: false,
    ftsReports: false,
  };

  constructor() {
    makeObservable(this, {
      version: observable,
      appMode: observable,
      isTableMaximized: observable,
      isMenuCollapsed: observable,
      setAppMode: action,
      toggleIsTableMaximized: action,
      toggleIsMenuCollapsed: action,
    });
  }

  setAppMode(mode: EAppMode) {
    sessionStorage.setItem("mode", mode);
    if (this.appMode === mode) return;
    this.appMode = mode;
  }

  toggleIsTableMaximized() {
    this.isTableMaximized = !this.isTableMaximized;
  }

  toggleIsMenuCollapsed() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }
}

export default new AppStore();
