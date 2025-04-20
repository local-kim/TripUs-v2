import "../../../style/register.css";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AxiosService from "../../../service/AxiosService";
import CustomModal from "../../../components/user/CustomModal";
import JoinPresenter from "../../../components/user/JoinPresenter";
import UserService from "../../../service/UserService";
import { useNavigate } from "react-router-dom";

const RegisterTest = () => {
  // 이용약관 체크박스
  const [allCheck, setAllCheck] = useState(false);
  const [regCheck, setRegCheck] = useState(false);
  const [fundingCheck, setFundingCheck] = useState(false);
  const [userCheck, setUserCheck] = useState(false);

  const allBtnEvent = () => {
    console.log(allCheck);

    if (allCheck === false) {
      setAllCheck(true);
      setRegCheck(true);
      setFundingCheck(true);
      setUserCheck(true);
    } else {
      setAllCheck(false);
      setRegCheck(false);
      setFundingCheck(false);
      setUserCheck(false);
    }
  };

  const regBtnEvent = () => {
    if (regCheck === false) {
      setRegCheck(true);
    } else {
      setRegCheck(false);
    }
  };

  const fundingBtnEvent = () => {
    console.log(fundingCheck);
    if (fundingCheck === false) {
      setFundingCheck(true);
    } else {
      setFundingCheck(false);
    }
  };

  const userBtnEvent = () => {
    console.log(userCheck);
    if (userCheck === false) {
      setUserCheck(true);
    } else {
      setUserCheck(false);
    }
  };

  useEffect(() => {
    if (regCheck === true && fundingCheck === true && userCheck === true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [regCheck, fundingCheck, userCheck]);

  // react-hook-form 함수
  const {
    register,
    watch,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [modalContent, setModalContent] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  ///이메일 중복확인
  const [user_emailCheck, setUser_emailCheck] = useState(null);
  ///닉네임 중복확인
  const [user_nicknameCheck, setUser_nicknameCheck] = useState(null);
  const comfrimUrl = "http://localhost:9150/" + "api/emailConfirm";
  //이메일 인증번호
  const [emailAuth, setEmailAuth] = useState(false);
  //입력된 이메일
  const data_email = getValues("user_email");
  const [disable, setDisable] = React.useState(false);

  const email_confirm = document.getElementById("email_confirm");

  //중복이메일 체크 및 이메일 인증 메세지 보내기
  const email_check_button = (e) => {
    //이메일 유효성 체크
    const emailExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    //인증번호 전송

    if (data_email === "") {
      handleOpen();
      setModalTitle("이메일 정보입력 오류");
      setModalContent("이메일을 입력해주세요");
    } else if (!emailExp.test(data_email)) {
      handleOpen();
      setModalTitle("이메일 정보입력 오류");
      setModalContent("이메일을 형식에 맞추어 입력해주세요");
    } else {
      axios
        .post("http://localhost:9150/api/duplicateCheck", {
          user_email: data_email,
        })
        .then((res) => {
          console.log(res);
          if (res.data === "cofirm") {
            setUser_emailCheck(false);
            handleOpen();
            setModalTitle("이메일 오류");
            setModalContent("이미 가입된 이메일입니다.");
          } else if (res.data === "") {
            setUser_emailCheck(false);
            handleOpen();
            setModalTitle("이메일 오류");
            setModalContent("이메일을 입력해주세요.");
          } else if (res.data === "pass") {
            setUser_emailCheck(true);
            handleOpen();
            setModalTitle("이메일 인증확인");
            setModalContent("이메일을 인증번호를 확인해주세요 .");
          } else {
            setUser_emailCheck(true);
            handleOpen();
            setModalTitle("이메일 인증확인");
            setModalContent("이메일 인증번호를 확인해주세요.");
          }
          if (user_emailCheck === true) {
            email_confirm.focus();
          }
        });
    }
  };

  //인증완료 버튼
  const authCofirm = (e) => {
    const data_key = getValues("email_confirm");
    axios
      .post(comfrimUrl, {
        user_email: data_email,
        authentication_key: data_key,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === true) {
          setDisable(true);
          handleOpen();
          setModalTitle("이메일 인증");
          setModalContent("인증 완료");
        } else {
          setDisable(false);
          handleOpen();
          setModalTitle("이메일 인증");
          setModalContent("인증번호를 다시 확인해주세요.");
        }
      });
  };

  // 비밀번호 확인
  const user_password = useRef();
  user_password.current = watch("user_password");

  //  닉네임 확인
  const nicknameCheck = () => {
    const nickname = getValues("user_nickname");
    AxiosService.post("/api/nicknameCheck", { user_nickname: nickname }).then(
      (res) => {
        if (res.data == false) {
          setUser_nicknameCheck(false);
          handleOpen();
          setModalTitle("아이디 중복확인");
          setModalContent("중복된 아이디입니다.");
        } else {
          setUser_nicknameCheck(true);
          handleOpen();
          setModalTitle("아이디 중복확인");
          setModalContent("사용가능한 닉네임입니다.");
        }
      }
    );
  };
  //로그인 체크
  const isLoggedIn = () => {
    return UserService.isLoggedIn();
  };
  //로그인 후 페이지 이동
  const navigation = useNavigate();

  // 회원가입 완료 버튼
  const onSubmit = (data) => {
    if (disable === true && user_nicknameCheck === true && allCheck === true) {
      console.log(data);
      const url = "api/signup";
      AxiosService.post(url, data, {
        user_recommend: getValues("user_recommend"),
      }).then((res) => {
        if (res.data === "pass") {
          handleOpen();
          setModalTitle("회원가입");
          setModalContent("회원가입완료");
          console.log(data.user_email);
          console.log(data.user_password);
          UserService.login({
            user_email: data.user_email,
            user_pwd: data.user_password,
          });
          console.log("isLoggedIn()", isLoggedIn());
          if (isLoggedIn) {
            navigation("/");
          }
        } else if (res.data === "emailCheck") {
          handleOpen();
          setModalTitle("회원가입 오류");
          setModalContent(
            "비정상적인 이메일 인증을 감지하였습니다. 확인해주세요."
          );
        } else if (res.data === "nicknameCheck") {
          handleOpen();
          setModalTitle("회원가입 오류");
          setModalContent(
            "비정상적인 닉네임 중복을 감지하였습니다. 확인을해주세요."
          );
        } else if (res.data === "recommederError") {
          handleOpen();
          setModalTitle("회원가입 오류");
          setModalContent("추천인 아이디가 존재하지 않습니다.");
        } else {
          handleOpen();
          setModalTitle("회원가입 오류");
          setModalContent("오류입니다. bitgwang1215@gmail.com 문의주세요.");
        }
      });
    } else if (disable !== true) {
      handleOpen();
      setModalTitle("회원가입 오류");
      setModalContent("이메일 인증 확인해주세요.");
    } else if (user_nicknameCheck !== true) {
      handleOpen();
      setModalTitle("회원가입 오류");
      setModalContent("닉네임 중복을 확인해주세요.");
    } else {
      handleOpen();
      setModalTitle("회원가입 오류");
      setModalContent("이용약관동의를 확인해주세요.");
    }
  };

  return (
    <div className="register_page">
      <div className="register_page_wrap">
        <h2> 회원가입</h2>
        <p className="page-description">최소한의 정보를 받고 있습니다.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="register_page_form">
          <input type="hidden" value="snsnull" {...register("sns_id")} />
          <label className="accountLabel">이름</label>
          <input
            className="user_name"
            placeholder="이름 입력"
            {...register("user_name", {
              required: "이름을 입력해주세요",
              minLength: {
                value: 2,
                message: "2자 이상의 이름만 사용 가능합니다.",
              },
              maxLength: {
                value: 12,
                message: "12자 이하의 이름만 사용 가능합니다.",
              },
              pattern: {
                value: /^([가-힣])|([a-zA-Z])$/,
                message: "이름은 한글 또는 영문으로만 입력해주세요",
              },
              onBlur: () => {
                trigger("user_name");
              },
            })}
          />
          {errors.user_name && <p>{errors.user_name.message}</p>}
          <label className="accountLabel">Email</label>
          <div
            className="user_email_box"
            style={{ width: "98%", display: "flex" }}
          >
            <input
              id="user_email"
              className="user_email"
              disabled={disable}
              style={{ maxWidth: "75%" }}
              placeholder="이메일을 입력해주세요"
              required
              {...register("user_email", {
                required: <p>이메일을 입력해주세요</p>,
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                  message: <p>이메일 형식에 맞게 입력해주세요</p>,
                },
                validate: {
                  email_cheack: (value) =>
                    user_emailCheck === null ? (
                      <p> 중복확인을 해주세요</p>
                    ) : user_emailCheck === false ? (
                      <p>이미 가입 되어있는 이메일입니다</p>
                    ) : (
                      true
                    ),
                },
                onBlur: () => {
                  trigger("user_email");
                },
              })}
            />
            <button
              disabled={disable}
              type="button"
              style={{ display: "inline" }}
              onClick={() => {
                email_check_button();
              }}
              onBlur={() => {
                trigger("user_email");
              }}
            >
              <b>인증하기</b>
            </button>
          </div>
          {(errors.user_email && errors.user_email.message) ||
            (user_emailCheck && (
              <p style={{ color: "green" }}>
                사용 가능한 이메일입니다. 인증번호를 입력해주세요
              </p>
            ))}
          {user_emailCheck && (
            <div style={{ display: { emailAuth } }}>
              <label
                className="accountLabel"
                style={{ display: "flex", marginTop: "15px" }}
              >
                이메일 인증번호 입력
              </label>
              <div
                className="user_email_box"
                style={{ width: "98%", display: "flex" }}
                disabled={disable}
              >
                <input
                  disabled={disable}
                  id="email_confirm"
                  className="email_confirm"
                  style={{ maxWidth: "75%" }}
                  placeholder="인증번호를 입력해주세요"
                  required
                  {...register("email_confirm", {
                    required: <p>이메일 인증번호를 입력해주세요.</p>,
                  })}
                />
                <button
                  disabled={disable}
                  type="button"
                  onClick={() => {
                    trigger("email_confirm");
                    authCofirm();
                  }}
                  onBlur={() => {
                    trigger("email_confirm");
                  }}
                >
                  <b>인증확인</b>
                </button>
              </div>
              {errors.email_confirm && errors.email_confirm.message}
            </div>
          )}
          <label className="accountLabel">비밀번호</label>
          <input
            id="user_password"
            className="user_password"
            type="password"
            required
            {...register("user_password", {
              required: "비밀번호를 입력해주세요",
              minLength: {
                value: 6,
                message: "6자 이상의 비밀번호만 사용 가능합니다.",
              },
              maxLength: {
                value: 16,
                message: "16자 이하의 비밀번호만 사용 가능합니다.",
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-zA-ZS]).{6,}/,
                message: "영문, 숫자를 혼용하여 입력해주세요..",
              },
              onChange: () => {
                trigger("user_password");
              },
              onBlur: () => {
                trigger("user_password");
              },
            })}
          />
          {errors.user_password && <p>{errors.user_password.message}</p>}
          <label className="accountLabel">비밀번호 확인</label>
          <input
            className="password_confirm"
            type="password"
            required
            {...register("password_confirm", {
              required: "비밀번호를 한번 더해주세요",
              validate: (value) => value === user_password.current,
              onChange: () => {
                trigger("password_confirm");
              },
              onBlur: () => {
                trigger("password_confirm");
              },
            })}
          />
          {errors.password_confirm && <p>{errors.password_confirm.message}</p>}
          {errors.password_confirm &&
            errors.password_confirm.type === "validate" && (
              <p>비밀번호가 일치하지 않습니다.</p>
            )}
          <label className="accountLabel">닉네임</label>
          <div
            className="user_email_box"
            style={{ width: "98%", display: "flex" }}
          >
            <input
              className="user_nickname"
              style={{ maxWidth: "75%" }}
              placeholder="닉네임을 입력해주세요"
              required
              {...register("user_nickname", {
                required: <p>닉네임을입력해주세요</p>,
                validate: {
                  email_cheack: (value) =>
                    user_nicknameCheck === null ? (
                      <p> 중복확인을 해주세요</p>
                    ) : user_nicknameCheck === false ? (
                      <p>이미 가입 되어있는 닉네임입니다</p>
                    ) : (
                      true
                    ),
                },
                onBlur: () => {
                  trigger("user_nickname");
                },
              })}
            />
            <button
              type="button"
              style={{ display: "inline" }}
              onClick={() => {
                nicknameCheck();
              }}
              onBlur={() => {
                trigger("user_nickname");
              }}
            >
              <b>중복확인</b>
            </button>
          </div>
          {errors.user_nickname && <p>{errors.user_nickname.message}</p>}
          <label className="accountLabel">휴대폰 번호</label>
          <input
            style={{ display: "block" }}
            className="user_phone"
            required
            maxLength="13"
            placeholder="휴대폰번호를 입력해주세요  ex)010-0000-0000"
            {...register("user_phone", {
              required: "휴대폰번호를 입력해주세요",
              pattern: {
                value:
                  /^01([0|1|6|7|8|9]{0}).([-])([0-9]{2,3}).([-])([0-9]{4})$/,
                message: "휴대폰번호를 제대로 입력해주세요",
              },
              onBlur: () => {
                trigger("user_phone");
              },
            })}
          />
          {errors.user_phone && <p>{errors.user_phone.message}</p>}
          <label className="accountLabel">생년월일</label>
          <input
            type="date"
            className="user_birthday"
            required
            {...register("user_birthday", {
              required: "생년월일을 입력해주세요 ",
              onBlur: () => {
                trigger("user_birthday");
              },
            })}
          />
          {errors.user_birthday && <p>{errors.user_birthday.message}</p>}
          <label className="accountLabel">성별</label>
          <Select
            className="user_gender"
            required
            defaultValue=""
            {...register("user_gender", {
              required: "성별을 입력해주세요",
              onBlur: () => {
                trigger("user_gender");
              },
              onChange: () => {
                trigger("user_gender");
              },
            })}
          >
            <MenuItem className="men" value="M">
              남자
            </MenuItem>
            <MenuItem className="girl" value="F">
              여자
            </MenuItem>
          </Select>
          {errors.user_gender && <p>{errors.user_gender.message}</p>}
          <label className="accountLabel">추천인 입력</label>
          <div
            className="user_email_box"
            style={{ width: "98%", display: "flex", marginBottom: "15px" }}
          >
            <input
              className="user_recommend"
              style={{ width: "98%" }}
              placeholder="추천인 이메일을 입력해주세요"
              {...register("user_recommend")}
            />
          </div>
          {errors.user_recommend && <p>{errors.user_recommend.message}</p>}
          <JoinPresenter
            allCheck={allCheck}
            allBtnEvent={allBtnEvent}
            regCheck={regCheck}
            regBtnEvent={regBtnEvent}
            fundingCheck={fundingCheck}
            fundingBtnEvent={fundingBtnEvent}
            userCheck={userCheck}
            userBtnEvent={userBtnEvent}
            setAllCheck={setAllCheck}
            setRegCheck={setRegCheck}
            setFundingCheck={setFundingCheck}
            setUserCheck={setUserCheck}
          />

          <button type="submit" style={{ margin: "0 auto" }}>
            <b>회원가입</b>
          </button>
        </form>
        {/* 오류 및 확인메세지 */}
        <CustomModal
          handleOpen={handleOpen}
          handleClose={handleClose}
          open={open}
          modalTitle={modalTitle}
          modalContent={modalContent}
        />
      </div>
    </div>
  );
};

export default RegisterTest;