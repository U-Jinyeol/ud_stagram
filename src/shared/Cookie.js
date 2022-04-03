//쿠키 가져오기
//document.cookie 하면 쿠키에 저장된 정보를 가져온다. -> 자바스크립트
//user_id=haha; user_pwd=pppp
const getCookie = (name) => {
  let value = "; " + document.cookie;

  let parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    //pop은 배열의 뒷 부분을 빼옴, [0,1] 있으면 1을 빼옴
    //shift는 배열의 앞 부분을 빼옴
    return parts.pop().split(";").shift();
  }
};

//쿠키 추가하기
//exp=5를 하면 exp(만료일)를 받아오지 않아도 기본값을 지정해줘서 사용할 수 있음
//로그인에서 쿠키생성 함수가 날라와서 실행
const setCookie = (name, value, exp = 5) => {
  //날짜 만들기
  let date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);

  //쿠키 만들기
  //expires는 만료일을 문자로 넣어줘야함
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}`;
};

//쿠키 삭제하기
const deleteCookie = (name) => {
  let date = new Date("2020-01-01").toUTCString();
  document.cookie = name + "=; expires=" + date;
};

export { getCookie, setCookie, deleteCookie };
