import "./App.css";
import Home from "./Pages/user/Home";
import Login from "./Pages/user/Loign";
import Signup from "./Pages/user/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfile from "./Pages/user/UserProfile";
import AdminLogin from './Pages/admin/login'
import AdminHome from './Pages/admin/Home'
import Update from "./Pages/admin/Update";
import { useSelector } from "react-redux";
import Verification from "./components/user/accessVerification/Verification";
import HomeVerification from "./components/user/accessVerification/HomeVerification";
import AdminVerification from "./components/admin/accessVerification/Verification";

function App() {
  const user = useSelector((store)=> store.user.userToken)

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomeVerification > <Home /> </HomeVerification>}></Route>
          <Route path="/signup" element={<Verification accessBy={'non-Authorised'} > <Signup /> </Verification>} />
          <Route path='/login' element={<Verification accessBy={'non-Authorised'} > <Login /> </Verification>} />
          <Route path="/profile" element={<Verification accessBy={'Authorised'}> <UserProfile /></Verification>} />
          <Route path="/admin/login" element={<AdminVerification accessBy={'non-Authourised'}><AdminLogin /></AdminVerification>}  />
          <Route path="/admin/home" element={<AdminVerification accessBy={"Authorised"} > <AdminHome /> </AdminVerification>} />
          <Route path="/admin/userUpdate" element={<AdminVerification accessBy={"Authorised"}  > <Update /> </AdminVerification>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
