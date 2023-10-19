import React, {HTMLAttributes} from "react";
import styles from './Section.module.scss'

interface ISection extends HTMLAttributes<HTMLDivElement> {
	className?: string | undefined
	children?: React.ReactNode
	noPadding?: boolean
}

export const Section = ({ className, children, noPadding = false, ...rest }: ISection) => {
	return (
		<div className={[
			styles.section,
			noPadding ? styles.section_p_0 : '',
			className].join(' ')} {...rest}>
			{ children }
		</div>
	);
};