import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header: React.FC = () => {
    return (
        <div className={styles.header}>
            <nav className={styles.headerNav}>
                <ul>
                    <li className={styles.headerNavItem}><Link to={"/home"}>home</Link></li>
                    <li className={styles.headerNavItem}><Link to={"/marketplace"}>marketplace</Link></li>
                    <li className={`${styles.headerNavItem} ${styles.headerItemUser}`}>
                        <Link to={"/user"}>user</Link>
                        <ul className={styles.userNav}>
                            <li className={styles.userNavItem}><Link to={"/user/list"}>list</Link></li>
                            <li className={styles.userNavItem}><Link to={"/user/detail"}>detail</Link></li>
                            <li className={styles.userNavItem}><Link to={"/user/setting"}>setting</Link></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;