export let FavData = [];

export const saveData = () => {
  let mySerializedData = JSON.stringify(FavData);
  localStorage.setItem("favoriteItems", mySerializedData);
};

export const readData = () => {
  let myFavString = localStorage.getItem("favoriteItems");
  if (myFavString) {
    FavData = JSON.parse(myFavString);
  } else {
    FavData = [];
  }
};

export const toggleFavorite = (item) => {
  const index = FavData.findIndex((fav) => fav.id === item.id);
  if (index === -1) {
    FavData.push(item);
  } else {
    FavData.splice(index, 1);
  }
  saveData();
};

export const clearData = () => {
  localStorage.clear();
  FavData = [];
};
