import React from "react";
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
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${imageUrl}")`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select onChange={handleShelfChange} defaultValue={bookshelf}>
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
      <div className="book-title">{title}</div>
      <div className="book-authors">
        {authors && authors.map((author) => `${author},`)}
      </div>
    </div>
  );
};
