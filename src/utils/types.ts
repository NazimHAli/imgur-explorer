export type selectedTag = {
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

export type Item = {
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

export type Comments = {
  author: string;
  children: Array<Comments>;
  comment: string;
  datetime: number;
  downs: number;
  id: string;
  ups: number;
};

export type SelectedComments = Array<Comments>;

export type State = {
  finishedLazyLoading: boolean;
  galleryTags: { galleries?: TypeGallery[]; tags?: TypeTag[] };
  isLoading: boolean;
  items: Array<Item>;
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
  selectedItem: Item | undefined;
  selectedItemComments: SelectedComments;
  selectedTag: selectedTag;
};

export type Action = {
  finishedLazyLoading?: State["finishedLazyLoading"];
  galleryTags?: State["galleryTags"];
  items?: State["items"];
  loading?: State["isLoading"];
  method?: State["requestArgs"]["method"];
  newSearch?: State["requestArgs"]["newSearch"];
  page?: State["requestArgs"]["page"];
  query?: State["requestArgs"]["query"];
  requestArgs?: Partial<State["requestArgs"]>;
  requestError?: boolean;
  selectedItemComments?: State["selectedItemComments"];
  sort?: State["requestArgs"]["sort"];
  tagName?: State["requestArgs"]["tagName"];
  type: string | null;
  window?: State["requestArgs"]["window"];
};

export type TypeSearchResponse = {
  data: Item[] | SelectedComments;
  items: Item[];
  status: number;
  success: boolean;
};

export type TypeGlobalContext = {
  setState: () => void;
  state: State;
  setRequestArgs: (requestArgs: Partial<State["requestArgs"]>) => void;
};
