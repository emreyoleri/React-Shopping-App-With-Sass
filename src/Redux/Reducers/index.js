import { combineReducers } from "redux";
import dataReducer from "./dataReducer";
import cartReducer from "./cartReducer";

const reducers = combineReducers({
  dataReducer,
  cartReducer,
});

export default reducers;
