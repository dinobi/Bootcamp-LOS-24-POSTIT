import actionType from '../actionTypes';

/**
 * password reducer to handles reset and request password action
 * @param {state} state - initial app state object
 * @param {action} action - action creator to update state
 * @param {action.type} action.type - action type to listen for
 * @return {object} - new state object
 */
const passwordReducer = (state = {
  passwordRequestIsLoading: false,
  passwordResetIsLoading: false
}, action) => {
  switch (action.type) {
    case actionType.REQUEST_PASSWORD:
      return { ...state,
        passwordRequestIsLoading: true
      };
    case actionType.REQUEST_PASSWORD_SUCCESS:
      return { ...state,
        passwordRequestIsLoading: false
      };
    case actionType.REQUEST_PASSWORD_FAILURE:
      return { ...state,
        passwordRequestIsLoading: false
      };
    case actionType.RESET_PASSWORD_REQUEST:
      return { ...state,
        passwordResetIsLoading: true,
      };
    case actionType.RESET_PASSWORD_SUCCESS:
      return { ...state,
        passwordResetIsLoading: false
      };
    case actionType.RESET_PASSWORD_FAILURE:
      return { ...state,
        passwordResetIsLoading: false
      };
    default:
      return state;
  }
};

export default passwordReducer;
