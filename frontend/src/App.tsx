import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import LastSeen from "./pages/LastSeen";
import NewAd from "./pages/NewAd";
import Profile from "./pages/Profile";
import MyAds from "./pages/MyAds";
import SubLayout from "./components/SubLayout";
import { favsLinks, profileLinks } from "./data/dummy";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequiresAuth from "./components/RequiresAuth";
import Unauthorized from "./components/Unauthorized";
import PersistLogin from "./components/PersistLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/*Protected for users*/}
        <Route element={<PersistLogin />}>
          <Route element={<RequiresAuth />}>
            <Route
              path="my-profile"
              element={<SubLayout links={profileLinks} title="Мій профіль" />}
            >
              <Route index element={<Profile />} />
              <Route path="ads" element={<MyAds />} />
            </Route>
            <Route path="favourites" element={<SubLayout links={favsLinks} title="Обране" />}>
              <Route index element={<Favourites />} />
              <Route path="lastseen" element={<LastSeen />} />
            </Route>
            <Route path="new-ad" element={<NewAd />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
