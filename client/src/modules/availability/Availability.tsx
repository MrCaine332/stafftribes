import styles from './Availability.module.scss'
import {Section} from "@components/ui/section";
import {useAppSelector} from "@app/hooks/store";
import {AvailabilitySlider} from "@components/availability-slider";
import {BlockTitle} from "@components/ui/block-title";

export const Availability = () => {
	const availabilityData = useAppSelector(state => state.availability)

	return (
		<Section>
			<BlockTitle title={"My availability"} />
			<div className={styles.availability}>
				{
					availabilityData.availability.map((item, index) => (
						<AvailabilitySlider index={index} weekData={item} key={index} />
					))
				}
			</div>
		</Section>
	);
};
