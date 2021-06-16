import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import CustomLink from 'components/common/CustomLink';
import { useAuth } from 'context/AuthContext';
import Search from 'components/forms/Search';
import styles from '../styles/Header.module.css';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <CustomLink href="/">
          DJ Events
        </CustomLink>
      </div>

      <Search />
      
      <nav>
        <ul>
          <li>
            <CustomLink href="/events">
              Events
            </CustomLink>
          </li>
          { user ? (
            <>
              <li>
                <CustomLink href="/events/add">
                  Add Event
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/account/dashboard">
                  Dashboard
                </CustomLink>
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
              <CustomLink
                href="/account/login"
                className='btn-secondary btn-icon'
              >
                <FaSignInAlt /> Sign In
              </CustomLink>
            </li>
          )
          } 
        </ul>
      </nav>
    </header>
  );
};

export default Header;