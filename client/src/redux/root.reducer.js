import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import candidateReducer from './candidate/candidate.reducer';
import locationReducer from './location/location.reducer';
import candidateListReducer from './candidateList/candidate.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['candidate']
};

const rootReducer = combineReducers({
  user: userReducer,
  location: locationReducer,
  candidate: candidateReducer,
  candidateList: candidateListReducer
});

export default persistReducer(persistConfig, rootReducer);
