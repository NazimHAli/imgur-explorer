function arrToMatrix(arr, size) {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size)
    );
  }

function checkNumberIfFloat(value: number) {
  return Number(value) === value && value % 1 !== 0;
}

function extractImageResults(response: any[]) {
  let resultImages = [];
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
