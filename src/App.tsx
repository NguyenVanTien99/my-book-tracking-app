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

  const onDrop = (event: React.DragEvent, shelfName: string) => {
    const bookId = event.dataTransfer.getData("bookId");
    const book = books.find((book) => book.id === bookId);
    handleUpdateBookData({ shelfName, setBooks, book, setSpinner });
  };

  return (
    <div className="app">
      <div className={`${spinner && "opacity"}`}>
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
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
        </div>
        <div className="open-search">
          <button onClick={() => navigate("/search")}>Add a book</button>
        </div>
      </div>
      {spinner && <Loading />}
    </div>
  );
}

export default App;
