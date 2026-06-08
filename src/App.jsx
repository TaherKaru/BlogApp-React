import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./Storage/AuthSlice";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import service from "./AppWrite/Auth";



function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    service
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(setloading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          {/* outlet */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
