import { Link } from 'react-router-dom';
import { ChangeEvent, FormEvent } from 'react';
import Modal from '../../../components/Modal';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { changeLoadoutCredentialsField, saveLoadout, setEditMode } from '../../../store/reducers/loadout';
import './styles.scss';

interface BuilderSaveLoadoutModalProps {
  shown: boolean
  setShowSaveLoadoutModal: (shown: boolean) => void
  errorLoadout: string
  setErrorLoadout: (str: string) => void
}

function BuilderSaveLoadoutModal({
  shown, setShowSaveLoadoutModal, errorLoadout, setErrorLoadout,
}: BuilderSaveLoadoutModalProps) {
  const dispatch = useAppDispatch();

  const weapon = useAppSelector((state) => state.builder.weapon);
  const loadoutTitle = useAppSelector((state) => state.loadout.loadoutCredentials.title);
  // eslint-disable-next-line max-len
  const loadoutDescription = useAppSelector((state) => state.loadout.loadoutCredentials.description);
  const userIsLogged = useAppSelector((state) => state.user.isLogged);

  const handleChangeField = (name: 'title' | 'description') => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(changeLoadoutCredentialsField({
      value: event.target.value,
      field: name,
    }));
  };

  const handleSaveLoadout = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      weapon
      && loadoutTitle
      && userIsLogged
    ) {
      dispatch(saveLoadout());
      dispatch(setEditMode({
        isEditMode: false,
        editLoadoutId: '',
        title: '',
        description: '',
      }));
      setShowSaveLoadoutModal(false);
    } else {
      setErrorLoadout('Please, make sure to set at least a weapon, a title and be authentified to save a loadout.');
    }
  };

  return (
    <Modal
      modalXl={false}
      shown={shown}
      close={() => setShowSaveLoadoutModal(false)}
    >
      {Boolean(errorLoadout)
          && (
          <div className="save-loadout__error">
            <p className="save-loadout__error-text">{errorLoadout}</p>
            {!userIsLogged
              && (
              <Link
                to="/login"
                className="save-loadout__error-login"
              >
                Login
              </Link>
              )}
            <button type="button" onClick={() => setErrorLoadout('')} className="save-loadout__error-ok">OK</button>
          </div>
          )}
      {Boolean(!errorLoadout)
          && (
            <form onSubmit={handleSaveLoadout} className="save-loadout__form">
              <h3 className="save-loadout__title">Save Loadout</h3>
              <input
                type="text"
                placeholder="Loadout title"
                required
                value={loadoutTitle}
                onChange={handleChangeField('title')}
                className="save-loadout__input"
              />
              <textarea
                placeholder="Description (optional)"
                value={loadoutDescription}
                onChange={handleChangeField('description')}
                className="save-loadout__input-description"
              />
              <div className="save-loadout__button">
                <button type="submit" className="save-loadout__button-save">Save</button>
                <button type="button" onClick={() => setShowSaveLoadoutModal(false)} className="save-loadout__button-cancel">Cancel</button>
              </div>
            </form>

          )}
    </Modal>
  );
}

export default BuilderSaveLoadoutModal;
