import React, { useCallback, useEffect, useState } from "react";
import styles from "./List.module.css";
import Row from "./Row";

interface User {
    actions: any;
    info: any;
    [key: string]: any;
};

const List: React.FC = () => {
    const [listUser, setListUser] = useState<User[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/robot")
            .then(res => res.json())
            .then(res => setListUser(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleSort = useCallback((field: string) => {
        const sorted = [...listUser].sort((a: User, b: User) => {
            if (field in a.info) {
                if (a.info[field] < b.info[field]) return -1;
                if (a.info[field] > b.info[field]) return 1;

            } else if (field in a.actions) {
                if (a.actions[field] < b.actions[field]) return -1;
                if (a.actions[field] > b.actions[field]) return 1;
            }
            return 0;
        });
        setListUser(sorted);
    }, [listUser]);
    const handleInputChange = useCallback((uid: string, payload: { info?: any; actions?: any }) => {
        setListUser(prev => prev.map(item => {
            if (item.info.uid === uid) {
                return {
                    ...item,
                    info: { ...item.info, ...(payload.info || {}) },
                    actions: { ...item.actions, ...(payload.actions || {}) },
                }
            } else {
                return item;
            };
        }));
    }, []);

    return (
        <div className={styles.list}>
            {listUser.length ? (
                <table className={styles.table}>
                    <thead className={styles.tableHeader}>
                        <tr className={styles.headerrow}>
                            <th className={styles.headerrowNO}>No</th>
                            <th className={styles.headerrowDate} onClick={() => handleSort("date")}>date</th>
                            <th className={styles.headerrowUID} onClick={() => handleSort("uid")}>UID</th>
                            <th className={styles.headerrowUsername} onClick={() => handleSort("username")}>username</th>
                            <th className={styles.headerrowType} onClick={() => handleSort("type")}>type</th>
                            <th className={styles.headerrowProxy} onClick={() => handleSort("proxy")}>proxy</th>
                            <th className={styles.headerrowGetname}>get name</th>
                            <th className={styles.headerrowReelAndLike}>reel</th>
                            <th className={styles.headerrowJoinGroups}>join group</th>
                            <th className={styles.headerrowaddFriends}>add friend</th>
                            <th className={styles.headerrowPostNewFeed}>post new feed</th>
                            <th className={styles.headerrowSellGroup}>post groups</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {listUser.map((userInfo, index) => (
                            <Row key={index} index={index} userInfo={userInfo} handleInputChange={handleInputChange} />
                        ))}
                    </tbody>
                </table>
            ) : <h2>No user data available.</h2>}
        </div>
    )
}

export default List;