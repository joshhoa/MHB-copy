import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSound } from '../../hooks/sound';
import felyne_cook from '../../assets/icons/felyne_cook.gif';
import catSound from '../../assets/sounds/felyne_sound.mp3';
import './styles.scss';

function Err404() {
  const playsound = useSound(catSound);
  // Plays the sound whenever reach 404 page
  useEffect(() => {
    playsound();
  }, [playsound]);

  return (
    <main className="main_404">
      <h2 className="err404__status">404</h2>
      <h3 className="err404__title">
        Wait... You&apos;ve reach the
        {' '}
        <span className="err404__title-campfire">campfire</span>
        !
      </h3>
      <div className="err404__gif">
        <p className="err404__gif-description">Well.. take a seat. This felyne cooked for us!</p>
        <img src={felyne_cook} alt="Felyne cooking a fish" />
      </div>

      <p>
        Eat this meal, but hurry up and
        {' '}
        <Link to="/" className="err404__back-homepage">GO BACK ON MISSION</Link>
      </p>
    </main>
  );
}

export default Err404;
