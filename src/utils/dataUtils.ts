import { TypeItem, TypeState, TypeTag } from "@/utils/types";

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
function arrToMatrix(
  arr: TypeState["items"],
  size: number
): Array<TypeState["items"]> {
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
function updateImageSize(images: TypeState["items"], newSize = "l") {
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
function extractImageResults(response: TypeState["items"]) {
  let resultImages: TypeState["items"] = [];

  if (!response || !response.length) {
    return resultImages;
  }

  const rawImageResults = response.filter((res) => res.images);

  resultImages = rawImageResults.filter((res) => {
    return res.images?.length && isValidImageType(res.images[0].link);
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

function getDateString(datetime: number): string | null {
  if (!datetime) {
    return null;
  }

  const dt = new Date(datetime * 1000);
  return dt.toLocaleString();
}

function getSelectedItem(
  selectedId: string,
  items: Array<TypeItem>
): TypeItem | undefined {
  return items.find((item) => {
    return item.id === selectedId;
  });
}

function selectRandomItems(arr: TypeTag[], maxNum = 1) {
  let arrLen = arr.length;

  while (arrLen) {
    const randomItem = Math.floor(Math.random() * arrLen--);
    [arr[arrLen], arr[randomItem]] = [arr[randomItem], arr[arrLen]];
  }

  return arr.slice(0, maxNum);
}

function filterTags(tagsList: TypeTag[], maxNum = 10) {
  tagsList = tagsList.filter((tag) => tag.total_items >= 1000).slice(0, 1000);

  return selectRandomItems(tagsList, maxNum);
}

function filterNewResults(response: any, state: TypeState) {
  response = state.requestArgs.filter
    ? extractImageResults(response)
    : response;

  response = state.requestArgs.newSearch
    ? response
    : state.items.concat(response);
  return response;
}

export {
  arrToMatrix,
  capitalize,
  checkNumberIfFloat,
  extractImageResults,
  filterNewResults,
  filterTags,
  genRandomColor,
  getDateString,
  getSelectedItem,
  truncateText,
  updateImageSize,
};
