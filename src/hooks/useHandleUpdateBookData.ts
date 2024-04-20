import * as BooksAPI from "../BooksAPI";

import { BookDataType } from "../type";

type updateBookDataParams = {
  shelfName: string;
  setBooks?: React.Dispatch<React.SetStateAction<BookDataType[]>>;
  book?: BookDataType;
  setSpinner?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useHandleUpdateBookData = (): ((
  params: updateBookDataParams
) => void) => {
  const handleUpdateBookData = (params: updateBookDataParams) => {
    const { shelfName, book, setBooks, setSpinner } = params;
    BooksAPI.update(book, shelfName).then(() => {
      setSpinner && setSpinner(true);
      BooksAPI.getAll().then((newBooks) => {
        setBooks && setBooks(newBooks);
        setSpinner && setSpinner(false);
      });
    });
  };

  return handleUpdateBookData;
};
