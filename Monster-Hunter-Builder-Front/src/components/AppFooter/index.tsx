import { Link } from 'react-router-dom';
import './styles.scss';

function AppFooter() {
  return (
    <footer className="footer">
      <Link to="/copyrights" className="footer-copyright">Copyrights</Link>
    </footer>
  );
}

export default AppFooter;
