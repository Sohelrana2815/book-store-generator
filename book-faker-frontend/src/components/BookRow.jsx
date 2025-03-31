// src/components/BookRow.jsx

import { useMemo } from "react";

const BookRow = ({ book, isExpanded, onExpand }) => {
  const bgColor = useMemo(() => `hsl(${Math.random() * 360},70%,85%)`, []);

  return (
    <>
      <tr
        onClick={onExpand}
        className="cursor-pointer hover:bg-gray-100 border-b"
      >
        <td className="p-3">{book.index}</td>
        <td className="p-3">{book.isbn}</td>
        <td className="p-3 font-medium">{book.title}</td>
        <td className="p-3">{book.authors.join(", ")}</td>
        <td className="p-3">{book.publisher}</td>
      </tr>

      {isExpanded && (
        <tr className="border-b">
          <td colSpan={5} className="p-4">
            <div
              className="p-6 rounded-lg flex items-center"
              style={{ backgroundColor: bgColor }}
            >
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">{book.title}</h3>
                <p className="mb-2">By {book.authors.join(" & ")}</p>
                <p className="text-sm text-gray-600">{book.publisher}</p>

                {book.reviews.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-bold mb-2">
                      <p>Likes: {book.lik}</p>
                      Reviews ({book.reviews.length})
                    </h4>

                    {book.reviews.map((review, i) => (
                      <div key={i} className="mb-3 p-3 bg-white rounded">
                        <p className="italic">"{review.text}"</p>
                        <p className="text-sm text-gray-600 mt-1">
                          - {review.author}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="ml-8 w-48 h-64 bg-white rounded shadow flex items-center justify-center">
                <div className="text-center p-4">
                  <p className="text-lg font-bold">{book.title}</p>
                  <p className="text-sm mt-2">{book.authors.join(" & ")}</p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default BookRow;
