const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(8080, function () {
  console.log("listening on 8080");
});

app.get("/pet", function (요청, 응답) {
  응답.send("반갑습니다 펫용품 쇼핑 사이트입니다.");
});

app.get("/beauty", function (요청, 응답) {
  응답.send("반갑습니다 뷰티용품 쇼핑 사이트입니다.");
});

app.get("/", function (요청, 응답) {
  // 파일을 보내기
  응답.sendFile(__dirname + "/index.html"); // __dirname은 현재 파일의 경로
});

app.get("/write", function (요청, 응답) {
  응답.sendFile(__dirname + "/write.html");
});

app.post("/add", function (요청, 응답) {
  // /add경로로 POST 요청을 하면 ~을 해주세요
  console.log(요청.body.date);
  console.log(요청.body.title); //요청.body는 폼에 입력한 제목과 날짜 데이터
  응답.send("전송완료");
});
