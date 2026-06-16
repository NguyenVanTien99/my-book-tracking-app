import React from "react";
import { BookList } from "../BookList";
import { ShelfProps } from "./type";

export const Shelf = (props: ShelfProps): JSX.Element => {
  const { books, title, setBooks, setSpinner, onDrop, shelfName } = props;

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <section
      className="bookshelf"
      onDragOver={handleDragOver}
      onDrop={(event) => onDrop(event, shelfName)}
      aria-label={`${title} shelf`}
    >
      <div className="bookshelf-header">
        <h2 className="bookshelf-title">{title}</h2>
        <span className="bookshelf-count">{books?.length || 0} books</span>
      </div>
      <p className="bookshelf-hint">Drop books here or use the action menu on each cover.</p>
      <div className="bookshelf-books">
        <ol className="books-grid">
          <BookList books={books} setBooks={setBooks} setSpinner={setSpinner} />
        </ol>
      </div>
    </section>
  );
};
