import {useEffect, useLayoutEffect, useRef, useState} from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from './AvailabilitySlider.module.scss'
import {IAvailabilityState, WeekAvailability} from "@app/types/store";
import {useAppDispatch} from "@app/hooks/store";
import {availabilityActions} from "@app/store/slices/availability-slice";
import Icons from "@components/ui/icons";
import {CustomSlider} from "@components/custom-slider";



type AvailabilitySliderProps = {
	index: number
	weekData: WeekAvailability
}

export const AvailabilitySlider = ({ index, weekData }: AvailabilitySliderProps) => {
	const dispatch = useAppDispatch()
	const [previewValues, setPreviewValues] = useState(weekData.days)
	const ref = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		setPreviewValues(weekData.days)
	}, [weekData.days])

	useEffect(() => {
		const el = ref.current
		if (el) {
			const tracks = el.querySelectorAll('.rc-slider-track')
			tracks.forEach((el, index) => {
				if (index % 2 !== 0) {
					el.classList.add('hidden')
				}
			})
		}
	}, [previewValues.length])

	const onRangeChange = (changes: number | number[]) =>
		setPreviewValues(changes as number[])

	const onRangeAfterChange = (changes: number | number[]) => {
		let changedIndex = -1
		const oldDays = weekData.days
		const newDays = changes as number[]
		newDays.forEach((number, index) => {
			if (number !== oldDays[index]) {
				changedIndex = index
			}
		})
		setPreviewValues(oldDays)

		if (changedIndex % 2 === 0
			&& (newDays[changedIndex] === newDays[changedIndex - 1]
			|| newDays[changedIndex] === newDays[changedIndex + 2])) {
			return
		}

		if (changedIndex % 2 !== 0
			&& (newDays[changedIndex] === newDays[changedIndex + 1]
			|| newDays[changedIndex] === newDays[changedIndex - 2])) {
			return;
		}
		dispatch(availabilityActions.setDays({ index: index, changes: newDays}))
		setPreviewValues(newDays)
	}

	const onAddRange = () => {
		dispatch(availabilityActions.addRange(index))
	}

	const onRemoveRange = () => {
		dispatch(availabilityActions.removeRange(index))
	}

	return (
		<div className={styles.availabilitySlider}>
			<label className={styles.availabilityToggler}>
				<span className="textBodySmall">
					{
						index === 0 ? "This week"
							: index === 1 ? "Next week"
								: `Week ${index + 1}`
					}

				</span>
				<input type="checkbox"
				       checked={weekData.isAvailable}
				       onChange={(e) =>
					       dispatch(availabilityActions.setAvailability({index, isAvailable: e.target.checked}))}/>
			</label>
			<div ref={ref} className={[
				styles.sliderWrapper,
				weekData.isAvailable ? "" : styles.sliderDisabled
			].join(' ')}>
				<CustomSlider values={previewValues}
				              disabled={!weekData.isAvailable}
				              onRangeChange={onRangeChange}
				              onRangeAfterChange={onRangeAfterChange} />
			</div>
			<div className={styles.availabilityButtons}>
				<button onClick={onRemoveRange}
				        disabled={weekData.days.length < 3 || !weekData.isAvailable}>
					<Icons name={"minus"} size={22} />
				</button>
				<span className="textBodySmall">{ weekData.days.length / 2 }</span>
				<button onClick={onAddRange}
				        disabled={weekData.days.length > 5 || !weekData.isAvailable}>
					<Icons name={"plus"} size={22} />
				</button>
			</div>
		</div>
	)
};