import React from "react";
import styles from "./BlockTitle.module.scss"

type BlockTitleProps = {
    title: string
    className?: string
}

export const BlockTitle = ({ title, className }: BlockTitleProps) => {
    return (
        <div className={[
            styles.blockTitle,
            className
        ].join(' ')}>
            <h3 className={'textBodyBold'}>{title}</h3>
            <hr className={styles.blockTitleUnderline}/>
        </div>
    )
}