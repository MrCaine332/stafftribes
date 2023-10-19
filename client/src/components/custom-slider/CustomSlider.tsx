import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from './CustomSlider.module.scss'

type CustomSliderProps = {
	values: number[]
	disabled: boolean
	onRangeChange: (value: number | number[]) => void
	onRangeAfterChange: (value: number | number[]) => void
}

export const CustomSlider = ({ values, disabled, onRangeChange, onRangeAfterChange }: CustomSliderProps) => {
	return (
		<div className={styles.slider}>
			<Slider min={0}
			        max={6}
			        dots
			        range
			        disabled={disabled}
			        value={values}
			        onChange={onRangeChange}
			        onAfterChange={onRangeAfterChange}
			        pushable={0}
			        marks={{
				        0: "Mon",
				        1: "Tue",
				        2: "Wed",
				        3: "Thu",
				        4: "Fri",
				        5: "Sat",
				        6: "Sun"
			        }}
			        classNames={{
				        track: styles.sliderTrack,
				        handle: styles.sliderHandle
			        }}
			        dotStyle={{
				        borderRadius: 0,
				        width: "2px",
				        height: "12px",
				        border: "none",
				        backgroundColor: "var(--neutral-5)",
				        top: "-4px",
			        }}
			/>
		</div>
	)
};