import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as BooksAPI from "../../BooksAPI";
import { useGetAllBookData } from "../../hooks/useGetAllBookData";
import { BookDataType } from "../../type";
import { BookList } from "../BookList";
import { Loading } from "../Loading";

export const Search = (): JSX.Element => {
  const [spinner, setSpinner] = useState<boolean>(false);
  const [books, setBooks] = useGetAllBookData(setSpinner);
  const navigate = useNavigate();

  const setShelves = (searchResult: BookDataType[], books: BookDataType[]) => {
    return searchResult.map((book) => {
      for (let i = 0; i < books.length; i++) {
        if (books[i].id === book.id) {
          return { ...book, shelf: books[i].shelf };
        }
      }
      return { ...book, shelf: "none" };
    });
  };

  const handleSearchTextChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputSearchText = event.target.value;
      if (inputSearchText.length !== 0) {
        setSpinner && setSpinner(true);
        BooksAPI.search(inputSearchText).then((searchResult) => {
          if (!searchResult.error) {
            setBooks(setShelves(searchResult, books));
          } else {
            setBooks([]);
          }
          setSpinner && setSpinner(false);
        });
      } else {
        setBooks([]);
      }
    },
    [books, setBooks]
  );

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={() => navigate("/")}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={handleSearchTextChange}
          />
        </div>
      </div>
      <div className={`search-books-results ${spinner && "opacity"}`}>
        <ol className="books-grid">
          <BookList books={books} setBooks={setBooks} setSpinner={setSpinner} />
          {spinner && <Loading />}
        </ol>
      </div>
    </div>
  );
};
