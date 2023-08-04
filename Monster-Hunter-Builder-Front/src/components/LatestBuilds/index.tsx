import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchLatestLoadouts } from '../../store/reducers/loadout';
import Loadout from '../Loadout';

function LatestBuild() {
  const dispatch = useAppDispatch();
  const loadouts = useAppSelector((state) => state.loadout.loadouts);
  const errorMessage = useAppSelector((state) => state.loadout.errorMessage);
  useEffect(() => {
    dispatch(fetchLatestLoadouts());
  }, [dispatch]);

  return (
    <ul className="community-container-right-content-list">
      {errorMessage && <div className="community-container-right-content-list-error">{errorMessage}</div>}
      {/* eslint-disable-next-line max-len */}

      {loadouts?.map((loadout) => <Loadout key={loadout.id} isOnProfilePage={false} loadout={loadout} />)}
      {!errorMessage
      && <Link to="/loadouts" className="community-container-right-content-list-button">See more...</Link>}

    </ul>
  );
}

export default LatestBuild;
