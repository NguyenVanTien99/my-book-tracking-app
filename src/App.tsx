import "./App.css";
import { useGetAllBookData } from "./hooks/useGetAllBookData";
import { shelves } from "./BooksAPI";
import { Shelf } from "./component/Shelf";
import { Loading } from "./component/Loading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHandleUpdateBookData } from "./hooks/useHandleUpdateBookData";

function App() {
  const [spinner, setSpinner] = useState<boolean>(false);
  const [books, setBooks] = useGetAllBookData(setSpinner);
  const navigate = useNavigate();
  const handleUpdateBookData = useHandleUpdateBookData();
  const totalBooks = books?.length || 0;

  const onDrop = (event: React.DragEvent, shelfName: string) => {
    const bookId = event.dataTransfer.getData("bookId");
    const book = books.find((book) => book.id === bookId);
    handleUpdateBookData({ shelfName, setBooks, book, setSpinner });
  };

  return (
    <div className="app">
      <div className={`${spinner ? "opacity" : ""}`}>
        <header className="list-books-title">
          <div className="hero-content">
            <span className="eyebrow">Personal library manager</span>
            <h1>MyReads</h1>
            <p>
              Organize your reading journey with clear shelves, quick actions,
              and drag-and-drop updates.
            </p>
            <div className="hero-stats" aria-label="Library statistics">
              <div>
                <strong>{totalBooks}</strong>
                <span>Total books</span>
              </div>
              {shelves.map(({ id, title, shelfName }) => (
                <div key={id}>
                  <strong>
                    {books.filter((book) => book?.shelf === shelfName).length}
                  </strong>
                  <span>{title}</span>
                </div>
              ))}
            </div>
          </div>
        </header>
        <main className="list-books-content" aria-label="Your reading shelves">
          <div className="shelves-layout">
            {shelves.map(({ id, title, shelfName }) => (
              <Shelf
                key={id}
                books={
                  books &&
                  books.filter((book) => book && book.shelf === shelfName)
                }
                setBooks={setBooks}
                title={title}
                setSpinner={setSpinner}
                onDrop={onDrop}
                shelfName={shelfName}
              />
            ))}
          </div>
        </main>
        <div className="open-search">
          <button onClick={() => navigate("/search")} aria-label="Add a book">
            Add a book
          </button>
        </div>
      </div>
      {spinner && <Loading />}
    </div>
  );
}

export default App;
