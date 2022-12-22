
import Home from "./pages/home/Home";
import CreateOrder from "./pages/home/CreateOrder";
import EditOrder from "./pages/home/EditOrder";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreateOrder />} />
        <Route path="/edit/:id" element={<EditOrder />} />
      </Routes>
    </Router>
  );
}
export default App;
