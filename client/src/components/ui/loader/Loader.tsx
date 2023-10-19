import styles from './Loader.module.scss'

export const Loader = () => {
	return (
		<div className={styles.loaderWrapper}>
			<div className={styles.loaderBackground} />
			<span className={styles.loader}></span>
		</div>
	);
};