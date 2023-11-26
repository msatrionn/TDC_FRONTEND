import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import User from "./pages/users";
import CreateUser from "./pages/users/create";
import EditUser from "./pages/users/edit";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ToastContainer />
        <Routes>
          <Route Component={User} path="/" />
          <Route Component={Login} path="/login" />
          <Route Component={Register} path="/register" />
          <Route Component={User} path="/user" />
          <Route Component={CreateUser} path="/user/create" />
          <Route Component={EditUser} path="/user/edit" />
        </Routes>
      </header>
    </div>
  );
}

export default App;
