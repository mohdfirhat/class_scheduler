import styles from "./NavBar.module.css";
import avatar from "../../assets/avatar.png";
import { NavLink } from "react-router";

const tabs = ["Lessons", "Teachers", "Leaves"];

const NavBar = () => {
  return (
    <nav className={styles.navContainer}>
      <ul className={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <NavLink
            to={`/dashboard/${tab.toLowerCase()}`}
            className={({ isActive, isPending }) =>
              isPending ? `${styles.tab}` : isActive ? `${styles.tab} ${styles.active}` : `${styles.tab}`
            }
            key={index}
          >
            <li>{tab}</li>
          </NavLink>
        ))}
      </ul>
      <div className={styles.avatarContainer}>
        <img className={styles.avatar} src={avatar} alt="avatar" />
      </div>
    </nav>
  );
};
export default NavBar;
