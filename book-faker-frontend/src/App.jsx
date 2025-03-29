import { useState, useEffect } from "react";
import "./App.css";
import axiosPublic from "./services/axiosPublic";
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
      <h1></h1>
    </>
  );
}

export default App;
