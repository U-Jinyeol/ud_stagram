//액션을 편하게 만들어주는 라이브러리?
import { createAction, handleActions } from "redux-actions";
//불변성 관리 -> ... 으로 복사해서 쓰지 않게 해주는?
import { produce } from "immer";
//cookie
import { getCookie, setCookie, deleteCookie } from "../../shared/Cookie";
import { authService } from "../../shared/firebase";
import firebase from "firebase/compat/app";

//Action type
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

//Action Creators(createAction 사용)
//createAction(액션타입, (받아오는 파라미터) => ({ 받아온 파라미터 }));
const setUser = createAction(SET_USER, (user) => ({ user }));
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

//

//middleware actions 로그인
//파이어베이스 사용 전 리덕스 상태 관리
// const loginAction = (user) => {
//   return function (dispatch, getState, { history }) {
//     console.log(history);
//     dispatch(setUser(user));
//     history.push("/");
//   };
// };

//middleware actions 로그인
const loginFB = (id, password) => {
  console.log(id, password);
  return function (dispatch, getState, { history }) {
    //인증 상태 지속(세션)
    authService.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(
      authService
        //id와 pwd로 로그인 확인
        .signInWithEmailAndPassword(id, password)
        //로그인이 확인이 되면 리듀서를 작동
        .then((user) => {
          console.log(user);

          dispatch(
            setUser({
              user_name: user.user.displayName,
              id: id,
              user_profile: "",
              uid: user.user.uid,
            })
          );
          history.push("/");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;

          console.log(errorCode, errorMessage);
        })
    );
  };
};

//middleware actions 로그인 체크
const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    //유저의 존재 여부를 확인하는 FB 함수
    //파이어베이스에서 로그인 여부를 확인하고 맞으면 유저 정보를 전달해줌
    //이 정보를 리덕스에 다시 보내게 된다.
    authService.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            user_name: user.displayName,
            id: user.email,
            user_profile: "",
            uid: user.uid,
          })
        );
      } else {
        dispatch(logOut());
      }
    });
  };
};

//middleware actions 로그아웃
const logoutFB = () => {
  return function (dispatch, getState, { history }) {
    //FB에서 로그아웃 하는 자체 함수 signOut
    authService.signOut().then(() => {
      dispatch(logOut());
      //지금 있는 페이지와 괄호 안에 있는 페이지와 바꿔치기
      history.replace("/");
    });
  };
};

//middleware actions 회원가입
//파이어 베이스 자체 비밀번호 인증을 통한 회원가입 포맷
//.then 은 성공 했을 때 작동하는 부분
const signupFB = (id, password, user_name) => {
  return function (dispatch, getState, { history }) {
    authService
      .createUserWithEmailAndPassword(id, password)
      .then((user) => {
        console.log(user);
        //위의 인증은 아이디와 비번만 가져가기 때문에 닉네임이 null값이 된다.
        //그래서 위 작업이 된 후에 fb 자체 update 기능을쓴다.
        authService.currentUser
          .updateProfile({
            displayName: user_name,
          })
          //닉네임 업데이트를 성공했을 때 유저 정보를 다시 세팅 해준다.
          .then(() => {
            dispatch(
              setUser({
                user_name: user_name,
                id: id,
                user_profile: "",
                uid: user.user.uid,
              })
            );
            //그리고 나면 홈으로 이동
            history.push("/");
          })
          //위의 작업 중 에러시
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage);
        // ..
      });
  };
};

//Reducer(handleActions 사용)
//handleActions({[액션타입]:(state, action) => {내용}}, initialState);
//immer를 가져오는 produce 사용
//A를 가져와 스스로 A'를 만들어서 A'로 안쓰고 A로 써도원본은 그대로 유지된다.
//produce{(원본값, (복사한값) => {})},
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (copy) => {
        //갑자기 payload? 어디서 정의해준지 모르겠음
        //여기서 copy.user 는 스토어의 원본(state)을 복사한 copy본에서
        //클라이언트가 액션을 실행할 때 보내준 정보를 Action Creator가 user라는 파라미터 명에 담아온 정보
        //로그인을 실행하면 유저 정보를 담고, 로그인 상태가 true가 된다.
        setCookie("isLogin", "success");
        copy.user = action.payload.user;
        copy.isLogin = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (copy) => {
        deleteCookie("isLogin");
        copy.user = null;
        copy.isLogin = false;
      }),
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
  logOut,
  getUser,
  setUser,
  signupFB,
  loginFB,
  loginCheckFB,
  logoutFB,
};

export { actionCreators };
