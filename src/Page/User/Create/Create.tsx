import React, { useEffect, useState } from "react";
import styles from "./Create.module.css";
import Form from "./Form";
import Import from "./Import";

const Create: React.FC = () => {
    const [isForm, setIsForm] = useState<boolean>(true);
    const [saveBtnDisabled, setSaveBtnDisabled] = useState<boolean>(true);
    const [listUserInfo, setListUserInfo] = useState<any[]>([]);
    const [userInfo, setUserInfo] = useState<{
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
    }>({
        uid: "",
        username: "",
        password: "",
        "2fa": "",
        email: "",
        emailpassword: "",
        phonenumber: "",
        proxy: "",
        type: "",
        note: "",
        group: "",
    });

    const onSaveClicked = () => {
        const payload = [];
        if (isForm) {
            if (!userInfo.uid || !userInfo.password) { return; }
            payload.push(userInfo);
        } else {
            if (!listUserInfo.length) { return; };
            payload.push(...listUserInfo);
        }
        fetch("http://localhost:3000/user/create", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ payload: payload })
        })
            .then(res => res.json())
            .then(res => console.log(res))
    };

    useEffect(() => {
        if (isForm) {
            if (userInfo.uid && userInfo.password) { setSaveBtnDisabled(false); }
            else { setSaveBtnDisabled(true); };
        } else {
            if (listUserInfo.length) { setSaveBtnDisabled(false); }
            else { setSaveBtnDisabled(true) };
        }
    }, [listUserInfo, userInfo, isForm])
    return (
        <div className={styles.create}>
            <div className={styles.header}>
                <label htmlFor="form" className={`${isForm ? styles.active : ""}`}>
                    Form
                    <input
                        id="form"
                        type="radio"
                        value="form"
                        name="isForm"
                        checked={isForm}
                        onChange={() => setIsForm(true)}
                        hidden
                    />
                </label>
                <label htmlFor="import" className={`${!isForm ? styles.active : ""}`}>
                    Import
                    <input
                        id="import"
                        type="radio"
                        value="import"
                        name="isForm"
                        checked={!isForm}
                        onChange={() => setIsForm(false)}
                        hidden
                    />
                </label>
            </div>
            <div className={styles.body}>
                {
                    isForm ? <Form userInfo={userInfo} setUserInfo={setUserInfo} /> : <Import setListUserInfo={setListUserInfo} />
                }
            </div>
            <div className={styles.footer}>
                <button onClick={onSaveClicked} disabled={saveBtnDisabled}>Save</button>
            </div>
        </div>
    )
}

export default Create;