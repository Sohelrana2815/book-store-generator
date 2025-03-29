import { useState,useEffect } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [seed, setSeed] = useState(42);
  const [locale, setLocale] = useState("en_US");


  // FETCH DATA FROM API
  
  useEffect(()=>{
    const fetchBooks = async()=>{
      const response = await 
    }
  },[])

  return (
    <>
      <h1>Vite + React</h1>
    </>
  );
}

export default App;
