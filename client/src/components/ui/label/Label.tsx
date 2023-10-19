import styles from './Label.module.scss'

type LabelProps = {
	label?: string
	children?: React.ReactNode
	wrapperClassName?: string
	className?: string
}

export const Label = ({ label, children, wrapperClassName, className }: LabelProps) => {
	return (
		<div className={[styles.labelWrapper, wrapperClassName].join(' ')}>
			<label className={['textBodySmall', className].join(' ')}>{ label }</label>
			{ children }
		</div>
	);
};