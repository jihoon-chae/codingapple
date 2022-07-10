const express = require("express");
const app = express(); // 서버를 띄우기 위한 기본 세팅

const bodyParser = require("body-parser"); // bodyParser라이브러리 사용
app.use(bodyParser.urlencoded({ extended: true })); // bodyParser라이브러리 사용

// MongoDB와 연결
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(
  "mongodb+srv://hoonn:1234@cluster0.8me9d.mongodb.net/?retryWrites=true&w=majority",
  function (에러, client) {
    if (에러) return console.log(에러);
    //서버띄우는 코드 여기로 옮기기
    app.listen("8080", function () {
      console.log("listening on 8080");
    });
  }
);


app.get("/pet", function (요청, 응답) {
  // get(경로, 함수) // 펫상품 보여주기
  응답.send("반갑습니다 펫용품 쇼핑 사이트입니다."); // pet관련 안내문 띄워주기
});

app.get("/beauty", function (요청, 응답) {
  // 뷰티 상품 보여주기
  응답.send("반갑습니다 뷰티용품 쇼핑 사이트입니다.");
});

app.get("/", function (요청, 응답) {
  // 어떤사람이 /로 접속했을 때
  // 파일을 보내기
  응답.sendFile(__dirname + "/index.html"); // __dirname은 현재 파일의 경로 -> /.index.html 파일을 보내주세요
});

app.get("/write", function (요청, 응답) {
  응답.sendFile(__dirname + "/write.html");
});

app.post("/add", function (요청, 응답) {
  // add경로로 POST 요청을 하면 ~을 해주세요
  응답.send("전송완료");
  console.log(요청.body.date);
  console.log(요청.body.title); //요청.body는 폼에 입력한 제목과 날짜 데이터
});
