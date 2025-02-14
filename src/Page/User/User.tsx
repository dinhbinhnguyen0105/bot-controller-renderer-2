import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./User.module.css";
import Header from "../../components/Header/Header";

const User: React.FC = () => {

    return (
        <div className={styles.user}>
            <Header />
            <div className={styles.body}>
                <Outlet />
            </div>
        </div>
    );
}

export default User;