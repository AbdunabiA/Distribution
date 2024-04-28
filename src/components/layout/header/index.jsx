import { GiHamburgerMenu } from "react-icons/gi";
import styles from "./header.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileImage from "components/profileImage";
import { pages } from "routes/routes";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "store/auth";

const Header = ({ onTouch }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth.data);

  return (
    <header className="container">
      <div>
        <div className={styles.pageNameWrapper}>
          <Button
            type="primary"
            onClick={onTouch}
            className={styles.hamburgerMenu}
          >
            <GiHamburgerMenu />
          </Button>

          <p className={styles.pageName}>
            {pages[role]?.map((page) => {
              if (location.pathname.toLowerCase() == page.path.toLowerCase()) {
                return page.name;
              }
            })}
          </p>
        </div>
        <Button type="primary" onClick={() => {
          navigate('/login')
          dispatch(signOut());
        }}>
          Log out
        </Button>
        <div className={styles.profileImage}>
          <Link to={"/profile"}>
            <ProfileImage />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
