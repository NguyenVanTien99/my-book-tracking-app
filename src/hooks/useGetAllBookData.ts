import { useEffect, useState } from "react";
import { getAll } from "../BooksAPI";
import { BookDataType } from "../type";

export const useGetAllBookData = (
  setSpinner?: React.Dispatch<React.SetStateAction<boolean>>
): [
  books: BookDataType[],
  setBooks: React.Dispatch<React.SetStateAction<BookDataType[]>>
] => {
  const [books, setBooks] = useState<BookDataType[]>([]);

  useEffect(() => {
    setSpinner && setSpinner(true);
    getAll().then((booksFromApi) => {
      setBooks(booksFromApi);
      setSpinner && setSpinner(false);
    });
  }, [setSpinner]);

  return [books, setBooks];
};
