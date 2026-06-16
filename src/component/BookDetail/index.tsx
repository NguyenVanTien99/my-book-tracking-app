import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as BooksAPI from "../../BooksAPI";
import { useBookNote } from "../../hooks/useBookNote";
import { BookDataType } from "../../type";
import { Loading } from "../Loading";

export const BookDetail = (): JSX.Element => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<BookDataType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { note, updateNote, clearNote } = useBookNote(bookId);

  useEffect(() => {
    if (!bookId) {
      setErrorMessage("Book id is missing.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    BooksAPI.get(bookId)
      .then((bookFromApi) => {
        if (bookFromApi) {
          setBook(bookFromApi);
          setErrorMessage("");
        } else {
          setErrorMessage("We could not find this book.");
        }
      })
      .catch(() => {
        setErrorMessage("Something went wrong while loading this book.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [bookId]);

  if (isLoading) {
    return <Loading />;
  }

  if (errorMessage || !book) {
    return (
      <main className="book-detail book-detail-empty">
        <p>{errorMessage}</p>
        <button className="book-detail-back" onClick={() => navigate(-1)}>
          Go back
        </button>
      </main>
    );
  }

  const thumbnail = book.imageLinks?.thumbnail;
  const authors = book.authors?.join(", ") || "Unknown author";
  const categories = book.categories?.join(", ") || "Uncategorized";

  return (
    <main className="book-detail">
      <Link className="book-detail-back" to="/">
        Back to shelves
      </Link>
      <section className="book-detail-card">
        <div
          className="book-detail-cover"
          style={{ backgroundImage: thumbnail ? `url("${thumbnail}")` : "none" }}
          aria-label={`${book.title} cover`}
        />
        <div className="book-detail-content">
          <p className="book-detail-shelf">Shelf: {book.shelf || "none"}</p>
          <h1>{book.title}</h1>
          <p className="book-detail-authors">{authors}</p>
          <dl className="book-detail-meta">
            <div>
              <dt>Publisher</dt>
              <dd>{book.publisher || "Unknown"}</dd>
            </div>
            <div>
              <dt>Published</dt>
              <dd>{book.publishedDate || "Unknown"}</dd>
            </div>
            <div>
              <dt>Pages</dt>
              <dd>{book.pageCount || "Unknown"}</dd>
            </div>
            <div>
              <dt>Categories</dt>
              <dd>{categories}</dd>
            </div>
          </dl>
          <p className="book-detail-description">
            {book.description || "No description is available for this book."}
          </p>
          <section className="book-note" aria-labelledby="book-note-title">
            <div className="book-note-header">
              <h2 id="book-note-title">Personal note</h2>
              {note && (
                <button type="button" onClick={clearNote}>
                  Clear
                </button>
              )}
            </div>
            <textarea
              value={note}
              onChange={(event) => updateNote(event.target.value)}
              placeholder="Mình muốn đọc sách này vì...&#10;Đọc đến chương 5.&#10;Review ngắn sau khi đọc xong."
              aria-label={`Personal note for ${book.title}`}
              rows={6}
            />
            <p className="book-note-status">
              {note ? "Note saved on this device." : "No note yet."}
            </p>
          </section>
          {book.previewLink && (
            <a
              className="book-detail-preview"
              href={book.previewLink}
              target="_blank"
              rel="noreferrer"
            >
              Open preview
            </a>
          )}
        </div>
      </section>
    </main>
  );
};
