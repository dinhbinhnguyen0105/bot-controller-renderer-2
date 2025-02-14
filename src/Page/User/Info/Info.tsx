import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./Info.module.css";


const Info: React.FC = () => {
    const uid = useParams();
    useEffect(() => {
        console.log(uid);
    }, [uid]);
    return (
        <div className={styles.info}>
            <h3>Info</h3>
        </div>
    )
}

export default Info;