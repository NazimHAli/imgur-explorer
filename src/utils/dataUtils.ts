/**
 * Converts an array to a list of arrays (matrix)
 *
 * @param arr
 * @param size
 * @returns array
 */
function arrToMatrix(arr: string | any[], size: number): (string | any[])[] {
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
function updateImageSize(images: any[], newSize = "m") {
  const imgSuffix = `${newSize}.jpg`;

  for (let index = 0; index < images.length; index++) {
    if (!images[index].images[0].link.endsWith(imgSuffix)) {
      images[index].images[0].link = images[index].images[0].link.replace(
        ".jpg",
        imgSuffix
      );
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
function extractImageResults(response: any[]): any[] {
  let resultImages: any[] = [];

  if (!response.length) {
    return resultImages;
  }

  const rawImageResults = response.filter((res: { images: any }) => res.images);

  resultImages = rawImageResults.filter(
    (res: { images: { link: string; type: string | string[] }[] }) => {
      return (
        res.images &&
        res.images[0].link &&
        res.images[0]?.type.includes("image")
      );
    }
  );

  return updateImageSize(resultImages);
}

function capitalize(str: string | undefined): string {
  if (typeof str === "string") {
    return str.replace(/^\w/, (c) => c.toUpperCase());
  } else {
    return "";
  }
}

function truncateText(text: string, maxCharacters: number): string {
  return text.length > maxCharacters
    ? text.slice(0, maxCharacters - 1) + "…"
    : text;
}

function genRandomColor(): string {
  return Math.floor(Math.random() * 16777215).toString(16);
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
