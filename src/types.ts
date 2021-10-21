type selectedTag = {
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
  total_items?: number;
};

export type Item = {
  account_url: string;
  comment_count: number;
  downs: number;
  favorite_count: number;
  id: string;
  images: Array<{ link: string; width: number; height: number; type?: string }>;
  title: string;
  ups: number;
  views: number;
};

export type State = {
  galleryTags: { galleries?: []; tags?: [] };
  finishedLazyLoading: boolean;
  isLoading: boolean;
  items: Array<Item>;
  selectedItemComments?: Array<any>;
  requestArgs: {
    filter: boolean;
    method: string;
    newSearch?: boolean;
    page: number;
    query: string;
    selectedItemID?: string;
    sort: string;
    tagName: string;
    window: string;
  };
  requestError: boolean;
  selectedTag: selectedTag;
};

export type Action = {
  galleryTags?: State["galleryTags"];
  items?: State["items"];
  selectedItemComments?: State["selectedItemComments"];
  finishedLazyLoading?: State["finishedLazyLoading"];
  loading?: State["isLoading"];
  method?: State["requestArgs"]["method"];
  newSearch?: State["requestArgs"]["newSearch"];
  requestArgs?: State["requestArgs"];
  page?: State["requestArgs"]["page"];
  query?: State["requestArgs"]["query"];
  requestError?: boolean;
  tagName?: State["requestArgs"]["tagName"];
  sort?: State["requestArgs"]["sort"];
  type: string | null;
  window?: State["requestArgs"]["window"];
};
