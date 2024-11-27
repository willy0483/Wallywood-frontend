import { genresUrl } from "../../../credentials.js";

export const getGenres = async () => {
  try {
    const response = await fetch(`${genresUrl}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
