// Actions
const LOGIN = 'auth/LOGIN';
const LOGOUT = 'auth/LOGOUT';
const CHANGE_PHOTO = 'auth/CHANGE_PHOTO';
const SET_TOKEN = 'auth/SET_TOKEN';
const SET_CURRENT_USER = 'auth/SET_CURRENT_USER';

// Action Creators
export const login = (saveId, user) => (
	{
		type: LOGIN,
    saveId: saveId,
    user: user
	}
);

export const logout = () => (
  {
    type: LOGOUT
  }
);

export const changePhoto = (user) => (
	{
		type: CHANGE_PHOTO,
    user: user
	}
);

// export const setToken = () => (
//   {
//     type: SET_TOKEN
//   }
// );

// export const setCurrentUser = (user) => (
//   {
//     type: SET_CURRENT_USER,
//     user: user
//   }
// )

// 초기 상태, 객체가 아니어도 된다.
const initialState = {
  isLoggedIn: false,
  saveId: false,
	// isAuthenticated: false,
  user: {}
};

// Reducer
export default function reducer(state = initialState, action){
	switch(action.type){
		case LOGIN:
			return {
				isLoggedIn: true,
        saveId: action.saveId,
        user: action.user
			};
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false
      };
    case CHANGE_PHOTO:
      return {
        ...state,
        user: action.user
      };
    // case SET_TOKEN:
    //   return {

    //   };
    // case SET_CURRENT_USER:
    //   return {
    //     isLoggedIn: true,
    //     // isAuthenticated: true,
    //     user: action.user
    //   };
		default:
			return state;
	}
}