import React from "react";
import styles from "./Import.module.css";

interface ImportProps {
    setListUserInfo: React.Dispatch<React.SetStateAction<any[]>>
}

const Import: React.FC<ImportProps> = ({ setListUserInfo }) => {

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const results = event.target?.result;
                if (typeof results === "string") {
                    const base64Data = results.split(',')[1];
                    const jsonData = atob(base64Data);
                    const data = JSON.parse(jsonData);
                    setListUserInfo(prev => ([
                        ...prev,
                        ...data.filter((item: { uid: string; password: string;[key: string]: string }) => item?.uid && item?.password),
                    ]))
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        } else { return; };
    }

    return (
        <div className={styles.form}>
            <input type="file" onChange={handleFileChange} />
        </div>
    );
}

export default Import;

// uid
// username
// password
// email
// emailpassword
// phonenumber
// proxy
// type
// note
// group