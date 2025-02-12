import React from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "./User.module.css";
import Header from "../../components/Header/Header";

const User: React.FC = () => {

    return (
        <div className={styles.user}>
            <Header />
            <Outlet />
        </div>
    );
}

export default User;