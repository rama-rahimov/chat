import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import Registration from "./pages/registration.jsx";
import MainPage from "./pages/main/main.jsx";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </Router>
  );
}

export default App;
