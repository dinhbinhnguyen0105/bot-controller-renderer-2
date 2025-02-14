import React, { useState } from "react";
import styles from "./Config.module.css";

interface User {
    actions: any;
    info: any;
    [key: string]: any;
}

interface ConfigProps {
    isOpen: boolean;
    onClose: () => void;
    selectedUser: User[];
}

const ConfigModal: React.FC<ConfigProps> = ({ isOpen, onClose, selectedUser, }) => {
    const [actions, setActions] = useState<{
        getName: boolean,
        reelAndLike: string,
        newsFeed: boolean,
        joinGroup: {
            groupKeySearch: string,
            count: string,
        },
        addFriend: string,
        postNewsFeed: {
            pid: string,
            random: boolean,
            postInfo: {
                text: string,
                images: string,
            }
        },
        postGroupFeed: {
            pid: string,
            random: boolean,
            postInfo: {
                text: string,
                images: string,
            }
        },
        sellInGroup: {
            pid: string,
            random: boolean,
            postInfo: {
                text: string,
                images: string,
            }
        }
    }>({
        getName: false,
        reelAndLike: "",
        newsFeed: false,
        joinGroup: {
            groupKeySearch: "",
            count: ""
        },
        addFriend: "",
        postNewsFeed: {
            random: false,
            pid: "",
            postInfo: {
                text: "",
                images: "",
            }
        },
        postGroupFeed: {
            random: false,
            pid: "",
            postInfo: {
                text: "",
                images: "",
            }
        },
        sellInGroup: {
            random: false,
            pid: "",
            postInfo: {
                text: "",
                images: "",
            }
        },
    });

    const handleInputChange = (payload: Partial<typeof actions>) => {
        setActions(prevActions => ({
            ...prevActions,
            ...payload
        }));
    };
    const handleSaveBtn = () => {
        const newData = selectedUser.map(item => ({
            ...item,
            actions: {
                ...item.actions,
                ...actions,
            }
        }));
        Promise.all(newData.map(item =>
            fetch(`http://localhost:3000/user/list/${item.info.uid}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ payload: item }),
            })
        )).then(() => onClose());
    }

    if (!isOpen) { return null; };
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContainer} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>config action</div>
                <table>
                    <tbody>
                        <tr>
                            <td>get name</td>
                            <td colSpan={3}><input type="checkbox" checked={actions.getName} onChange={(e) => handleInputChange({ getName: e.target.checked })} /></td>
                        </tr>
                        <tr>
                            <td>like reel</td>
                            <td colSpan={3}>
                                <input type="text" placeholder="Count ..." value={actions.reelAndLike} onChange={e => handleInputChange({ reelAndLike: e.target.value })} />
                            </td>
                        </tr>
                        <tr>
                            <td>new feed</td>
                            <td colSpan={3}>
                                <input type="checkbox" checked={actions.newsFeed} onChange={(e) => handleInputChange({ newsFeed: e.target.checked })} />
                            </td>
                        </tr>
                        <tr>
                            <td>join group</td>
                            <td>
                                <input type="text" placeholder="Count ..." value={actions.joinGroup.count} onChange={e => handleInputChange({ joinGroup: { count: e.target.value, groupKeySearch: actions.joinGroup.groupKeySearch } })} />
                            </td>
                            <td colSpan={2}>

                                <input type="text" placeholder="Keyword ..." value={actions.joinGroup.groupKeySearch} onChange={e => handleInputChange({ joinGroup: { groupKeySearch: e.target.value, count: actions.joinGroup.count } })} />
                            </td>
                        </tr>
                        <tr>
                            <td>add friend</td>
                            <td colSpan={3}>
                                <input type="text" placeholder="Count ..." value={actions.addFriend} onChange={e => handleInputChange({ addFriend: e.target.value })} />
                            </td>
                        </tr>
                        <tr>
                            <td>post news feed</td>
                            <td>
                                <input type="checkbox" id="randForPostNewsFeed" checked={actions.postNewsFeed.random} onChange={e => handleInputChange({ postNewsFeed: { ...actions.postNewsFeed, random: e.target.checked } })} />
                                <label htmlFor="randForPostNewsFeed">
                                    random
                                </label>
                            </td>
                            <td>
                                <input type="text" placeholder="PID ..." value={actions.postNewsFeed.pid} onChange={e => handleInputChange({ postNewsFeed: { ...actions.postNewsFeed, pid: e.target.value } })} />
                            </td>
                            <td>
                                <input type="text" placeholder="Text ..." value={actions.postNewsFeed.postInfo.text} onChange={e => handleInputChange({ postNewsFeed: { ...actions.postNewsFeed, postInfo: { ...actions.postNewsFeed.postInfo, text: e.target.value } } })} />
                                <input type="text" placeholder="Images ..." value={actions.postNewsFeed.postInfo.images} onChange={e => handleInputChange({ postNewsFeed: { ...actions.postNewsFeed, postInfo: { ...actions.postNewsFeed.postInfo, images: e.target.value } } })} />
                            </td>
                        </tr>
                        <tr>
                            <td>post group feed</td>
                            <td>
                                <input type="checkbox" id="randPIDForPostGroupFeed" checked={actions.postGroupFeed.random} onChange={e => handleInputChange({ postGroupFeed: { ...actions.postGroupFeed, random: e.target.checked } })} />
                                <label htmlFor="randPIDForPostGroupFeed">
                                    random
                                </label>
                            </td>
                            <td>
                                <input type="text" placeholder="PID ..." value={actions.postGroupFeed.pid} onChange={e => handleInputChange({ postGroupFeed: { ...actions.postGroupFeed, pid: e.target.value } })} />
                            </td>
                            <td>
                                <input type="text" placeholder="Text ..." value={actions.postGroupFeed.postInfo.text} onChange={e => handleInputChange({ postGroupFeed: { ...actions.postGroupFeed, postInfo: { ...actions.postGroupFeed.postInfo, text: e.target.value } } })} />
                                <input type="text" placeholder="Images ..." value={actions.postGroupFeed.postInfo.images} onChange={e => handleInputChange({ postGroupFeed: { ...actions.postGroupFeed, postInfo: { ...actions.postGroupFeed.postInfo, images: e.target.value } } })} />
                            </td>
                        </tr>
                        <tr>
                            <td>sell in group</td>
                            <td>
                                <input type="checkbox" id="randPIDForSellInGroup" checked={actions.sellInGroup.random} onChange={e => handleInputChange({ sellInGroup: { ...actions.sellInGroup, random: e.target.checked } })} />
                                <label htmlFor="randPIDForSellInGroup">
                                    random
                                </label>
                            </td>
                            <td>
                                <input type="text" placeholder="PID ..." value={actions.sellInGroup.pid} onChange={e => handleInputChange({ sellInGroup: { ...actions.sellInGroup, pid: e.target.value } })} />
                            </td>
                            <td>
                                <input type="text" placeholder="Text ..." value={actions.sellInGroup.postInfo.text} onChange={e => handleInputChange({ sellInGroup: { ...actions.sellInGroup, postInfo: { ...actions.sellInGroup.postInfo, text: e.target.value } } })} />
                                <input type="text" placeholder="Images ..." value={actions.sellInGroup.postInfo.images} onChange={e => handleInputChange({ sellInGroup: { ...actions.sellInGroup, postInfo: { ...actions.sellInGroup.postInfo, images: e.target.value } } })} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className={styles.footer}>
                    <button onClick={handleSaveBtn}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default ConfigModal;