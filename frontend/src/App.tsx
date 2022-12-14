import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import FavLayout from "./components/FavLayout";
import LastSeen from "./pages/LastSeen";
import NewAd from "./pages/NewAd";
import Profile from "./pages/Profile";
import ProfileLayout from "./components/ProfileLayout";
import MyAds from "./pages/MyAds";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="my-profile" element={<ProfileLayout />}>
          <Route index element={<Profile />} />
          <Route path="ads" element={<MyAds />} />
        </Route>

        <Route path="favourites" element={<FavLayout />}>
          <Route index element={<Favourites />} />
          <Route path="lastseen" element={<LastSeen />} />
        </Route>

        <Route path="new-ad" element={<NewAd />} />
      </Route>
    </Routes>
  );
}

export default App;
