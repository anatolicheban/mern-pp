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

        <Route element={<PersistLogin />}>
          <Route index element={<Home />} />
          <Route path="ads">
            <Route path=":id">
              <Route index element={<SingleAd />} />
              <Route element={<RequiresAuth />}>
                <Route path="edit" element={<EditAd />} />
              </Route>
            </Route>
          </Route>

          <Route element={<RequiresAuth />}>
            <Route
              path="my-profile"
              element={<SubLayout links={profileLinks} title="Мій профіль" />}
            >
              <Route index element={<Profile />} />
              <Route path="ads" element={<MyAds />} />
            </Route>
            <Route path="favourites" element={<Favourites />}></Route>
            <Route path="new-ad" element={<NewAd />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
