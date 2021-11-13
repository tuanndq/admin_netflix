import { GLOBALTYPES } from "../actions/globalTypes";

const initState = {
  allUser: []
}

export default function User(state = initState, action) {
  switch (action.type) {
    case GLOBALTYPES.GET_ALL_USER:
      return {
        ...state,
        allUser: action.payload
      }
    default:
      return state
  }
}