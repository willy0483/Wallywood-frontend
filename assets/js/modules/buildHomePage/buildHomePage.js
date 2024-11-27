import { createEl, createElWithText } from "../../utils/createUtils.js";
import { getPoster } from "../fetch/poster/getPoster.js";
import { toggleFavorite, FavData } from "../../localstorage/storage.js";

import { app } from "../../main.js";

const posterContainer = createEl("div");
posterContainer.classList.add("posterContainerHomePage");

export const pageContainer = createEl("section");
pageContainer.classList.add("pageContainer");

const homepageImageContainer = createEl("div");
homepageImageContainer.classList.add("homepageImageContainer");

const homepageImage = createEl("img");
homepageImage.classList.add("homepageImage");
homepageImage.setAttribute(
  "src",
  "assets/image/0f4281bb96ff3bf39fb0eae573e60297.png"
);

export const buildHomePage = async () => {
  posterContainer.innerHTML = "";

  const homePageContent = createEl("div");
  homePageContent.classList.add("homePageContent");

  pageContainer.append(homePageContent);
  homepageImageContainer.append(homepageImage);
  homePageContent.append(homepageImageContainer);

  const homepageTitleContainer = createEl("div");
  homepageTitleContainer.classList.add("homepageTextContainer");

  const homepagetitle = createEl("h2");
  homepagetitle.innerText = "Sidste nyt...";
  homepagetitle.classList.add("homepageText");

  homepageTitleContainer.append(homepagetitle);
  homePageContent.append(homepageTitleContainer);

  const data = await getPoster();
  console.log(data);

  data.slice(0, 4).forEach((item) => {
    const newsContainer = createEl("div");
    newsContainer.classList.add("newsContainer");

    const newsImage = createEl("img");
    newsImage.classList.add("newsImage");
    newsImage.setAttribute("src", item.image);

    const { name, description, genreposterrel, image } = item;

    const newsDescription = createEl("article");
    newsDescription.classList.add("newsDescription");
    newsDescription.innerHTML = `
      <h2 class="newsTitle">${name}</h2>
      <p>${description}</p>
      <p class="newsGenre">Genre: ${genreposterrel
        .map((genre) => genre.genre_id.title)
        .join(", ")}</p>
    `;

    const buttonContainer = createEl("div");
    buttonContainer.classList.add("buttonContainer");

    const button = createElWithText("button", "Løs mere");
    button.classList.add("ReadButton");
    buttonContainer.append(button);

    const favButton = createEl("button");
    favButton.classList.add("favButton");
    favButton.innerHTML = `<i class="fa-regular fa-heart" style="color: #000000;"></i>`;

    const isFav = FavData.some((fav) => fav.id === item.id);
    favButton.innerHTML = isFav
      ? `<i class="fa-solid fa-heart" style="color: #000000;"></i>`
      : `<i class="fa-regular fa-heart" style="color: #000000;"></i>`;

    favButton.addEventListener("click", () => {
      const isFav = favButton.innerHTML.includes("fa-regular");
      favButton.innerHTML = isFav
        ? `<i class="fa-solid fa-heart" style="color: #000000;"></i>`
        : `<i class="fa-regular fa-heart" style="color: #000000;"></i>`;
      toggleFavorite(item);
    });
    buttonContainer.append(favButton);
    newsDescription.append(buttonContainer);

    newsContainer.append(newsImage, newsDescription);
    posterContainer.append(newsContainer);

    app.append(pageContainer);
    homePageContent.append(posterContainer);
  });
};
