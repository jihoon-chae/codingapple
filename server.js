const express = require("express");
const app = express(); // 서버를 띄우기 위한 기본 세팅

const bodyParser = require("body-parser"); // bodyParser라이브러리 사용
app.use(bodyParser.urlencoded({ extended: true })); // bodyParser라이브러리 사용

// MongoDB와 연결
const MongoClient = require("mongodb").MongoClient;
app.set("view engine", "ejs");

MongoClient.connect(
  "mongodb+srv://hoonn:wlgns1994@cluster0.8me9d.mongodb.net/?retryWrites=true&w=majority", // url에 DB계정아이디 : 패스워드 /데이터베이스 이름 쓸것!
  function (에러, client) {
    if (에러) return console.log(에러);
    //서버띄우는 코드 여기로 옮기기

    db = client.db("todoapp"); // todoapp 이라는 폴더에 연결

    // db.collection('post').insertOne() //원하는 데이터 저장하기

    // db.collection("post").insertOne(
    //   { 이름: "John", _id: 100 },
    //   function (에러, 결과) {
    //     // 저장할데이터, 콜백함수
    //     console.log("저장완료");
    //   }
    // );

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

// 어떤 사람이 /add 라는 경로로 post 요청을 하면,
// 데이터 2개(날짜, 제목)를 보여주는데,
// 이 때, ‘post’ 라는 이름을 가진 collection에 두개 데이터를 저장하기
// {제목 : '어쩌구', 날짜 : '어쩌구'}
app.post("/add", function (요청, 응답) {
  // add경로로 POST 요청을 하면 ~을 해주세요
  응답.send("전송완료");
  db.collection("counter").findOne(
    // name이 게시물개수인것만 찾아라
    { name: "게시물개수" },
    function (에러, 결과) {
      console.log(결과.totalPost);
      var 총게시물개수 = 결과.totalPost;

      db.collection("post").insertOne(
        { _id: 총게시물개수 + 1, 제목: 요청.body.title, 날짜: 요청.body.date },
        function (에러, 결과) {
          console.log("저장완료"); // post에 데이터 저장하기

          db.collection("counter").updateOne(
            { name: "게시물개수" },
            { $inc: { totalPost: 1 } },
            function (에러, 결과) {
              if (에러) {
                return console.log(에러);
              }
            }
          ); // 데이터 수정 -> {수정할 데이터}, {수정값} -> $inc => 1만큼 증가시켜줘라
        }
      );
    }
  );
});

//누가 Get요청으로 /list 접속하면
// 실제 DB에 저장된 데이터들로 꾸며진 HTML을 보여줌
app.get("/list", function (요청, 응답) {
  db.collection("post")
    .find()
    .toArray(function (에러, 결과) {
      console.log(결과);
      응답.render("list.ejs", { posts: 결과 }); // html말고 .ejs파일 보내주기(posts라는 이름으로 결과데이터 보내기)
    }); // post에 저장된 모든 데이터 가져오기
  // DB에 저장된 post라는 collection안의 모든 데이터를 꺼내주세요
});

app.delete("/delete", function (요청, 응답) {
  console.log(요청.body); // 요청시 해당 데이터 출력
  요청.body._id = parseInt(요청.body._id);
  db.collection("post").deleteOne(요청.body, function (에러, 결과) {
    console.log("삭제완료");
    응답.status(200).send({ message: "성공했습니다" });
  }); // 원하는 게시물 삭제(id가 1인 게시물삭제)
});
