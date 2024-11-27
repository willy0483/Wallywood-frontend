import { createEl } from "../../utils/createUtils.js";
import { app } from "../../main.js";

export const buildFooter = () => {
  const ul1 = createEl("ul");
  ul1.classList.add("footerul1");

  const ul2 = createEl("ul");
  ul2.classList.add("footerul2");

  const listItem1 = [
    { text: "WALLYWORD", href: "#" },
    { text: "Øster Uttrupvej 1", href: "#" },
    { text: "9000 Aalborg", href: "#" },
  ];

  const listItem2 = [
    { text: "CPR:12345678", href: "#" },
    { text: "MAIL: info@wallywood.dk", href: "#" },
    { text: "MOBIL: +45 9812 3456" },
  ];

  listItem1.forEach((item) => {
    const li = createEl("li");
    const a = createEl("a");
    a.setAttribute("href", item.href);
    a.innerText = item.text;
    li.append(a);
    ul1.append(li);
  });

  listItem2.forEach((item) => {
    const li = createEl("li");
    const a = createEl("a");
    a.setAttribute("href", item.href);
    a.innerText = item.text;
    li.append(a);
    ul2.append(li);
  });

  const iconList = [
    {
      icon: `<i class="fa-brands fa-pinterest" style="color: #000000;"></i>`,
      href: "#",
    },
    {
      icon: `<i class="fa-brands fa-instagram" style="color: #000000;"></i>`,
      href: "#",
    },
    {
      icon: `<i class="fa-brands fa-facebook" style="color: #000000;"></i>`,
      href: "#",
    },
    {
      icon: `<i class="fa-brands fa-twitter" style="color: #000000;"></i>`,
      href: "#",
    },
  ];

  const iconContainer = createEl("div");
  iconContainer.classList.add("iconContainer");

  iconList.forEach((item) => {
    const a = createEl("a");
    a.setAttribute("href", item.href);
    a.innerHTML = item.icon;
    iconContainer.append(a);
  });

  const footer = createEl("footer");
  footer.innerHTML = "";
  footer.classList.add("mainFooter");

  const footerUlContainer = createEl("div");
  footerUlContainer.classList.add("footerUlContainer");
  footerUlContainer.append(ul1, ul2);
  footer.append(footerUlContainer);
  footer.append(iconContainer);

  document.body.append(footer);
};
