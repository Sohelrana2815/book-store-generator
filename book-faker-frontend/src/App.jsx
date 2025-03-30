import { useState, useEffect } from "react";
import { useBooks } from "./hooks/useBooks";
function App() {
  const [locale, setLocale] = useState("en_US");
  const [seed, setSeed] = useState(42);
  const [avgLikes, setAvgLikes] = useState(3.7);
  const [avgReviews, setAvgReviews] = useState(4.5);

  

  // FETCH DATA FROM API

  return (
    <>
      <div className="p-8">
        <h1 className="text-2xl mb-4">Book Store Generator</h1>
      </div>
    </>
  );
}

export default App;
