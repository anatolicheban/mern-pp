import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./app/store";
const theme = createTheme({
  palette: {
    primary: {
      main: "#023b59",
    },
  },
});

const root = createRoot(document.getElementById("wrapper") as HTMLElement);
root.render(
  <Router>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StrictMode>
          <App />
        </StrictMode>
      </ThemeProvider>
    </Provider>
  </Router>
);
