import { app } from "../../main.js";
import { createEl, createElWithText } from "../../utils/createUtils.js";
import { loadPage } from "../../main.js";
import { buildPoster } from "../buildPoster/buildPoster.js";

export const buildHeader = () => {
  const header = createEl("header");
  header.classList.add("mainHeader");

  const headerContent = createEl("div");
  headerContent.classList.add("mainHeaderContent");

  const headerTitle = createElWithText("h1", "WALLYWOOD");
  headerTitle.classList.add("mainHeaderTitle");

  headerTitle.addEventListener("click", () => {
    loadPage();
  });

  const nav = createEl("nav");
  nav.classList.add("headerNav");

  const navList = createEl("ul");
  navList.classList.add("headerNavList");

  const navItems = [
    { text: "FORSIDE", href: "#" },
    { text: "PLAKATER", href: "#" },
    { text: "OM OS", href: "#" },
    { text: "KONTAKT", href: "#" },
    { text: "LOGIN", href: "#" },
  ];

  navItems.forEach((item) => {
    const li = createEl("li");
    li.classList.add("headerNavItem");

    const a = createElWithText("a", item.text);
    a.setAttribute("href", item.href);

    if (item.text === "FORSIDE") {
      a.classList.add("active");
    }

    a.addEventListener("click", (event) => {
      event.preventDefault();
      console.log(`${item.text} clicked`);

      document.querySelectorAll(".headerNavItem a").forEach((anchor) => {
        anchor.classList.remove("active");
      });

      a.classList.toggle("active");
    });

    if (item.text === "FORSIDE") {
      a.addEventListener("click", () => {
        console.log("FORSIDE specific event triggered");
        loadPage();
      });
    }

    if (item.text === "PLAKATER") {
      a.addEventListener("click", () => {
        console.log("PLAKATER specific event triggered");
        buildPoster();
      });
    }

    if (item.text === "OM OS") {
      a.addEventListener("click", () => {
        console.log("OM OS specific event triggered");
      });
    }

    if (item.text === "KONTAKT") {
      a.addEventListener("click", () => {
        console.log("KONTAKT specific event triggered");
      });
    }

    if (item.text === "LOGIN") {
      a.addEventListener("click", () => {
        console.log("LOGIN specific event triggered");
      });
    }

    li.append(a);
    navList.append(li);
  });

  const basket = createEl("li");
  basket.classList.add("basket");
  const basketIcon = createEl("i");
  basketIcon.innerHTML = `<i class="fa-solid fa-basket-shopping" style="color: #000000;"></i>`;

  headerContent.append(headerTitle);
  header.append(headerContent);

  basket.append(basketIcon);
  navList.append(basket);

  nav.append(navList);
  headerContent.append(nav);

  app.append(header);
};
