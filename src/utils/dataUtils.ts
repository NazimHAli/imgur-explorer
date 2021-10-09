/**
 * Converts an array to a list of arrays (matrix)
 *
 * @param arr
 * @param size
 * @returns array
 */
function arrToMatrix(arr: string | any[], size: number): (string | any[])[] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
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

  return resultImages;
}

export { arrToMatrix, checkNumberIfFloat, extractImageResults };
