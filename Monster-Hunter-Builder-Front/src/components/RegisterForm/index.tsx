import { FormEvent } from 'react';
import Field from '../LoginForm/Field';
import { useAppSelector } from '../../hooks/redux';

interface SignInFormProps {
  email: string
  password: string
  passwordConfirm: string
  username: string
  changeField: (value: string, name: 'email' | 'password' | 'username' | 'passwordConfirm') => void
  handleSignIn: () => void
  isLogged: boolean
}

function RegisterForm({
  email,
  password,
  passwordConfirm,
  username,
  changeField,
  handleSignIn,
  isLogged,
}: SignInFormProps) {
  const isLoading = useAppSelector((state) => state.user.isLoading);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSignIn();
  };

  const handleChangeField = (name: 'email' | 'password' | 'username' | 'passwordConfirm') => (value: string) => {
    changeField(value, name);
  };

  return (

    <div className="login-form">

      {!isLogged && (

        <form autoComplete="off" className="login-form-element" onSubmit={handleSubmit}>
          <h3 className="login-form-title">REGISTER</h3>
          <Field
            disabled={isLoading}
            placeholder="Email"
            onChange={handleChangeField('email')}
            value={email}
          />
          <Field
            disabled={isLoading}
            type="password"
            placeholder="Password"
            onChange={handleChangeField('password')}
            value={password}
          />
          <Field
            disabled={isLoading}
            type="password"
            placeholder="Confirm password"
            onChange={handleChangeField('passwordConfirm')}
            value={passwordConfirm}
          />
          <Field
            disabled={isLoading}
            type="text"
            placeholder="Username"
            onChange={handleChangeField('username')}
            value={username}
          />
          <button
            type="submit"
            className="login-form-button"
          >
            Register
          </button>
        </form>
      )}
    </div>
  );
}

export default RegisterForm;
