import React, { useState, useEffect, useRef } from "react";
import { Container } from "../components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { Alert, Button, TextField, Checkbox } from "@mui/material";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { isPwdCorrect } from "../utilities/isPwdCorrect";
import { isUsernameCorrect } from "../utilities/isUsernameCorrect";
import usePersist from "../hooks/usePersist";

const Login = () => {
  const errRef = useRef<HTMLParagraphElement>(null);
  const [errMsg, setErrMsg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [persist, setPersist] = usePersist();

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isValidPwd = isPwdCorrect(password);
    if (!isValidPwd.isValid) return setErrMsg(isValidPwd.message);

    const isValidUsername = isUsernameCorrect(username);
    if (!isValidUsername.isValid) return setErrMsg(isValidUsername.message);

    try {
      const { accessToken } = await login({ username, password }).unwrap();

      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate(location.state?.from || "/?page=1");
    } catch (err: any) {
      //Get err types from backend AND from RTK Query FetchBaseQueryError
      console.log(err);
      errRef.current?.focus();
      if (err?.data?.status === 529) return setErrMsg("Забагато запитів, спробуйте пізніше");
      if (err?.data?.status === 500) return setErrMsg("Сталася помилка серверу!");
      if (err?.data?.message) return setErrMsg(err.data.message);
      setErrMsg("Помилка серверу, спробуйте пізніше");
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  useEffect(() => {
    let errMsg = location.state?.errorMsg;
    if (errMsg) {
      setErrMsg(errMsg);
    }
  }, [location.state?.errorMsg, setErrMsg]);

  return (
    <Container className="flex justify-center flex-col gap-4 items-center">
      <div className="max-w-md w-full mt-12">
        {errMsg && (
          <Alert aria-live="assertive" ref={errRef} severity="error">
            {errMsg}
          </Alert>
        )}
      </div>
      <form className="bg-light flex p-4 flex-col items-center gap-4  mb-8 max-w-md w-full">
        <h3 className="text-2xl font-bold text-blue">Вхід</h3>
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="filled"
          label="Ім'я користувача"
          fullWidth
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="filled"
          label="Пароль"
          fullWidth
          type={"password"}
        />
        <div className="w-full flex items-center">
          <Checkbox
            checked={persist as boolean}
            onChange={(e, checked) => setPersist(checked)}
            color="primary"
          />
          <p className="ml-[-.25rem] text-blue">Запам'ятати мене</p>
        </div>
        <Button onClick={handleLogin} disabled={isLoading} variant="contained" fullWidth>
          {isLoading ? "Завантаження..." : "Увійти"}
        </Button>
        <p className="text-blue">
          Вперше тут?{" "}
          <Link className="underline hover:text-cyan" to={"../register"}>
            Зареєструйтесь
          </Link>
        </p>
      </form>
    </Container>
  );
};

export default Login;
