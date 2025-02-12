import React, { memo } from "react";
import styles from "./Row.module.css";

interface RowProps {
    index: number;
    userInfo: {
        actions: any;
        info: any;
        [key: string]: any;
    };
    handleInputChange: (uid: string, payload: {}) => void;
};

const Row: React.FC<RowProps> = memo(({ index, userInfo, handleInputChange }) => {
    return (
        <tr className={styles.row} data-uid={userInfo.info?.uid}>
            <td className={styles.rowNO}>{index}</td>
            <td className={styles.rowDate}>{userInfo.info?.date}</td>
            <td className={styles.rowUID}>{userInfo.info?.uid}</td>
            <td className={styles.rowUsername}>{userInfo.info?.username || "undefined"}</td>
            <td className={styles.rowType}>
                <input type="text" value={userInfo.info?.type || ""} onChange={(e) => handleInputChange(userInfo.info.uid, { info: { type: e.target.value } })} />
            </td>
            <td className={styles.rowProxy}>
                <input type="text" value={userInfo.info?.proxy || ""} onChange={(e) => handleInputChange(userInfo.info.uid, { info: { proxy: e.target.value } })} />
            </td>
            <td className={styles.rowGetname}>
                <input type="checkbox" value={userInfo.actions?.getName || false} onChange={(e) => handleInputChange(userInfo.info.uid, { actions: { getName: e.target.checked } })} />
            </td>
            <td className={styles.rowReelAndLike}>
                <input type="checkbox" value={userInfo.actions?.reelAndLike || false} onChange={(e) => handleInputChange(userInfo.info.uid, { actions: { reelAndLike: e.target.checked } })} />
            </td>
            <td className={styles.rowJoinGroups}>
                <input type="checkbox" value={userInfo.actions?.joinGroups || false} onChange={(e) => handleInputChange(userInfo.info.uid, { actions: { joinGroups: e.target.checked } })} />
            </td>
            <td className={styles.rowaddFriends}>
                <input type="checkbox" value={userInfo.actions?.addFriends || false} onChange={(e) => handleInputChange(userInfo.info.uid, { actions: { addFriends: e.target.checked } })} />
            </td>
            <td className={styles.rowPostNewFeed}>
                <input type="checkbox" value={userInfo.actions?.postNewFeed || false} onChange={(e) => handleInputChange(userInfo.info.uid, { actions: { postNewFeed: e.target.checked } })} />
            </td>
            <td className={styles.rowSellGroup}>
                <input type="checkbox" value={userInfo.actions?.sellGroup || false} onChange={(e) => handleInputChange(userInfo.actions.uid, { actions: { sellGroup: e.target.checked } })} />
            </td>
            <td className={styles.rowActions}>
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 13.75C12.9665 13.75 13.75 12.9665 13.75 12C13.75 11.0335 12.9665 10.25 12 10.25C11.0335 10.25 10.25 11.0335 10.25 12C10.25 12.9665 11.0335 13.75 12 13.75Z" fill="#000000" />
                    <path d="M19 13.75C19.9665 13.75 20.75 12.9665 20.75 12C20.75 11.0335 19.9665 10.25 19 10.25C18.0335 10.25 17.25 11.0335 17.25 12C17.25 12.9665 18.0335 13.75 19 13.75Z" fill="#000000" />
                    <path d="M5 13.75C5.9665 13.75 6.75 12.9665 6.75 12C6.75 11.0335 5.9665 10.25 5 10.25C4.0335 10.25 3.25 11.0335 3.25 12C3.25 12.9665 4.0335 13.75 5 13.75Z" fill="#000000" />
                </svg>
            </td>
        </tr>
    );
});

export default Row;