import { posterUrl } from "../../../credentials.js";

export const getPoster = async () => {
  try {
    const response = await fetch(`${posterUrl}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
