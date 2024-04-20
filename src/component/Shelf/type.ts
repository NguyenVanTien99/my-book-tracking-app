import { BookDataType } from "../../type";

export type ShelfProps = {
  books: BookDataType[];
  title: string;
  setBooks: React.Dispatch<React.SetStateAction<BookDataType[]>>;
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>;
  onDrop: (event: React.DragEvent, title: string) => void;
  shelfName: string;
};
