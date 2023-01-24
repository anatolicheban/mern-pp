import React, { useState, useEffect, useRef } from "react";
import { Container } from "../components";
import { Alert, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../features/auth/authApiSlice";
import { isPwdCorrect } from "../utilities/isPwdCorrect";
import { isUsernameCorrect } from "../utilities/isUsernameCorrect";
import { isEmailCorrect } from "../utilities/isEmailCorrect";

const Register = () => {
  const errRef = useRef<HTMLParagraphElement>(null);
  const [errMsg, setErrMsg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [duplPassword, setDuplPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
  }, [username, password, duplPassword, email]);

  const [register, { isLoading, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isSuccess, navigate]);

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isValidUsername = isUsernameCorrect(username);
    if (!isValidUsername.isValid) return setErrMsg(isValidUsername.message);

    if (!isEmailCorrect(email)) return setErrMsg("Неправильний емейл");

    const isValidPwd = isPwdCorrect(password);
    if (!isValidPwd.isValid) return setErrMsg(isValidPwd.message);
    if (password !== duplPassword) return setErrMsg("Паролі не співпадають");
    try {
      await register({
        username,
        password,
        duplPassword,
        email,
      }).unwrap();
    } catch (err: any) {
      console.log(err);
      errRef.current?.focus();
      if (err?.data?.status === 529) return setErrMsg("Забагато запитів, спробуйте пізніше");
      if (err?.data?.status === 500) return setErrMsg("Сталася помилка серверу!");
      if (err?.data?.message) return setErrMsg(err.data.message);
      setErrMsg("Помилка серверу, спробуйте пізніше");
    }
  };

  return (
    <Container className="flex justify-center flex-col gap-4 items-center">
      <div className="max-w-md w-full mt-12">
        {errMsg && (
          <Alert aria-live="assertive" ref={errRef} severity="error">
            {errMsg}
          </Alert>
        )}
        {isSuccess && (
          <Alert severity="success">
            Ви успішно зареєструвались! Скоро відбудется перехід на сторінку входу...
          </Alert>
        )}
      </div>
      <form className="bg-light flex p-4 flex-col items-center gap-8 mb-8 max-w-md w-full">
        <h3 className="text-2xl font-bold text-blue">Реєстрація</h3>
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="filled"
          label="Ім'я користувача"
          fullWidth
        />
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="filled"
          label="Емейл"
          type={"email"}
          fullWidth
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="filled"
          label="Пароль"
          type={"password"}
          fullWidth
        />
        <TextField
          value={duplPassword}
          onChange={(e) => setDuplPassword(e.target.value)}
          variant="filled"
          label="Підтвердження пароля"
          type={"password"}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          fullWidth
          onClick={handleRegister}
        >
          {isLoading ? "Завантаження..." : "Зареєструватися"}
        </Button>
        <p className="text-blue">
          Маєте аккаунт?{" "}
          <Link className="underline hover:text-cyan" to={"../login"}>
            Увійдіть в систему
          </Link>
        </p>
      </form>
    </Container>
  );
};

export default Register;
