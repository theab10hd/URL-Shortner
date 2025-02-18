import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Redirecter from "./pages/Redirecter";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/*" element={<Redirecter />} />  
        <Route path="/login" element={<Auth login />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </>
  );
}

export default App;
