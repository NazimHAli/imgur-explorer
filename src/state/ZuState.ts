import { initialState } from "@/state/initialState";
import {
  SelectedComments,
  TypeGallery,
  TypeItem,
  TypeselectedTag,
  TypeTag,
} from "@/utils/types";
import create from "zustand";

interface ZuState {
  finishedLazyLoading: boolean;
  galleryTags: { galleries?: TypeGallery[]; tags?: TypeTag[] };
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
  selectedItem: TypeItem | {};
  selectedItemComments: SelectedComments;
  selectedTag: TypeselectedTag;
}

const useStore = create<ZuState>(() => ({
  ...initialState,
  isLoading: false,
}));

const dispatchIsLoading = (isLoading) =>
  useStore.setState(() => ({
    isLoading: isLoading,
  }));

const dispatchItems = (items) =>
  useStore.setState(() => ({
    items: items,
  }));

const dispatchRequestArgs = (newArgs) =>
  useStore.setState(() => ({
    requestArgs: newArgs,
  }));

export { useStore, dispatchIsLoading, dispatchItems, dispatchRequestArgs };
