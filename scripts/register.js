// 정규표현식 선언
var idPattern = /^[A-Za-z]{1}[A-Za-z0-9]{6,16}$/;
var pwPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
var emailPattern =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{1,3}$/i;
var phonePattern = /^01[016789]{1}-?([0-9]{4})-?([0-9]{4})$/;
var nickPattern = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣A-Za-z0-9]{2,20}$/;

// 요소 가져오기
const userId = document.getElementById("logo_id");
const userPwd = document.getElementById("logo_pwd");
const confirmUserPwd = document.getElementById("logo_confirmPwd");
const userTel = document.getElementById("logo_tel");
const userMail = document.getElementById("logo_mail");
const userNick = document.getElementById("logo_nickName");
const errorMsg = document.querySelector(".register-error-msg");
//공백확인 함수

function text(elem, text) {
    elem.innerHTML = text;
}
function changeBlank() {
    errorMsg.innerHTML = "";
}

function checkValue(value, dataName) {
    // 입력(value)로 들어온 값이 공백("")이면
    if (value == "") {
        // dataName을 입력해주세요 알림
        alert(dataName + " 입력해주세요!");

        // 함수 실행 중지
        return false;
    }
    return true;
}

function check() {
    // checkID값이 false일 시 return false로 함수 중지
    if (!checkID(userId)) return false;
    borderReturn(userId);
    changeBlank();
    // 값이 잘 들어가는지 로그를 찍어보자
    console.log("아이디 확인");
    if (!checkPwd(userPwd, confirmUserPwd)) return false;
    borderReturn(userPwd);
    borderReturn(confirmUserPwd);
    console.log("비밀번호 확인");
    if (!checkTel(userTel)) return false;
    borderReturn(userTel);
    console.log("전화번호 확인");
    if (!checkMail(userMail)) return false;
    borderReturn(userMail);
    console.log("메일 확인");
    if (!checkNick(userNick)) return false;
    borderReturn(userNick);
    console.log("닉네임 확인");
    return true;
}

//아이디 확인
function checkID(id) {
    // 들어온 값이 공백일 시 함수 실행 중지
    // !((checkValue 값): false) -> !false -> true / if문 실행
    // !((checkValue 값): true) -> !true -> false / if문 통과
    if (!checkValue(id.value, "아이디를")) {
        borderRed(id);
        return false;
    }
    // 정규표현식 유효성 검사
    // test는 유효성 검사 후 true, false 값을 반환한다.
    // test 값이 false일 시 실행
    if (!idPattern.test(id.value)) {
        // 경고창 발생
        text(errorMsg, "6 ~ 16자로 적어주세요.");
        borderRed(id);
        // value값 초기화
        id.value = "";
        // 아이디 focus
        id.focus();
        // 함수 실행 중지
        return false;
    }
    //
    return true;
}

//비밀번호 확인
function checkPwd(pwd, confirmPwd) {
    // 공백확인
    if (!checkValue(pwd.value, "비밀번호를")) {
        borderRed(pwd);
        return false;
    }

    // 정규표현식 유효성 검사
    if (!pwPattern.test(pwd.value)) {
        alert(
            "비밀번호는 영문 대소문자와 숫자 및 특수문자를 포함한 8~16자리로 입력해야 합니다!"
        );
        borderRed(pwd);
        pwd.value = "";
        pwd.focus();
        return false;
    }

    // 공백확인
    // if (!checkValue(confirmPwd.value, "비밀번호 재입력을")) return false;
    // // 정규표현식 유효성 검사
    // if (!pwPattern.test(confirmPwd.value)) {
    //   alert("앞에 적은 비밀번호를 확인해주세요!");
    //   borderRed(confirmPwd);
    //   confirmPwd.value = "";
    //   confirmPwd.focus();
    //   return false;
    // }

    // 재입력한 패스워드가 처음 입력한 패스워드와 다를 때 사용하는 함수
    if (pwd.value != confirmPwd.value) {
        // 경고창
        alert("비밀번호가 같지 않습니다! 다시 입력해주세요!");
        borderRed(pwd);
        borderRed(confirmPwd);
        // value값 초기화
        pwd.value = "";
        confirmPwd.value = "";
        // focus
        pwd.focus();
        return false;
    }

    return true;
}

//전화번호 입력
function checkTel(tel) {
    if (!checkValue(tel.value, "전화번호를")) {
        borderRed(tel);
        return false;
    }

    if (!phonePattern.test(tel.value)) {
        alert("01x-xxxx-xxxx의 형식을 지켜주세요!");
        borderRed(tel);
        tel.value = "";
        tel.focus();
        return false;
    }
    return true;
}
//메일 확인
function checkMail(mail) {
    if (!checkValue(mail.value, "메일을")) {
        borderRed(mail);
        return false;
    }

    if (!emailPattern.test(userMail.value)) {
        alert("메일 형식을 지켜주세요! ex) abc@naver.com");
        borderRed(mail);
        mail.value = "";
        mail.focus();
        return false;
    }
    return true;
}
// 닉네임 확인
function checkNick(nick) {
    if (!checkValue(nick.value, "닉네임을")) {
        borderRed(nick);
        return false;
    }
    if (!nickPattern.test(userNick.value)) {
        alert(
            "숫자, 영어, 한국어와 언더스코어를 허용하며 최소 2자 이상의 닉네임"
        );
        borderRed(nick);
        nick.value = "";
        nick.focus();
        return false;
    }
    return true;
}

// 데이터베이스 미 연동으로 인한 미구현
function isDupli() {
    alert("중복되지 않았습니다.");
    return false;
}

function borderRed(dataName) {
    dataName.style.borderBottomColor = "red";
}
function borderReturn(dataName) {
    dataName.style.borderBottomColor = "#cccccc";
}