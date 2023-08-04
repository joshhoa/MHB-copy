import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { TiThMenu, TiTimes } from 'react-icons/ti';
import './styles.scss';
import { useAppSelector } from '../../hooks/redux';
import getIconByKey from '../../utils/icons';

function AppHeader() {
  const [menuShown, setMenuShown] = useState(false);
  const isLogged = useAppSelector((state) => state.user.isLogged);

  const menuClassNames = cn('menu', {
    'is-active': menuShown,
  });

  useEffect(() => {
    setMenuShown(false);
  }, []);
  return (
    <header className="header">
      <div className="header__main">
        <div className="header__title-container">
          <img src={getIconByKey('bones')} alt="logo" className="header__logo" />
          <h1 className="header__title">Monster Hunter Builder</h1>
        </div>
        <button type="button" className="header__button-menu" onClick={() => setMenuShown(!menuShown)}>
          {!menuShown && <TiThMenu className="icon" />}
          {menuShown && <TiTimes className="icon" />}
        </button>
        <nav className={menuClassNames}>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'menu__link menu-active' : 'menu__link')}
                onClick={() => setMenuShown(false)}
              >
                Home

              </NavLink>
            </li>
            <li>
              <NavLink
                to="/builder"
                className={({ isActive }) => (isActive ? 'menu__link menu-active' : 'menu__link')}
                onClick={() => setMenuShown(false)}
              >
                Builder
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/loadouts"
                className={({ isActive }) => (isActive ? 'menu__link menu-active' : 'menu__link')}
                onClick={() => setMenuShown(false)}
              >
                Loadouts
              </NavLink>
            </li>
            {isLogged
            && (
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? 'menu__link menu-active' : 'menu__link')}
                onClick={() => setMenuShown(false)}
              >
                <div className="menu__link-profile">
                  <img src={getIconByKey('villager')} alt="villager icon" className="menu__link-profile__icon" />
                  <span>Profile</span>
                </div>
              </NavLink>
            </li>
            )}
            {!isLogged
            && (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? 'menu__link menu-active' : 'menu__link')}
                onClick={() => setMenuShown(false)}
              >
                <span>Login</span>
              </NavLink>
            </li>
            )}

          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
