import { useState, useEffect } from "react";
import axiosPublic from "./services/axiosPublic";
import BookList from "./components/BookList";
function App() {
  const [books, setBooks] = useState([]);
  const [seed, setSeed] = useState(42);
  const [locale, setLocale] = useState("en_US");

  // FETCH DATA FROM API

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axiosPublic.get("/books", {
        params: { seed, locale, startIndex: 0, count: 20 },
      });
      setBooks(response.data);
    };
    fetchBooks();
  }, [seed, locale]);

  return (
    <>
      <div className="p-8">
        <h1 className="text-2xl mb-4">Book Store Generator</h1>
        <BookList books={books} />
      </div>
    </>
  );
}

export default App;
