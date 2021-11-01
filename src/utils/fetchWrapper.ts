export const fetchData = async (url: RequestInfo) => {
  try {
    const rawRes = await fetch(url);
    const response = await rawRes.json();
    if (!response.results) {
      return rawRes;
    }
    return response.results;
  } catch (error: unknown | undefined) {
    return Promise.reject({ message: error || "", status: 400 });
  }
};
