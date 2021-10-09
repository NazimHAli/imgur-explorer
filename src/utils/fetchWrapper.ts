export const fetchData = async (url: RequestInfo): Promise<any> => {
  try {
    const response = await fetch(url);
    const response_1 = await response.json();
    return response_1.results;
  } catch (error) {
    console.error(`Fetch problem: ${(<Error>error).message}`);
    return Promise.reject([]);
  }
};
