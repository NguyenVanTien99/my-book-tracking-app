import React from "react";
import { Link } from "react-router-dom";
import { BookProps } from "./type";
import { useHandleUpdateBookData } from "../../hooks/useHandleUpdateBookData";

export const Book = (props: BookProps): JSX.Element => {
  const { title, authors, imageUrl, book, setBooks, bookshelf, setSpinner } =
    props;

  const handleUpdateBookData = useHandleUpdateBookData();

  const handleShelfChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const shelfName = event.target.value;
    handleUpdateBookData({ shelfName, setBooks, book, setSpinner });
  };
  const handleOnDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("bookId", book.id);
  };

  return (
    <div
      className="book"
      draggable
      onDragStart={(event) => handleOnDragStart(event)}
    >
      <div className="book-top">
        <Link to={`/book/${book.id}`} aria-label={`View details for ${title}`}>
          <div
            className={`book-cover ${!imageUrl ? "book-cover-empty" : ""}`}
            style={{
              width: 128,
              height: 193,
              backgroundImage: imageUrl ? `url("${imageUrl}")` : "none",
            }}
          >
            {!imageUrl && <span>{title}</span>}
          </div>
        </Link>
        <div className="book-shelf-changer">
          <select
            aria-label={`Move ${title} to another shelf`}
            onChange={handleShelfChange}
            defaultValue={bookshelf}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read.</option>
            <option value="read">Read.</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <Link className="book-title" to={`/book/${book.id}`}>
        {title}
      </Link>
      <div className="book-authors">
        {authors?.join(", ") || "Unknown author"}
      </div>
    </div>
  );
};
