import { Dispatch, SetStateAction } from "react";

export type TypeselectedTag = {
  items?: Array<string>;
};

export type TypeGallery = {
  description: string;
  id: string;
  name: string;
};

export type TypeTag = {
  display_name: string;
  name: string;
  total_items: number;
};

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

export type TypeComments = {
  author: string;
  children: Array<TypeComments>;
  comment: string;
  datetime: number;
  downs: number;
  id: string;
  ups: number;
};

export type SelectedComments = Array<TypeComments>;

export type TypeState = {
  finishedLazyLoading: boolean;
  galleryTags: { galleries?: TypeGallery[]; tags?: TypeTag[] };
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
  selectedItem: TypeItem | undefined;
  selectedItemComments: SelectedComments;
  selectedTag: TypeselectedTag;
};

export type TypeSearchResponse = {
  data: TypeItem[] | SelectedComments;
  items: TypeItem[];
  status: number;
  success: boolean;
};

export type TypeGlobalContext = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setState: Dispatch<SetStateAction<TypeState>>;
  state: TypeState;
  setRequestArgs: (requestArgs: Partial<TypeState["requestArgs"]>) => void;
};
