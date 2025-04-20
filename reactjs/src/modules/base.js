// Actions
const SET_HEADER_VISIBILITY = 'base/SET_HEADER_VISIBILITY';

// Action Creators
export const setHeaderVisibility = (visible) => (
	{
		type: SET_HEADER_VISIBILITY,
    visible: visible
	}
);

// Initial State
const initialState = {
  visible: true
};

// Reducer
export default function reducer(state = initialState, action){
	switch(action.type){
		case SET_HEADER_VISIBILITY:
			return {
				visible: action.visible
			};
		default:
			return state;
	}
}