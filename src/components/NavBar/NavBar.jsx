import styles from "./NavBar.module.css";
import avatar from "../../assets/avatar.png";
import { useState } from "react";

const tabs = ["Lessons", "Teachers", "Leaves"];

const NavBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <nav className={styles.navContainer}>
      <ul className={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`${styles.tab} ${activeTab === index ? styles.active : ""}`}
            onClick={() => {
              setActiveTab(index);
            }}
          >
            {tab}
          </li>
        ))}
      </ul>
      <div className={styles.avatarContainer}>
        <img className={styles.avatar} src={avatar} alt="avatar" />
      </div>
    </nav>
  );
};
export default NavBar;
