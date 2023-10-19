import React from 'react';
import styles from "./Page.module.scss"
import {motion} from "framer-motion";
import {Button} from "@components/ui/button";

export const Created = () => {
    return (
        <motion.div className={styles.createdWrapper}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
        >
            <motion.div
                className={styles.created}
                initial={{ opacity: 0, y: "75%"}}
                animate={{ opacity: 1, y: "-25%"}}
                exit={{x: "-100%"}}
                transition={{ duration: 0.5 }}
            >
                <span className={"textBodyBold"}>YOUR ACCESS CODE</span>
                <div className={"textBodyLargeBold " + styles.createdAccessCode}>
                    SFDADASDASd
                </div>
                <span className={"textBodySmall"}>Please, save this code in order to access your account later</span>
                <Button as={"link"} to={"/home"}>Continue</Button>
            </motion.div>
        </motion.div>
    );
};