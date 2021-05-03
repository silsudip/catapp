import { combineReducers } from "redux";
import { catReducer } from "./cat";

const rootReducer = combineReducers({
    catState: catReducer
});
export default rootReducer;
