import { combineReducers } from 'redux';
import courseReducer from './courseReducer';
import authorReducer from './authorReducer';
import ajaxCallsReducer from './ajaxStatusReducer';

const rootReducer = combineReducers({
   courses: courseReducer,
   authors: authorReducer,
   ajaxCallsInProgess: ajaxCallsReducer
});

export default rootReducer;