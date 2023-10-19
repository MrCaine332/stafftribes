import React from 'react';
import styles from "./Page.module.scss"
import {motion} from "framer-motion";
import {Availability} from "@modules/availability";
import {FriendsAvailability} from "@modules/friends-availability";

export const Home = () => {
    return (
        <motion.main
            className={'container ' + styles.homePage}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <FriendsAvailability />
            <Availability />
        </motion.main>
    );
};