import { CircularProgress } from "@material-ui/core";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../api/authApi";
import "./login.css";

export default function Login() {
  const userNameRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isLoading, isFirst } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!isFirst || !isLoading) return;
    toast.success(
      "Do lần đầu kết nối nên có thể server phản hồi chậm mong bạn kiên nhẫn chờ đợi trong giây lát",
      {
        autoClose: 5000,
      }
    );
  }, [isLoading]);
  const handleLogin = (e) => {
    e.preventDefault();
    if (isLoading) return;
    dispatch(
      login(
        {
          userName: userNameRef.current.value,
          password: passwordRef.current.value,
        },
        navigate
      )
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Coder Noob</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on CODE NOOB.
          </span>
        </div>
        <form className="loginRight" onSubmit={handleLogin}>
          <div className="loginBox">
            <input
              required
              placeholder="User name"
              ref={userNameRef}
              type="text"
              className="loginInput"
            />
            <input
              required
              placeholder="Password"
              ref={passwordRef}
              type="password"
              className="loginInput"
              minLength="6"
            />
            <button className="loginButton">
              {isLoading ? (
                <CircularProgress color={"primary"} size="30px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button
              className="loginRegisterButton"
              onClick={() => {
                if (isLoading) return;
                navigate("/register");
              }}
            >
              {isLoading ? (
                <CircularProgress color={"primary"} size="30px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
