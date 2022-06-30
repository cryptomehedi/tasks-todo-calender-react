import { Route, Routes } from "react-router-dom";
import Nav from "./Components/Nav";
import Tasks from "./Components/Tasks";

function App() {
  return (
    <div>
      <Nav/>
      <Routes>
        <Route path="/" element={<Tasks/>} />
      </Routes>
    </div>
  );
}

export default App;
