import { initialState } from "@/state/initialState";
import {
  extractImageResults,
  filterTags,
  getSelectedItem,
} from "@/utils/dataUtils";
import {
  SelectedComments,
  TypeGallery,
  TypeItem,
  TypeSelectedTag,
  TypeTag,
} from "@/utils/types";
import create from "zustand";

interface ZuState {
  finishedLazyLoading: boolean;
  galleryTags: { galleries?: TypeGallery[]; tags?: TypeTag[] };
  idxsToLoad: Array<number>;
  isLoading: boolean;
  items: Array<TypeItem>;
  requestArgs: {
    filter: boolean;
    method: string;
    newSearch: boolean;
    page: number;
    query: string;
    selectedItemID: string;
    sort: string;
    tagName: string;
    window: string;
  };
  requestError: boolean;
  selectedItem: TypeItem;
  selectedItemComments: SelectedComments;
  selectedTag: TypeSelectedTag;
}

const useStore = create<ZuState>(() => ({
  ...initialState,
  idxsToLoad: [0, 1, 2, 3, 4],
  isLoading: false,
}));

const dispatchIdxsToLoad = () =>
  useStore.setState((state) => ({
    idxsToLoad: [...Array(state.idxsToLoad.length + 10).keys()],
  }));

const dispatchIsLoading = (isLoading) =>
  useStore.setState(() => ({
    isLoading: isLoading,
  }));

const dispatchItems = (response) =>
  useStore.setState(() => ({
    items: extractImageResults(response),
  }));

const dispatchRequestArgs = (newArgs) =>
  useStore.setState((state) => ({
    requestArgs: { ...state.requestArgs, ...newArgs },
  }));

const dispatchTags = (response) =>
  useStore.setState(() => ({
    galleryTags: { ...response, tags: filterTags(response?.tags) },
  }));

const dispatchSelectedItem = () =>
  useStore.setState((state) => ({
    requestArgs: { ...state.requestArgs, method: "" },
    selectedItem: getSelectedItem(
      state.requestArgs.selectedItemID,
      state.items
    ),
  }));

const dispatchSelectedItemComments = (response) =>
  useStore.setState(() => ({
    selectedItemComments: response,
  }));

export {
  useStore,
  dispatchIdxsToLoad,
  dispatchIsLoading,
  dispatchItems,
  dispatchRequestArgs,
  dispatchSelectedItem,
  dispatchSelectedItemComments,
  dispatchTags,
};
