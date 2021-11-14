import { GLOBALTYPES } from "../actions/globalTypes";

const initState = {
  allUser: [],
  token: null
}

export default function User(state = initState, action) {
  switch (action.type) {
    case GLOBALTYPES.GET_ALL_USER:
      return {
        ...state,
        allUser: action.payload
      }
    case GLOBALTYPES.LOGIN:
      return {
        ...state,
        token: action.payload
      }
    case GLOBALTYPES.LOGOUT:
      return {
        ...state,
        token: null
      }
    default:
      return state
  }
}