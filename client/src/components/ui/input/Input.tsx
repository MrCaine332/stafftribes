import styles from './Input.module.scss'
import React, {forwardRef} from "react";

type BaseProps = {
	children?: React.ReactNode
	wrapperClassName?: string
	inputBoxClassName?: string
	error?: string | boolean
	showErrorText?: boolean
}

type InputAsInput = BaseProps &
	Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseProps> &
	{ as?: 'input' }

type InputAsTextarea = BaseProps &
	Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, keyof BaseProps> &
	{ as: 'textarea' }

type InputProps = InputAsInput | InputAsTextarea

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(({
		wrapperClassName,
		inputBoxClassName,
		error,
		showErrorText= true,
		children,
		className,
		as,
		...rest
	},
    ref
) => {
	const combinedInputBoxClassName = [
		styles.inputBox,
		as === 'textarea' ? styles.inputBox_autoHeight : '',
		error ? styles.inputBox_error : '',
		inputBoxClassName
	].join(' ')

	const combinedInputClassName = [
		'textButton',
		styles.input,
		className
	].join(' ')

	const getInnerHTML = () => {
		if (as === 'textarea') {
			return (
				<textarea ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
				          className={combinedInputClassName}
				          {...rest as Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, keyof BaseProps>} />
			)
		} else {
			return (
				<input ref={ref as React.ForwardedRef<HTMLInputElement>}
				       className={combinedInputClassName}
				       {...rest as Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseProps>} />
			)
		}
	}

	return (
		<div className={[styles.inputWrapper, wrapperClassName].join(' ')}>
			<div className={combinedInputBoxClassName}>
				{ getInnerHTML() }
				{ children }
			</div>
			{ (showErrorText && typeof error === "string")
				? <p className={'textBody ' + styles.inputError}>
					{ error }
				</p>
				: null }
		</div>
	);
});