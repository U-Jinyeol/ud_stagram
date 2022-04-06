import { useEffect, useState } from "react";
//firebase.js에서 임포트하고 선언해준 auth를 가져옴
import { authService } from "./firebase";
import Header from "../components/Header";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import PostWrite from "../pages/PostWrite";
// import PostDetail from "../pages/PostDetail";

//리덕스에서 히스토리를 사용하게끔 하기위한 작업?
//원래는 BrowserRouter가 들어가지만 바꿔준다.
//리덕스에서 주소를 변경 및 확인하기 위해 history객체를 관리하며 필요에 의해 꺼내쓸 수 있는 라이브러리
//react Router 버전 v4, v5를 지원
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";

import { actionCreators } from "../redux/modules/user";
import { apiKey } from "./firebase";

function App() {
  //로그인과 로그인 아닐 시의 화면을 보여주기 위해 로그인 상태를 나타내는 state 값 생성
  //초기값은 false로 로그인 안하고 있도록 설정
  // const [isLogin, setIsLogin] = useState(false);
  //리덕스를 쓰기 전에는 useState로 테스트 하고 리덕스 사용 시 스토어에서 값을 얻어온다.
  // const isLogin = useSelector((state) => state.user.liLogin);
  const dispatch = useDispatch();
  const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(sessionKey);

  useEffect(() => {
    if (isSession) {
      dispatch(actionCreators.loginCheckFB());
    }
  });

  return (
    <>
      <Header></Header>
      <ConnectedRouter history={history}>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/postWrite" component={PostWrite}></Route>
        {/* <Route exact path="/postDetail" component={PostDetail}></Route> */}
      </ConnectedRouter>
    </>
  );
}

export default App;
