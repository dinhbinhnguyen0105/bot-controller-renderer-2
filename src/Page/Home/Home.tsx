import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header";

const Home: React.FC = () => {

    return (
        <div className={styles.home}>
            <Header />
            <h3>Home</h3>
        </div>
    )
}

export default Home;