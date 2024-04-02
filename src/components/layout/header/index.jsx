import { GiHamburgerMenu } from "react-icons/gi";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
const Header = ({ onTouch }) => {
  return (
    <header className="container">
      <div>
        <button onClick={onTouch} className={styles.hamburgerMenu}>
          <GiHamburgerMenu />
        </button>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <div>header</div>
          <div>
            <Link to={'/profile'}>
              <img
                style={{ width: "50px", height: "50px", borderRadius: "100%" }}
                src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                alt="ProfileImage"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
