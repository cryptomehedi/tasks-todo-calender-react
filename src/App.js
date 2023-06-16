import { Route, Routes } from "react-router-dom";
import Calender from "./Components/TodoCal/Calender";
import Footer from "./Components/Footer";
import Nav from "./Components/Shared/Nav";
import Tasks from "./Components/TodoCal/Tasks";
import ToDoList from "./Components/TodoCal/ToDoList";
import Login from './Components/LoginRed/Login';
import Reg from './Components/LoginRed/Reg';
import Welcome from "./Components/Welcome";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./firebase.init";
import MyProfile from "./Components/Profile/MyProfile";
import NotFound from "./Components/Shared/NotFound";

function App() {
  const [user] = useAuthState(auth)

  return (
    <div>
      <Nav/>
      {
        user ? <Welcome/> : <></>
      }
      <Routes>
        <Route path="*" element={<NotFound/>} />
        <Route path="/" element={<Tasks/>} />
        <Route path="/todo" element={<ToDoList/>} />
        <Route path="/cal" element={<Calender/>} />
        <Route path='/registration' element={<Reg/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<MyProfile/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
