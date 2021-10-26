import { TypeState } from "@/utils/types";

const initialState: TypeState = {
  finishedLazyLoading: false,
  galleryTags: {},
  isLoading: true,
  items: [],
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
