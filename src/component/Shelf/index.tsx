import React from "react";
import { BookList } from "../BookList";
import { ShelfProps } from "./type";

export const Shelf = (props: ShelfProps): JSX.Element => {
  const { books, title, setBooks, setSpinner, onDrop, shelfName } = props;

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <div
      className="bookshelf"
      onDragOver={handleDragOver}
      onDrop={(event) => onDrop(event, shelfName)}
    >
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          <BookList books={books} setBooks={setBooks} setSpinner={setSpinner} />
        </ol>
      </div>
    </div>
  );
};
