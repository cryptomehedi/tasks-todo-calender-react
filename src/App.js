import { Route, Routes } from "react-router-dom";
import Nav from "./Components/Nav";
import Tasks from "./Components/Tasks";
import To_Do_List from "./Components/To_Do_List";

function App() {
  return (
    <div>
      <Nav/>
      <Routes>
        <Route path="/" element={<Tasks/>} />
        <Route path="/todo" element={<To_Do_List/>} />
      </Routes>
    </div>
  );
}

export default App;
