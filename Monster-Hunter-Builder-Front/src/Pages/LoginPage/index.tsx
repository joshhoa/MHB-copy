import { Navigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';
import './styles.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  changeLoginCredentialsField, changeRegisterCredentialsField, login, logout, register,
} from '../../store/reducers/user';

function LoginPage() {
  const dispatch = useAppDispatch();
  const loginEmail = useAppSelector((state) => state.user.loginCredentials.email);
  const loginPassword = useAppSelector((state) => state.user.loginCredentials.password);
  const registerEmail = useAppSelector((state) => state.user.registerCredentials.email);
  const registerPassword = useAppSelector((state) => state.user.registerCredentials.password);
  // eslint-disable-next-line max-len
  const registerPasswordConfirm = useAppSelector((state) => state.user.registerCredentials.passwordConfirm);
  const registerUsername = useAppSelector((state) => state.user.registerCredentials.username);
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const handleChangeLoginField = (value: string, name: 'email' | 'password') => {
    dispatch(changeLoginCredentialsField({
      value,
      field: name,
    }));
  };
  const handleChangeRegisterField = (value: string, name: 'email' | 'password' | 'username' | 'passwordConfirm') => {
    dispatch(changeRegisterCredentialsField({
      value,
      field: name,
    }));
  };

  const handleSubmitLogin = () => {
    dispatch(login());
  };
  const handleSubmitRegister = () => {
    if (registerPassword === registerPasswordConfirm) {
      dispatch(register());
    } else {
      throw new Error('Mdp non compatibles');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <main className="main-login">
      <div className="loginForm-container">
        {isLogged && <Navigate to="/profile" />}
        <LoginForm
          email={loginEmail}
          password={loginPassword}
          changeField={handleChangeLoginField}
          handleLogin={handleSubmitLogin}
          handleLogout={handleLogout}
          isLogged={isLogged}
        />
        <div className="signInForm-container">
          <RegisterForm
            email={registerEmail}
            password={registerPassword}
            username={registerUsername}
            passwordConfirm={registerPasswordConfirm}
            changeField={handleChangeRegisterField}
            handleSignIn={handleSubmitRegister}
            isLogged={isLogged}
          />
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
