// Actions
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const SAVE_TRIP = 'plan/SAVE_TRIP';
const SAVE_PLAN = 'plan/SAVE_PLAN';
const RESET_PLAN = 'plan/RESET_PLAN';

// Action Creators
export const saveTrip = (tripInfo) => (
	{
		type: SAVE_TRIP,
		trip: tripInfo
	}
);

export const savePlan = (plan) => (
	{
		type: SAVE_PLAN,
		plan: plan
	}
);

export const resetPlan = () => (
	{
		type: RESET_PLAN
	}
)

// 초기 상태, 객체가 아니어도 된다.
const initialState = {
	trip: {},
	plan: [],
}

// Reducer
export default function reducer(state = initialState, action){
	switch(action.type){
		case SAVE_PLAN:
			// console.log(action.plan);
			return {
				...state,
				plan: action.plan
			}
		case SAVE_TRIP:
			// console.log(action.trip);
			return {
				...state,
				trip: action.trip,
			}
		case RESET_PLAN:
			return {
				trip: {},
				plan: []
			}
		default:
			return state; //반드시 default는 state return
	}
}