import { Dispatch, SetStateAction } from "react";

export interface TypeselectedTag {
  items?: Array<string>;
}

export interface TypeGallery {
  description: string;
  id: string;
  name: string;
}

export interface TypeTag {
  display_name: string;
  name: string;
  total_items: number;
}

export type TypeItem = {
  account_url: string;
  comment_count: number;
  downs: number;
  favorite_count: number;
  id: string;
  images: Array<{ height: number; link: string; type?: string; width: number }>;
  title: string;
  ups: number;
  views: number;
};

export interface TypeComments {
  author: string;
  children: Array<TypeComments>;
  comment: string;
  datetime: number;
  downs: number;
  id: string;
  ups: number;
}

export type SelectedComments = Array<TypeComments>;

export interface TypeState {
  finishedLazyLoading: boolean;
  galleryTags: { galleries?: TypeGallery[]; tags?: TypeTag[] };
  items: Array<TypeItem>;
  idxsToLoad: Array<number>;
  isLoading: boolean;
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
  selectedItem: TypeItem | undefined;
  selectedItemComments: SelectedComments;
  selectedTag: TypeselectedTag;
}

export interface TypeSearchResponse {
  data: TypeItem[] | SelectedComments;
  items: TypeItem[];
  status: number;
  success: boolean;
}

export interface TypeGlobalContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setState: Dispatch<SetStateAction<TypeState>>;
  state: TypeState;
  setRequestArgs: (requestArgs: Partial<TypeState["requestArgs"]>) => void;
}
