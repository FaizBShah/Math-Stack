import authReducer from './authReducer'
import loadReducer from './loadReducer'
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  loading: loadReducer
});

export default rootReducer

// the key name will be the data property on the state object