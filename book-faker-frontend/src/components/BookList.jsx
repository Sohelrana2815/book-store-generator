const BookList = ({ books }) => {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th>Index</th>
          <th>ISBN</th>
          <th>Title</th>
          <th>Author</th>
          <th>Publisher</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.isbn}>
            <td>{book.index}</td>
            <td>{book.isbn}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.publisher}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookList;
