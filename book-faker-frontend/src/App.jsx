import { Toaster } from "react-hot-toast";
import BookTable from "./components/BookTable";

const App = () => {
  return (
    <>
      <BookTable />
      <Toaster />
    </>
  );
};

export default App;
