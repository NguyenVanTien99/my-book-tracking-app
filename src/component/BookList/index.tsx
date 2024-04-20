import React from "react";
import { NotFound } from "../NotFound";
import { Book } from "../Book";
import { BookListProps } from "./type";

export const BookList = (props: BookListProps): JSX.Element => {
  const { books, setBooks, setSpinner } = props;

  const isExistBookData = books && books.length > 0;

  return (
    <>
      {isExistBookData ? (
        books.map((book) => {
          const { title, authors, imageLinks, shelf, id } = book;
          return (
            <li key={id}>
              <Book
                title={title}
                authors={authors}
                imageUrl={imageLinks && imageLinks.thumbnail}
                bookshelf={shelf}
                book={book}
                setBooks={setBooks}
                setSpinner={setSpinner}
              />
            </li>
          );
        })
      ) : (
        <NotFound />
      )}
    </>
  );
};
