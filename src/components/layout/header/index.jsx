import { GiHamburgerMenu } from "react-icons/gi";
import styles from "./header.module.scss";

const Header = ({ onTouch }) => {
  

  return (
    <header className="container">
      <div>
        <button onClick={onTouch} className={styles.hamburgerMenu}>
          <GiHamburgerMenu />
        </button>
        header
      </div>
    </header>
  );
};

export default Header;
