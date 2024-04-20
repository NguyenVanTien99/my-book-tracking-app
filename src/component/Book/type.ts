import { BookDataType } from "../../type";

export type BookProps = {
  title: string;
  authors: string[];
  imageUrl: string;
  bookshelf: string;
  book: BookDataType;
  setBooks?: React.Dispatch<React.SetStateAction<BookDataType[]>>;
  setSpinner?: React.Dispatch<React.SetStateAction<boolean>>;
  isSearching?: boolean;
};
