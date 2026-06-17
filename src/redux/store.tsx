import { createStore} from "redux";
import rootReducer from "./libraryreducer";

const store = createStore(rootReducer);

export default store;