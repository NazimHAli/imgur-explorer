type selectedTag = {
  items?: Array<object>;
};

export type Item = {
  account_url: string;
  comment_count: number;
  downs: number;
  favorite_count: number;
  id: string;
  images: Array<{ link: string; width: string; height: string }>;
  title: string;
  ups: number;
  views: number;
};

export type State = {
  galleryTags: { galleries?: []; tags?: [] };
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
  loading?: State["isLoading"];
  query?: State["requestArgs"]["query"];
  requestError?: boolean;
  tagName?: State["requestArgs"]["tagName"];
  sort?: State["requestArgs"]["sort"];
  type: string | null;
  window?: State["requestArgs"]["window"];
};
