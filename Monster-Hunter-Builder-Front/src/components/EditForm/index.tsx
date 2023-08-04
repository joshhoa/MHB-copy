import { FormEvent } from 'react';
import Field from '../LoginForm/Field';
import { useAppSelector } from '../../hooks/redux';
import './styles.scss';

interface EditFormProps {

  username: string
  changeField: (value: string) => void
  handleEdit: () => void
}

function EditForm({

  username,
  changeField,
  handleEdit,
}: EditFormProps) {
  const isLoading = useAppSelector((state) => state.user.isLoading);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleEdit();
  };

  const handleChangeField = (value: string) => {
    changeField(value);
  };

  return (
    <form autoComplete="off" className="edit-profile__form" onSubmit={handleSubmit}>
      <h3 className="edit-profile__title">Edit</h3>
      <Field
        disabled={isLoading}
        type="text"
        placeholder="Username"
        onChange={handleChangeField}
        value={username}
      />
      <button
        type="submit"
        className="edit-profile__button"
      >
        Confirm
      </button>
    </form>
  );
}

export default EditForm;
