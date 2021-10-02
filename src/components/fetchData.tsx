import React from "react";

export const fetchData = (
  searchQuery = "meow",
  pageNumber = 1,
  newSearch = false
) => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const requestData = function () {
      try {
        import("../services/imgurAPI").then((mod) => {
          const imgurClient = mod.ImgurAPI.getInstance();

          imgurClient
            .submitGallerySearch(searchQuery, pageNumber, false)
            .then((response) => {
              setData(newSearch ? response : data.concat(response));
            });
        });
      } catch (error) {
        throw error;
      }
    };
    requestData();
  }, [searchQuery]);

  return data;
};
