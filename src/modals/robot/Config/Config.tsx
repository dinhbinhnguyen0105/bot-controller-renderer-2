import React, { useState } from "react";
import styles from "./Config.module.css";

interface User {
    actions: any;
    info: any;
    [key: string]: any;
}

interface ConfigProps {
    isOpen: boolean,
    onClose: () => void;
    selectedUser: User[]
}

const ConfigModal: React.FC<ConfigProps> = ({ isOpen, onClose, selectedUser }) => {
    const [actions, setActions] = useState<{
        getName: boolean,
        reelAndLike: boolean | number,
        newsFeed: boolean,
        joinGroup: boolean | {
            groupKeySearch: string,
            count: number,
        },
        addFriend: boolean | number,
        postNewsFeed: boolean | {
            pid: string,
            random: boolean,
            postInfo: {
                text: string,
                images: string,
            }
        },
        postGroupFeed: boolean | {
            pid: string,
            random: boolean,
            postInfo: {
                text: string,
                images: string,
            }
        },
        sellInGroup: boolean | {
            pid: string,
            random: boolean,
            postInfo: {
                text: string,
                images: string,
            }
        }
    }>({
        getName: false,
        reelAndLike: false,
        newsFeed: false,
        joinGroup: false,
        addFriend: false,
        postNewsFeed: false,
        postGroupFeed: false,
        sellInGroup: false
    });

    // interface InputChange {
    //     field: string
    // }

    const handleInputChange = (payload: Partial<typeof actions>) => {
        setActions(prevActions => ({
            ...prevActions,
            ...payload
        }));
    }

    if (!isOpen) { return null; };
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContainer} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>config action</div>
                <table>
                    <thead>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>get name</td>
                            <td><input type="checkbox" checked={actions.getName} onChange={(e) => handleInputChange({ getName: e.target.checked })} /></td>
                        </tr>
                        <tr>
                            <td>like reel</td>
                            <td>
                                <input type="checkbox" checked={typeof actions.reelAndLike === "number" ? actions.reelAndLike > 0 : actions.reelAndLike} onChange={(e) => handleInputChange({ reelAndLike: e.target.checked ? 1 : 0 })} />
                            </td>
                            {(typeof actions.reelAndLike === "number" ? actions.reelAndLike > 0 : actions.reelAndLike) && (
                                <td><input type="text" placeholder="Count ..." onChange={e => handleInputChange({ reelAndLike: parseInt(e.target.value) })} /></td>
                            )}
                        </tr>
                        <tr>
                            <td>new feed</td>
                            <td>
                                <input type="checkbox" checked={actions.newsFeed} onChange={(e) => handleInputChange({ newsFeed: e.target.checked })} />
                            </td>
                        </tr>
                        <tr>
                            <td>join group</td>
                            <td>
                                <input type="checkbox" checked={typeof actions.joinGroup === 'boolean' ? actions.joinGroup : false} onChange={(e) => handleInputChange({ joinGroup: e.target.checked ? { groupKeySearch: '', count: 0 } : false })} />
                            </td>
                            {(actions.joinGroup) && (
                                <>
                                    <td><input type="text" placeholder="Group search ..." /></td>
                                    <td><input type="text" placeholder="Count ..." /></td>
                                </>
                            )}
                        </tr>
                    </tbody>
                </table>
                <div className={styles.footer}>

                </div>
            </div>
        </div>
    );
}

export default ConfigModal;