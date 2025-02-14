import React, { useCallback, useEffect, useRef, useState } from "react";

import styles from "./List.module.css";
import Row from "./Row";
import ConfigModal from "../../../modals/robot/Config/Config";

interface User {
    actions: any;
    info: any;
    [key: string]: any;
};

const List: React.FC = () => {
    const [listUser, setListUser] = useState<User[]>([]);
    const tableRef = useRef<HTMLTableElement>(null);
    const [displayConfig, setDisplayConfig] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User[]>([]);
    useEffect(() => {
        fetch("http://localhost:3000/user/list")
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
    const handleCallActionRestAPIs = useCallback(async (uid: string, action: string) => {
        if (!listUser.length) { return; };
        return new Promise<any>((resolve, reject) => {
            fetch(`http://localhost:3000/user/list?uid=${uid}&action=${action}`)
                .then(res => res.json())
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }, [listUser]);

    const handleCallInputRestAPIs = useCallback((uid: string, payload: { info?: any; actions?: any }) => {
        if (!listUser.length) { return; };
        fetch(`http://localhost:3000/user/list/${uid}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ payload: payload })
        })
            .then(res => res.json())
            .then(res => console.log(res));
    }, [listUser]);

    const handleInputChange = useCallback((uid: string, payload: { info?: any; actions?: any }) => {
        if (window?.electronAPIs) {

        } else {
            handleCallInputRestAPIs(uid, payload);
        };
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
    }, [handleCallInputRestAPIs]);

    const handleButtonClick = useCallback((e: React.MouseEvent<HTMLButtonElement>, uid: string, action: string) => {
        const defaultText = (e.target as HTMLButtonElement).innerHTML;
        if (window?.electronAPIs) {
            // window.electronAPIs.send("user:");
            // window.electronAPIs.on("user", res => {});
        } else {
            const target = e.target as HTMLButtonElement;
            target.innerHTML = "...";
            target.disabled = true;
            handleCallActionRestAPIs(uid, action)
                .then(res => {
                    console.log(res);
                    (e.target as HTMLButtonElement).innerHTML = defaultText;
                    (e.target as HTMLButtonElement).disabled = false;
                })
                .catch(err => console.error(err));
        }
    }, [handleCallActionRestAPIs]);

    const handleEditClicked = useCallback(() => {
        // const selected = listUser.filter(item => item?.info?.selected);
        setSelectedUser(listUser.filter(item => item?.info?.selected))
        setDisplayConfig(true);
    }, [listUser]);

    return (
        <div className={styles.list}>
            {listUser.length ? (
                <table className={styles.table} ref={tableRef}>
                    <thead className={styles.tableHeader}>
                        <tr className={styles.headerrow}>
                            <th className={styles.headerrowNO}>No</th>
                            <th className={styles.headerrowDate} onClick={() => handleSort("date")}>date</th>
                            <th className={styles.headerrowUID} onClick={() => handleSort("uid")}>UID</th>
                            <th className={styles.headerrowUsername} onClick={() => handleSort("username")}>username</th>
                            <th className={styles.headerrowType} onClick={() => handleSort("type")}>type</th>
                            <th className={styles.headerrowGroup} onClick={() => handleSort("group")}>Group</th>
                            <th className={styles.headerrowProxy} onClick={() => handleSort("proxy")}>proxy</th>
                            <th className={styles.headerrowPassword} onClick={() => handleSort("password")}>Password</th>
                            <th className={styles.headerrow2Fa} onClick={() => handleSort("2fa")}>2Fa</th>
                            <th className={styles.headerrowEmail} onClick={() => handleSort("email")}>Email</th>
                            <th className={styles.headerrowEmailpassword} onClick={() => handleSort("emailpassword")}>Email Password</th>
                            <th className={styles.headerrowPhonenumber} onClick={() => handleSort("phonenumber")}>Phone Number</th>
                            <th className={styles.headerrowNote} onClick={() => handleSort("note")}>Note</th>
                            <th className={styles.headerrowSelected}>Select</th>
                            <th className={styles.headerrowActions} >Actions</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {listUser.map((userInfo, index) => (
                            <Row key={index} index={index} userInfo={userInfo} handleInputChange={handleInputChange} handleButtonClick={handleButtonClick} tableRef={tableRef} />
                        ))}
                    </tbody>
                </table>
            ) : <h2>No user data available.</h2>}
            <ConfigModal isOpen={displayConfig} onClose={() => setDisplayConfig(false)} selectedUser={selectedUser} />
            <div className={styles.footer}>
                <button onClick={handleEditClicked}>Config</button>
                <button onClick={() => { }}>Run bot</button>
            </div>
        </div>
    )
}

export default List;