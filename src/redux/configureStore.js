// combineReducers()를 사용해서 export한 reducer를 모아 root reducer를 만들고,
// 미들웨어를 적용해주고,
// createStore()를 사용해서 root reducer와 미들웨어를 엮어 스토어를 만든다.

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
//리덕스에서 history를 사용 가능하게
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from "./modules/user";

//history 사용
//history를 변수로 만든다.
export const history = createBrowserHistory();

// rootReducer
// history도 리듀서에 넣어준다
// 라우터와 만든 히스토리가 연결되는 의미
const rootReducer = combineReducers({
  user: User,
  router: connectRouter(history),
});

// middleware
// thunk에서 history가 사용되도록 정의
// with~ 이부분은 history를 넘겨준다는 의미
const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// env가 개발환경이면 logger를 가져온다.
// require는 패키지를 가져온다. -> import랑 같은 역할
// import를 하게되면 사용자가 보게 되서 import 대신에 require를 사용해서 개발환경에서만 사용
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

//redux devTools 설정
//지금 돌아가는 환경이 브라우저 이고, 리덕스 데브툴즈가 깔려있으면 데브툴즈를 활성화
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

// 미들웨어 묶기
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

//스토어 만들기 -> 미들웨어 + 리듀서
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
