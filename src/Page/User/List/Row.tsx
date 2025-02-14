import React, { memo } from "react";
import { Link } from "react-router-dom";
import styles from "./Row.module.css";

interface RowProps {
    index: number;
    userInfo: {
        actions: any;
        info: any;
        [key: string]: any;
    };
    tableRef: React.RefObject<HTMLTableElement | null>;
    handleInputChange: (uid: string, payload: {}) => void;
    handleButtonClick: (e: React.MouseEvent<HTMLButtonElement>, uid: string, action: string) => void;
};

const Row: React.FC<RowProps> = memo(({ index, userInfo, tableRef, handleInputChange, handleButtonClick }) => {
    const handleOnHover = (e: React.MouseEvent) => {
        const actionsMenuElm = (e.target as HTMLElement).querySelector(`.${styles.actionsMenu}`);
        if (actionsMenuElm) {
            const actionsMenuRect = actionsMenuElm.getBoundingClientRect();
            if (tableRef.current) {
                const tableRect = tableRef.current.getBoundingClientRect();
                const offset = (e.target as HTMLElement).getBoundingClientRect().height;
                if (actionsMenuRect.bottom > tableRect.bottom) {
                    (actionsMenuElm as HTMLElement).style.top = `unset`;
                    (actionsMenuElm as HTMLElement).style.bottom = `${offset}px`;
                } else {
                    (actionsMenuElm as HTMLElement).style.top = `${offset}px`;
                    (actionsMenuElm as HTMLElement).style.bottom = `unset`;
                }
            }
        }
    }

    return (
        <tr className={styles.row} data-uid={userInfo.info?.uid}>
            <td className={styles.rowNO}>{index}</td>
            <td className={styles.rowDate}>{userInfo.info?.date}</td>
            <td className={styles.rowUID}>{userInfo.info?.uid}</td>
            <td className={styles.rowUsername}>
                <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleButtonClick(e, userInfo.info?.uid, "launch-browser")}>{userInfo.info?.username || "Need login"}</button>
            </td>
            <td className={styles.rowType}>
                <input type="text" value={userInfo.info?.type || ""} onChange={(e) => handleInputChange(userInfo.info.uid, { info: { type: e.target.value } })} />
            </td>
            <td className={styles.rowGroup}>
                <input type="text" value={userInfo.info?.group || ""} onChange={(e) => handleInputChange(userInfo.info.uid, { info: { group: e.target.value } })} />
            </td>
            <td className={styles.rowProxy}>
                <input type="text" value={userInfo.info?.proxy || ""} onChange={(e) => handleInputChange(userInfo.info.uid, { info: { proxy: e.target.value } })} />
            </td>
            <td className={styles.rowPassword}>
                <input type="text" value={userInfo.info?.password || ""} onChange={(e) => handleInputChange(userInfo.info.uid, { info: { password: e.target.value } })} />
            </td>
            <td className={styles.row2Fa}>
                <input type="text" value={userInfo.info?.["2fa"] || ""} onChange={(e) => handleInputChange(userInfo.info.uid, { info: { ["2fa"]: e.target.value } })} />
            </td>
            <td className={styles.rowEmail}>
                <input type="text" value={userInfo.info?.email || ""} onChange={(e) => handleInputChange(userInfo.info.uid, { info: { email: e.target.value } })} />
            </td>
            <td className={styles.rowEmailpassword}>
                <input type="text" value={userInfo.info?.emailpassword || ""} onChange={(e) => handleInputChange(userInfo.info.uid, { info: { emailpassword: e.target.value } })} />
            </td>
            <td className={styles.rowPhonenumber}>
                <input type="text" value={userInfo.info?.phonenumber || ""} onChange={(e) => handleInputChange(userInfo.info.uid, { info: { phonenumber: e.target.value } })} />
            </td>
            <td className={styles.rowNote}>
                <input type="text" value={userInfo.info?.note || ""} onChange={(e) => handleInputChange(userInfo.info.uid, { info: { note: e.target.value } })} />
            </td>
            <td className={styles.rowSelected}>
                <input type="checkbox" checked={userInfo.info?.selected || false} onChange={(e) => handleInputChange(userInfo.info.uid, { info: { selected: e.target.checked } })} />
            </td>
            <td className={styles.rowActions} onMouseEnter={handleOnHover}>
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 13.75C12.9665 13.75 13.75 12.9665 13.75 12C13.75 11.0335 12.9665 10.25 12 10.25C11.0335 10.25 10.25 11.0335 10.25 12C10.25 12.9665 11.0335 13.75 12 13.75Z" fill="#000000" />
                    <path d="M19 13.75C19.9665 13.75 20.75 12.9665 20.75 12C20.75 11.0335 19.9665 10.25 19 10.25C18.0335 10.25 17.25 11.0335 17.25 12C17.25 12.9665 18.0335 13.75 19 13.75Z" fill="#000000" />
                    <path d="M5 13.75C5.9665 13.75 6.75 12.9665 6.75 12C6.75 11.0335 5.9665 10.25 5 10.25C4.0335 10.25 3.25 11.0335 3.25 12C3.25 12.9665 4.0335 13.75 5 13.75Z" fill="#000000" />
                </svg>
                <div className={styles.actionsMenu}>
                    <Link to={`/user/${userInfo.info.uid}`}>
                        <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 11V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="7.5" r="1" fill="#000000" />
                        </svg>
                    </Link>
                    <button
                        className={`${styles.actionItem} ${styles.actionDel}`}
                        onClick={e => handleButtonClick(e, userInfo.info.uid, "del")}
                    >
                        <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 12V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14 12V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 7H20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    );
});

export default Row;