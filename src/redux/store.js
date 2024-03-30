import { configureStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";

const store = configureStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
