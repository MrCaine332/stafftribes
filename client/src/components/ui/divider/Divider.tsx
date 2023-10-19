import styles from './Divider.module.scss'
import {HTMLAttributes} from "react";

type BaseProps = {
	className?: string
	vertical?: boolean
}

type DividerProps = BaseProps & HTMLAttributes<HTMLHRElement>

export const Divider = ({ className, vertical = false }: DividerProps) => {
	return (
		<hr className={[
			styles.divider,
			vertical ? styles.divider_vertical : "",
			className
		].join(' ')}/>
	);
};