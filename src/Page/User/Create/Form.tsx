import React from "react";
import styles from "./Form.module.css";

interface FormProps {
    userInfo: {
        uid: string;
        username: string;
        password: string;
        "2fa": string;
        email: string;
        emailpassword: string;
        phonenumber: string;
        proxy: string;
        type: string;
        note: string;
        group: string;
    };
    setUserInfo: React.Dispatch<React.SetStateAction<{
        uid: string;
        username: string;
        password: string;
        "2fa": string;
        email: string;
        emailpassword: string;
        phonenumber: string;
        proxy: string;
        type: string;
        note: string;
        group: string;
    }>>
}

const Form: React.FC<FormProps> = ({ userInfo, setUserInfo }) => {
    return (
        <table className={styles.form}>
            <thead>
                <tr>
                    <th>field</th>
                    <th>value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>UID</td>
                    <td><input type="text" value={userInfo.uid} onChange={(e) => setUserInfo(prev => ({ ...prev, uid: e.target.value }))} /></td>
                </tr>
                <tr>
                    <td>username</td>
                    <td><input type="text" value={userInfo.username} onChange={(e) => setUserInfo(prev => ({ ...prev, username: e.target.value }))} /></td>
                </tr>
                <tr>
                    <td>password</td>
                    <td><input type="text" value={userInfo.password} onChange={(e) => setUserInfo(prev => ({ ...prev, password: e.target.value }))} /></td>
                </tr>
                <tr>
                    <td>2fa</td>
                    <td><input type="text" value={userInfo["2fa"]} onChange={(e) => setUserInfo(prev => ({ ...prev, "2fa": e.target.value }))} /></td>
                </tr>
                <tr>
                    <td>email</td>
                    <td><input type="text" value={userInfo.email} onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))} /></td>
                </tr>
                <tr>
                    <td>email password</td>
                    <td><input type="text" value={userInfo.emailpassword} onChange={(e) => setUserInfo(prev => ({ ...prev, emailpassword: e.target.value }))} /></td>
                </tr>
                <tr>
                    <td>phone number</td>
                    <td><input type="text" value={userInfo.phonenumber} onChange={(e) => setUserInfo(prev => ({ ...prev, phonenumber: e.target.value }))} /></td>
                </tr>
                <tr>
                    <td>proxy</td>
                    <td><input type="text" value={userInfo.proxy} onChange={(e) => setUserInfo(prev => ({ ...prev, proxy: e.target.value }))} /></td>
                </tr>
                <tr>
                    <td>type</td>
                    <td><input type="text" value={userInfo.type} onChange={(e) => setUserInfo(prev => ({ ...prev, type: e.target.value }))} /></td>
                </tr>
                <tr>
                    <td>note</td>
                    <td><input type="text" value={userInfo.note} onChange={(e) => setUserInfo(prev => ({ ...prev, note: e.target.value }))} /></td>
                </tr>
                <tr>
                    <td>group</td>
                    <td><input type="text" value={userInfo.group} onChange={(e) => setUserInfo(prev => ({ ...prev, group: e.target.value }))} /></td>
                </tr>
            </tbody>
        </table>
    )
}

export default Form;