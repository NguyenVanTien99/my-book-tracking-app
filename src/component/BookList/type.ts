import { BookDataType } from "../../type";

export type BookListProps = {
  books: BookDataType[];
  setBooks: React.Dispatch<React.SetStateAction<BookDataType[]>>;
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>;
};
