import { State } from "@/types";

function isValidImageType(text: string): boolean {
  const pattern = /\.(jpg|png)\b/;
  return pattern.exec(text) !== null;
}

/**
 * Converts an array to a list of arrays (matrix)
 *
 * @param arr
 * @param size
 * @returns array
 */
function arrToMatrix(arr: State["items"], size: number): Array<State["items"]> {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

/**
 * Determine if a number is a float
 *
 * @param num
 * @returns boolean
 */
function checkNumberIfFloat(num: number): boolean {
  return Number(num) === num && num % 1 !== 0;
}

/**
 * Updates the image URL to use a new size. Default
 * it sets 'm' as medium.
 *
 * TODO: Update logic to check more image types
 *
 * @param images
 * @param newSize
 */
function updateImageSize(images: State["items"], newSize = "l") {
  const imgJPG = `${newSize}.jpg`;
  const imgPNG = `${newSize}.png`;

  for (let index = 0; index < images.length; index++) {
    const img = images[index].images[0].link;

    if (!img.endsWith(imgJPG) && !img.endsWith(imgPNG)) {
      images[index].images[0].link = img.endsWith(".jpg")
        ? img.replace(".jpg", imgJPG)
        : img.replace(".png", imgPNG);
    }
  }

  return images;
}

/**
 * Validate and extract image results from the response
 *
 * @param response
 * @returns array
 */
function extractImageResults(response: State["items"]) {
  let resultImages: State["items"] = [];

  if (!response.length) {
    return resultImages;
  }

  const rawImageResults = response.filter((res) => res.images);

  resultImages = rawImageResults.filter((res) => {
    return res.images && isValidImageType(res.images[0].link);
  });

  return updateImageSize(resultImages);
}

function capitalize(str: string): string {
  if (!str?.length) {
    return "";
  }

  const wordsToCapitalize = (match: string) => match.toUpperCase();
  return str.replace(/(^\w{1})|(\s{1}\w{1})/g, wordsToCapitalize);
}

function truncateText(text: string, maxCharacters: number): string {
  return text.length > maxCharacters
    ? text.slice(0, maxCharacters - 1) + "…"
    : text;
}

function genRandomColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export {
  arrToMatrix,
  capitalize,
  checkNumberIfFloat,
  extractImageResults,
  genRandomColor,
  truncateText,
  updateImageSize,
};
