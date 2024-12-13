import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => {
  return (
    <header className="header">
      <h1>
        <Link to="/">smiley</Link>
      </h1>
    </header>
  );
};

export default Header;
