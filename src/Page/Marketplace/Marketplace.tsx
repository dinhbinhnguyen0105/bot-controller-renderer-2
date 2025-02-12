import React from "react";
import { Outlet } from "react-router-dom";

import styles from "./Marketplace.module.css";
import Header from "../../components/Header/Header";

const Marketplace: React.FC = () => {

    return (
        <div className={styles.marketplace}>
            <Header />
            <h2>Marketplace</h2>
        </div>
    );
}

export default Marketplace;