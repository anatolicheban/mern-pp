import { Routes, Route } from "react-router-dom";
import { profileLinks } from "./data/dummy";
import { PersistLogin, RequiresAuth, SubLayout, Layout } from "./components";
import {
  Home,
  Favourites,
  NewAd,
  Profile,
  MyAds,
  Login,
  Register,
  SingleAd,
  EditAd,
} from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="ads/:id" element={<SingleAd />} />

        <Route element={<PersistLogin />}>
          <Route index element={<Home />} />

          <Route element={<RequiresAuth />}>
            <Route path="ads/:id/edit" element={<EditAd />} />

            <Route
              path="my-profile"
              element={<SubLayout links={profileLinks} title="Мій профіль" />}
            >
              <Route index element={<Profile />} />
              <Route path="ads" element={<MyAds />} />
            </Route>
            <Route path="new-ad" element={<NewAd />} />
            <Route path="favourites" element={<Favourites />}></Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
