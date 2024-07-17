import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className="link">All Blogs</Link>
        </li>
        <li>
          <Link to="/create" className="link">Create Blog</Link>
        </li>
      </ul>
      <div className="animation start-home"></div>
    </nav>
  );
};

export default Navbar;
