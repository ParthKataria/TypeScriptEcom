import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Categories from "./components/Categories";
import AllItems from "./components/AllItems";
import CategoryItems from "./components/CategoryItems";
import Item from "./components/Item";
import { MyUser } from "components/definations";
const App = () => {
  const [user, setUser] = useState<MyUser | null>(null);
  const handleSetUser = (USER: MyUser | null = null): void => {
    setUser(USER);
  };
  return (
    <Routes>
      <Route
        path="/"
        element={<NavBar user={user} handleSetUser={handleSetUser} />}
      >
        <Route index element={<Home />} />
        <Route
          path="/login"
          element={<Login handleSetUser={handleSetUser} />}
        />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:category" element={<CategoryItems />} />
        <Route path="/products" element={<AllItems />} />
        <Route path="/products/:id" element={<Item />} />
      </Route>
    </Routes>
  );
};
export default App;
