import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    user
  })
