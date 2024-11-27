export const app = document.getElementById("app");
import { pageContainer } from "./modules/buildHomePage/buildHomePage.js";
import { buildHeader } from "./modules/buildHeader/buildHeader.js";
import { buildHomePage } from "./modules/buildHomePage/buildHomePage.js";
import { buildFooter } from "./modules/buildFooter/buildFooter.js";

import { readData, clearData, saveData } from "./localstorage/storage.js";

readData();

export const loadPage = () => {
  pageContainer.innerHTML = "";
  app.innerHTML = "";
  buildHeader();
  buildHomePage();
};

buildFooter();

loadPage();
