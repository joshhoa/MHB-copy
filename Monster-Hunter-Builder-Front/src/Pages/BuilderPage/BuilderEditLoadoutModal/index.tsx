import { ChangeEvent, FormEvent } from 'react';
import Modal from '../../../components/Modal';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { changeLoadoutCredentialsField, editLoadout, setEditMode } from '../../../store/reducers/loadout';
import { resetBuilder } from '../../../store/reducers/builder';
import './styles.scss';

interface BuilderEditLoadoutModalProps {
  shown: boolean
  setEditLoadoutModalShown: (shown: boolean) => void
  errorLoadout: string
  setErrorLoadout: (str: string) => void
}

function BuilderEditLoadoutModal({
  shown, setEditLoadoutModalShown, errorLoadout, setErrorLoadout,
}: BuilderEditLoadoutModalProps) {
  const dispatch = useAppDispatch();

  const weapon = useAppSelector((state) => state.builder.weapon);
  const userIsLogged = useAppSelector((state) => state.user.isLogged);
  const loadoutEdit = useAppSelector((state) => state.loadout.edit);
  const loadoutTitle = useAppSelector((state) => state.loadout.loadoutCredentials.title);
  // eslint-disable-next-line max-len
  const loadoutDescription = useAppSelector((state) => state.loadout.loadoutCredentials.description);

  const handleChangeField = (name: 'title' | 'description') => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(changeLoadoutCredentialsField({
      value: event.target.value,
      field: name,
    }));
  };

  const handleEditLoadout = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      weapon
      && loadoutTitle
      && userIsLogged
    ) {
      dispatch(editLoadout(loadoutEdit.editLoadoutId));
      setEditLoadoutModalShown(false);
      dispatch(setEditMode({
        isEditMode: false,
        editLoadoutId: '',
        title: '',
        description: '',
      }));
      dispatch(resetBuilder());
    } else {
      setErrorLoadout('Please, make sure to set at least a weapon, a title and be authentified to save a loadout.');
    }
  };

  return (
    <Modal
      modalXl={false}
      shown={shown}
      close={() => setEditLoadoutModalShown(false)}
    >
      {Boolean(errorLoadout)
          && (
          <div className="edit-loadout__error">
            <p className="edit-loadout__error-text">{errorLoadout}</p>
            <button type="button" onClick={() => setErrorLoadout('')} className="edit-loadout__error-ok">Ok</button>
          </div>
          )}

      <form onSubmit={handleEditLoadout} className="edit-loadout__form">
        <h3 className="edit-loadout__title">Edit Loadout</h3>
        <input
          type="text"
          placeholder="Loadout title"
          required
          value={loadoutTitle}
          onChange={handleChangeField('title')}
          className="edit-loadout__input"
        />
        <textarea
          placeholder="Description (optional)"
          value={loadoutDescription}
          onChange={handleChangeField('description')}
          className="edit-loadout__input-description"
        />
        <div className="edit-loadout__button">
          <button type="submit" className="edit-loadout__button-save">Save edit</button>
          <button type="button" onClick={() => setEditLoadoutModalShown(false)} className="edit-loadout__button-cancel">Cancel</button>
        </div>
      </form>
    </Modal>
  );
}

export default BuilderEditLoadoutModal;
