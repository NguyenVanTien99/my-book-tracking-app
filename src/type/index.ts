export type BookDataType = {
  id: string;
  shelf: string;
  title: string;
  authors?: string[];
  imageLinks?: {
    thumbnail?: string;
  };
  publisher?: string;
  publishedDate?: string;
  pageCount?: number;
  categories?: string[];
  description?: string;
  previewLink?: string;
};
