import { action, makeObservable, observable } from "mobx";
import _ from "lodash";
import { appConfig } from "configs/app.config";

class AppStore {
  version = appConfig.version;

  isPrototype = appConfig.isDefaultMock;

  appMode: string | undefined = undefined;

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
      isMenuCollapsed: observable,
      setAppMode: action,
      toggleIsMenuCollapsed: action,
    });
  }

  setAppMode(mode: string) {
    sessionStorage.setItem("mode", mode);
    if (this.appMode !== mode) {
      this.appMode = mode;
    }
  }

  toggleIsMenuCollapsed() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }
}

export default new AppStore();
