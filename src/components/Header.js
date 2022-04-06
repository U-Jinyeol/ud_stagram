import Grid from "../elements/Grid";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";
import { history } from "../redux/configureStore";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../redux/modules/user";
import { apiKey } from "../shared/firebase";

const Header = (props) => {
  //로그인이 되어있는지 아닌지 값으로 저장
  //쿠키랑 연결하여 확인을 해야함
  // const [isLogin, setIsLogin] = useState(false);

  //쿠키를 가져오는 함수로 user_id로 저장된 쿠키를 가져옴
  //쿠키의 여부에 따라 is_login의 불린값을 바꿈
  // useEffect(() => {
  //   let cookie = getCookie("user_id");

  //   if (cookie) {
  //     setIsLogin(true);
  //   } else {
  //     setIsLogin(false);
  //   }
  // });
  const dispatch = useDispatch();
  //리덕스에서의 로그인 정보 확인
  const isLogin = useSelector((state) => state.user.isLogin);
  //세션키 확인
  const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  // 세션이 있나 확인
  const isSession = sessionStorage.getItem(sessionKey);

  console.log(sessionKey);

  if (isLogin && sessionKey) {
    return (
      <>
        <Grid is_flex padding="4px" width="400px" margin="0 auto 0 auto">
          <Grid>
            {/* <Text margin="0px" size="24px" bold>헬로</Text> */}
            <Image src="https://fontmeme.com/images/instagram-new-logo.png"></Image>
          </Grid>

          <Grid is_flex>
            <Button>내정보</Button>
            <Button>알림</Button>
            <Button
              onClick={() => {
                dispatch(actionCreators.logoutFB());
              }}
            >
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid is_flex padding="4px" width="400px" margin="0 auto 0 auto">
        <Grid>
          {/* <Text margin="0px" size="24px" bold>헬로</Text> */}
          <Image src="https://fontmeme.com/images/instagram-new-logo.png"></Image>
        </Grid>

        <Grid is_flex>
          <Button
            onClick={() => {
              history.push("/login");
            }}
          >
            로그인
          </Button>
          <Button
            onClick={() => {
              history.push("/signup");
            }}
          >
            회원가입
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const Image = styled.img`
  margin: 0px;
  width: 100px;
  font-weight: 800;
`;

const Button = styled.button`
  width: 90px;
  height: 30px;
  background-color: black;
  color: #ffffff;
  box-sizing: border-box;
  border: none;
  margin-left: 5px;
  :hover {
    box-shadow: 0px 0px 3px gray;
  }
`;

export default Header;
