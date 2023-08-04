import {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import { BiLoaderCircle } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchAllLoadouts, fetchOneLoadoutById, setLoadoutCodeField } from '../../store/reducers/loadout';
import Loadout from '../../components/Loadout';
import './styles.scss';

function Loadouts() {
  const dispatch = useAppDispatch();

  const [backButtonShown, setBackButtonShown] = useState(false);
  const loadouts = useAppSelector((state) => state.loadout.loadouts);
  const errorMessage = useAppSelector((state) => state.loadout.errorMessage);
  const isLoading = useAppSelector((state) => state.loadout.isLoading);
  const loadoutCode = useAppSelector((state) => state.loadout.loadoutCode);
  // const loadoutItemsids = useAppSelector((state) => state.builder.editLoadoutIds);

  // filter loadout with a code
  function handleGetOneLoadout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loadoutCode) {
      dispatch(fetchOneLoadoutById());
      dispatch(setLoadoutCodeField(''));
      setBackButtonShown(true);
    }
  }

  function handleBackToAllLoadouts() {
    setBackButtonShown(false);
    dispatch(fetchAllLoadouts());
  }

  useEffect(() => {
    dispatch(fetchAllLoadouts());
  }, [dispatch]);

  return (
    <main className="main-loadout">
      {/* //? SECTION Search by code */}

      <div className="loadouts-search">
        <div className="loadouts-search-container">
          <h2 className="loadouts-search__title">FIND BY CODE</h2>
          <p className="loadouts-search__description">Enter your friend&apos;s Loadout code in the search bar below to access their Loadout. Discover their customized setup, including armor, weapons, and skills. Explore new strategies and gear combinations from your friends in the game.</p>

          <form
            className="loadouts-search__form"
            onSubmit={handleGetOneLoadout}
          >
            <input
              type="text"
              placeholder="e.g. : AB1X9Z2"
              value={loadoutCode}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                dispatch(setLoadoutCodeField(event.target.value));
              }}
              className="loadouts-search__form__input"
            />
            <button type="submit" className="loadouts-search__form__submit-button">GO</button>
          </form>
        </div>
      </div>
      {/* //? SECTION all loadouts and filter */}
      <div className="loadouts-list__container">

        {/* <div className="loadouts-list__filters">
          <button type="button" className="loadouts-list__name">Name</button>
          <button type="button" className="loadouts-list__latest">Latest</button>
          <div className="loadouts-searchbar">
            <input
              type="text"
              placeholder="Loadout name"
            />
            <button type="submit">Ok</button>
          </div>
        </div> */}

        <ul className="loadouts-list">
          {isLoading && <BiLoaderCircle className="loadouts-list__loader" />}
          {errorMessage && <span className="loadouts-list__error">{errorMessage}</span>}
          {backButtonShown && <button type="button" onClick={handleBackToAllLoadouts} className="loadouts-list__button-back">Back</button>}
          {loadouts?.map((loadout) => (
            <Loadout key={loadout.id} loadout={loadout} isOnProfilePage={false} />
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Loadouts;
