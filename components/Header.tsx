import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useAuth } from 'context/AuthContext';
import Search from 'components/Search';
import styles from '../styles/Header.module.css';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>DJ Events</a>
        </Link>
      </div>

      <Search />
      
      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>
          { user ? (
            <>
              <li>
                <Link href="/events/add">
                  <a>Add Event</a>
                </Link>
              </li>
              <li>
                <Link href="/account/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className='btn-secondary btn-icon'
                  onClick={() => logout()}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
              </>
          ) : (
            <li>
              <Link href="/account/login">
                <a className='btn-secondary btn-icon'>
                  <FaSignInAlt /> Sign In
                </a>
              </Link>
            </li>
          )
          } 
        </ul>
      </nav>
    </header>
  );
};

export default Header;