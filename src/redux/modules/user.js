//액션을 편하게 만들어주는 라이브러리?
import { createAction, handleActions } from "redux-actions";
//불변성 관리 -> ... 으로 복사해서 쓰지 않게 해주는?
import { produce } from "immer";
//cookie
import { getCookie, setCookie, deleteCookie } from "../../shared/Cookie";

//Action type
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";

//Action Creators(createAction 사용)
//createAction(액션타입, (받아오는 파라미터) => ({ 받아온 파라미터 }));
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

//기존 형태
// const login = (user) => {
//   return {
//     type: LOG_IN,
//     user,
//   };
// };

//초기값
//초기에는 user가 없으니 null, 로그인 상태도 false로 하지 않았음을 나타냄
const initialState = {
  user: null,
  isLogin: false,
};

//Reducer(handleActions 사용)
//handleActions({[액션타입]:(state, action) => {내용}}, initialState);
//immer를 가져오는 produce 사용
//A를 가져와 스스로 A'를 만들어서 A'로 안쓰고 A로 써도원본은 그대로 유지된다.
//produce{(원본값, (복사한값) => {})},
const reducer = handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (copy) => {
        //갑자기 payload? 어디서 정의해준지 모르겠음
        //여기서 copy.user 는 스토어의 원본(state)을 복사한 copy본에서
        //클라이언트가 액션을 실행할 때 보내준 정보를 Action Creator가 user라는 파라미터 명에 담아온 정보
        //로그인을 실행하면 유저 정보를 담고, 로그인 상태가 true가 된다.
        setCookie("isLogin", "success");
        copy.user = action.payload.user;
        copy.isLogin = true;
      }),
    [LOG_OUT]: (state, action) => produce(state, (copy) => {}),
    [GET_USER]: (state, action) => produce(state, (copy) => {}),
  },
  initialState
);

//기존 형태
// export default function reducer(state = initialState, action = {}) {
//   switch (action.type) {
//     //어떤 케이스인지 써주기
//     case "post/LOAD": {
//       return { list: action.post_list };
//     }
//     default:
//       return state;
//   }
// }

// Action Creator export
// 각자 해주어도 되고 이렇게 묶어서 해줘도 됨
const actionCreators = {
  logIn,
  logOut,
  getUser,
};

export { actionCreators };
