import React, {useState} from 'react';
import styles from "./Page.module.scss"
import {motion} from "framer-motion";
import {Input} from "@components/ui/input";
import {Button} from "@components/ui/button";
import {Divider} from "@components/ui/divider";
import {useNavigate} from "react-router-dom";

export const Auth = () => {
    const navigate = useNavigate()
    const [nameInputValue, setNameInputValue] = useState("")
    const [accessCode, setAccessCode] = useState("")

    const onCreate = () => {
        navigate('/created')
    }

    const onSignIn = () => {
        navigate('/home')
    }

    return (
        <motion.div className={styles.authWrapper}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
        >
            <motion.div
                className={styles.auth}
                initial={{ opacity: 0, y: "75%"}}
                animate={{ opacity: 1, y: "-25%"}}
                exit={{x: "-100%"}}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.authOption}>
                    <span className={"textBodySmallBold " + styles.authTitle}>
                        Create account
                    </span>
                    {/*<div className={styles.authAvatar}>*/}
                    {/*    <img src="" alt=""/>*/}
                    {/*</div>*/}
                    <Input placeholder={"Your name"}
                           wrapperClassName={styles.authInput}
                           value={nameInputValue}
                           onChange={(e) => setNameInputValue(e.target.value)} />
                    <Button onClick={onCreate}>Create</Button>
                </div>

                <div className={styles.authDivider}>
                    <Divider />
                    <span className={"textBody"}>OR</span>
                    <Divider />
                </div>

                <div className={styles.authOption}>
                    <span className={"textBodySmallBold " + styles.authTitle}>
                        Enter access code
                    </span>
                    <Input placeholder={"Access code"}
                           wrapperClassName={styles.authInput}
                           value={accessCode}
                           onChange={(e) => setAccessCode(e.target.value)} />
                    <Button onClick={onSignIn}>Sign in</Button>
                </div>
            </motion.div>
        </motion.div>
    );
};