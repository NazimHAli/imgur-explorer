import { initialState } from "@/state/initialState";
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
  idxsToLoad: [...Array(8).keys()],
  isLoading: false,
}));

export { useStore };
