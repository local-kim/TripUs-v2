const nodeMailer = require('nodemailer');

const mailPoster = nodeMailer.createTransport({
  service: 'Naver',
  host: 'smtp.naver.com',
  port: 587,
  auth: {
    user: 'suhyoony@naver.com',
    pass: 'boccuislove'
  }
});
// 메일을 받을 유저 설정
const mailOpt = (user_data, title, contents) => {
  const mailOptions = {
    from: 'suhyoony@naver.com',
    to: user_data.email ,
    subject: "이메일 인증",
    text: "인증번호 들어갈 자리"
  };

  return mailOptions;
}
// 메일 전송
const sendMail = (mailOption) => {
  mailPoster.sendMail(mailOption, function(error, info){
    if (error) {
      console.log('에러 ' + error);
    }
    else {
      console.log('전송 완료 ' + info.response);
    }
  });
}
