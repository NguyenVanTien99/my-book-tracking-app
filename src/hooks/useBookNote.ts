import { useEffect, useState } from "react";

const BOOK_NOTE_KEY_PREFIX = "myreads:book-note:";

const getBookNoteKey = (bookId: string) => `${BOOK_NOTE_KEY_PREFIX}${bookId}`;

export const useBookNote = (bookId?: string) => {
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    if (!bookId) {
      setNote("");
      return;
    }

    setNote(localStorage.getItem(getBookNoteKey(bookId)) || "");
  }, [bookId]);

  const updateNote = (nextNote: string) => {
    setNote(nextNote);

    if (!bookId) {
      return;
    }

    const noteKey = getBookNoteKey(bookId);
    if (nextNote.trim()) {
      localStorage.setItem(noteKey, nextNote);
    } else {
      localStorage.removeItem(noteKey);
    }
  };

  const clearNote = () => updateNote("");

  return { note, updateNote, clearNote };
};
