import { combineReducers } from 'redux';

import ArticlesReducer from './articles/articles-reducer';
import articleReducer from './article/article-reducer';
import userReducer from './user/user-reducer';

const reducer = combineReducers({ ArticlesReducer, articleReducer, userReducer });

export default reducer;
