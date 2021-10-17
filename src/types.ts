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
  requestArgs: {
    filter: boolean;
    newSearch?: boolean;
    page: number;
    query: string;
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
  finishedLazyLoading?: State["finishedLazyLoading"];
  loading?: State["isLoading"];
  newSearch?: State["requestArgs"]["newSearch"];
  page?: State["requestArgs"]["page"];
  query?: State["requestArgs"]["query"];
  requestError?: boolean;
  tagName?: State["requestArgs"]["tagName"];
  sort?: State["requestArgs"]["sort"];
  type: string | null;
  window?: State["requestArgs"]["window"];
};
