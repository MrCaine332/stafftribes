import React from 'react'
import { Link } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'
import styles from './Button.module.scss'

type BaseProps = {
	children?: React.ReactNode
	className?: string
}

type ButtonAsButton = BaseProps &
	Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
	as?: 'button'
}

type ButtonAsLink = BaseProps &
	Omit<LinkProps, keyof BaseProps> & {
	as: 'link'
}

type ButtonAsExternal = BaseProps &
	Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
	as: 'externalLink'
}

type ButtonProps =
	| ButtonAsButton
	| ButtonAsExternal
	| ButtonAsLink

export const Button = (props: ButtonProps) => {
	const combinedClassName = [
		'textButton',
		styles.button,
		props.className ?? ''
	].join(' ')

	if (props.as === 'link') {
		const {className, as, ...rest} = props
		return <Link className={combinedClassName} {...rest}>
			{ props.children }
		</Link>

	} else if (props.as === 'externalLink') {
		const {className, as, ...rest} = props
		return (
			<a className={combinedClassName}
               target='_blank'
               rel='noopener noreferrer'
               {...rest}
			>
				{ props.children }
			</a>
		)

	} else {
		const {className, as, ...rest} = props
		return <button className={combinedClassName} {...rest}>
			{ props.children }
		</button>
	}
}