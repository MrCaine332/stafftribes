import styles from './Tooltip.module.scss'

type TooltipProps = {
	text: string
	className?: string
}

export const Tooltip = ({ text, className }: TooltipProps) => {
	return (
		<div className={["textBodySmall", styles.tooltip, className].join(' ')}>
			{ text }
		</div>
	);
};