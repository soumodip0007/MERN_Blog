import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div className="navbar-brand">
        <img src="../src/assets/blog.png" alt="Blog-Logo" className="navbar-icon" title='Blog-icon'/>
        <span className="navbar-text" title='Blog-text'>Blog Website</span>
      </div>
      <ul>
        <li>
          <Link to="/">All Blogs</Link>
        </li>
        <li>
          <Link to="/create">Create Blog</Link>
        </li>
      </ul>
      <span className="animation"></span>
    </nav>
  );
};

export default Navbar;
