import { Routes, Route } from "react-router-dom";
import { favsLinks, profileLinks } from "./data/dummy";
import { PersistLogin, RequiresAuth, SubLayout, Layout } from "./components";
import { Home, Favourites, LastSeen, NewAd, Profile, MyAds, Login, Register } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<PersistLogin />}>
          <Route index element={<Home />} />
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
