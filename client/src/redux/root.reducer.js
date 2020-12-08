import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import candidateReducer from './candidate/candidate.reducer';
import choicesReducer from './choices/choices.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['candidate']
};

const rootReducer = combineReducers({
    user: userReducer,
    candidate: candidateReducer,
    choices: choicesReducer
});

export default persistReducer(persistConfig, rootReducer);
