import { TypeState } from "@/utils/types";

const initialState: TypeState = {
  finishedLazyLoading: false,
  galleryTags: {},
  items: [],
  idxsToLoad: [...Array(8).keys()],
  isLoading: false,
  requestArgs: {
    filter: true,
    method: "search",
    newSearch: true,
    page: 1,
    query: "meow",
    selectedItemID: "",
    sort: "top",
    tagName: "",
    window: "all",
  },
  requestError: false,
  selectedItem: undefined,
  selectedItemComments: [],
  selectedTag: {},
};

export { initialState };
