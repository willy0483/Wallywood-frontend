import { pageContainer } from "../buildHomePage/buildHomePage.js";
import { getGenres } from "../fetch/genres/getGenres.js";
import { createEl } from "../../utils/createUtils.js";
import { readData } from "../../localstorage/storage.js";
import { getPoster } from "../fetch/poster/getPoster.js";
import { toggleFavorite, FavData } from "../../localstorage/storage.js";

export const buildPoster = async () => {
  readData();

  pageContainer.innerHTML = "";

  const genreData = await getGenres();

  console.log(genreData);

  const titleSortContainer = createEl("div");
  titleSortContainer.classList.add("titleSearchContainer");

  const title = createEl("h2");
  title.innerText = "Plakater";
  titleSortContainer.append(title);

  const sortContainer = createEl("div");
  sortContainer.classList.add("sortContainer");

  const sort = createEl("select");

  const sortOption = [
    { text: "pris - faldende", value: "price_desc" },
    { text: "pris - stigende", value: "price_asc" },
    { text: "titel", value: "title_a-z" },
  ];

  sortOption.forEach((item) => {
    const option = createEl("option");
    option.innerText = item.text;
    option.value = item.value;
    sort.append(option);
  });

  sortContainer.append(sort);
  titleSortContainer.append(sortContainer);

  const filterFavCardContainer = createEl("div");
  filterFavCardContainer.classList.add("filterFavCardContainer");

  const filterFavContainer = createEl("aside");
  filterFavContainer.classList.add("filterFavContainer");

  const filterContainer = createEl("aside");
  filterContainer.classList.add("filterContainer");

  const filterTitle = createEl("h3");
  filterTitle.innerText = "Filtre";

  const genreContainer = createEl("div");
  genreContainer.classList.add("genreContainer");

  const genreTitle = createEl("h4");
  genreTitle.innerText = "Genre";
  genreContainer.append(genreTitle);

  const genreList = createEl("ul");

  genreData.forEach((item) => {
    const genreItem = createEl("li");
    const genreLink = createEl("a");
    genreLink.innerText = item.title;
    genreLink.setAttribute("href", "#");
    genreItem.append(genreLink);
    genreList.append(genreItem);
  });

  genreContainer.append(genreList);

  filterContainer.append(filterTitle, genreContainer);
  filterFavContainer.append(filterContainer);
  pageContainer.append(titleSortContainer);

  const favContiner = createEl("div");
  favContiner.classList.add("favContainer");
  const favTitle = createEl("h2");

  const favList = createEl("ul");

  let favPoster = JSON.parse(localStorage.getItem("favoriteItems"));
  console.log(favPoster);

  if (favPoster) {
    favPoster.forEach((item) => {
      const favItem = createEl("li");
      const favLink = createEl("a");
      favLink.innerText = item.name;
      favItem.append(favLink);
      favList.append(favItem);
    });
  }

  favTitle.innerText = "Favoritter";
  favContiner.append(favTitle, favList);

  filterFavContainer.append(favContiner);
  filterFavCardContainer.append(filterFavContainer);

  const data = await getPoster();
  console.log(data);

  const cardContainer = createEl("div");
  cardContainer.classList.add("cardContainer");
  data.slice(0, 20).forEach((item) => {
    const card = createEl("figure");
    card.classList.add("card");

    const cardImage = createEl("img");
    cardImage.classList.add("cardImage");

    cardImage.setAttribute("src", item.image);

    const cardContent = createEl("figcaption");
    cardContent.classList.add("cardContent");

    const cardTitle = createEl("h3");
    cardTitle.innerText = item.name;

    const cardPrice = createEl("p");
    cardPrice.innerText = `kr ${item.price}`;

    const buttonContainer = createEl("div");
    buttonContainer.classList.add("buttonContainer");

    const basketBtn = createEl("button");
    basketBtn.innerText = "Læg i kurv";

    const favButton = createEl("button");
    favButton.classList.add("favButton");
    favButton.innerHTML = `<i class="fa-regular fa-heart" style="color: #000000;"></i>`;

    buttonContainer.append(basketBtn, favButton);
    cardContent.append(cardTitle, cardPrice, buttonContainer);
    card.append(cardImage);
    card.append(cardContent);
    cardContainer.append(card);
    filterFavCardContainer.append(cardContainer);

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
  });

  pageContainer.append(filterFavCardContainer);
};
