import { combineReducers } from 'redux';

import newsReducer from './reducer-news';

const rootReducer = combineReducers({
  news: newsReducer
});

export default rootReducer;
