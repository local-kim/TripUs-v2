// Root Reducer
import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import planner from './planner';
import auth from './auth';
import base from './base';
import citydata from './citydata';
import tripdata from './tripdata';
import weatherdata from './weatherdata';

const persistConfig = {
  key: "root",
  storage,  // localStorage에 저장
  whitelist: ["auth"] // storage에 저장할 reducer
  // blacklist : 제외할 reducer
};

const rootReducer = combineReducers({
  planner,
  auth,
  base,
  citydata,
  tripdata,
  weatherdata
});

// export default rootReducer;
export default persistReducer(persistConfig, rootReducer);