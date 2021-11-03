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
  items: Partial<TypeItem[]>;
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
  selectedItem: Partial<TypeItem>;
  selectedItemComments: SelectedComments;
  selectedTag: TypeSelectedTag;
}

const useStore = create<ZuState>(() => ({
  ...initialState,
  idxsToLoad: [0, 1, 2, 3, 4],
  isLoading: false,
}));

const dispatchIdxsToLoad = (newIdxsToLoad) =>
  useStore.setState(() => ({
    idxsToLoad: newIdxsToLoad,
  }));

const dispatchIsLoading = (isLoading) =>
  useStore.setState(() => ({
    isLoading: isLoading,
  }));

const dispatchFinishedLazyLoading = (isFinished) =>
  useStore.setState(() => ({
    finishedLazyLoading: isFinished,
  }));

const dispatchItems = (response) =>
  useStore.setState((state) => ({
    items: state.requestArgs.newSearch
      ? extractImageResults(response)
      : state.items.concat(extractImageResults(response)),
  }));

const dispatchRequestArgs = (newArgs) =>
  useStore.setState((state) => ({
    requestArgs: { ...state.requestArgs, ...newArgs },
  }));

const dispatchTags = (response) =>
  useStore.setState(() => ({
    galleryTags: { ...response, tags: filterTags(response?.tags) },
  }));

const dispatchSelectedItem = (response) =>
  useStore.setState((state) => ({
    requestArgs: { ...state.requestArgs, method: "" },
    selectedItem: getSelectedItem(
      state.requestArgs.selectedItemID,
      state.items
    ),
    selectedItemComments: response,
  }));

const dispatchClearSelectedItem = () =>
  useStore.setState((state) => ({
    requestArgs: { ...state.requestArgs, method: "", selectedItemID: "" },
    selectedItem: {},
    selectedItemComments: [],
  }));

export {
  useStore,
  dispatchClearSelectedItem,
  dispatchFinishedLazyLoading,
  dispatchIdxsToLoad,
  dispatchIsLoading,
  dispatchItems,
  dispatchRequestArgs,
  dispatchSelectedItem,
  dispatchTags,
};
