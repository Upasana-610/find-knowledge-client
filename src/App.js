import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import GlobalStyles from "./globalStyle";
import ScrollToTop from "./core/ScrollToTop";
import SelectProfile from "./Pages/SelectProfile";

function App() {
  return (
    <>
      <Provider store={store}>
        <GlobalStyles />
        <BrowserRouter>
          <ScrollToTop>
            <Routes>
              <Route exact path="/" element={<SelectProfile />} />
            </Routes>
          </ScrollToTop>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
