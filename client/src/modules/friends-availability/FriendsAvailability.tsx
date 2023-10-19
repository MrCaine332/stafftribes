import styles from './FriendsAvailability.module.scss'
import {Section} from "@components/ui/section";
import {useState} from "react";

import {Select} from "@components/ui/select";
import {Option} from "@components/ui/select/Select";
import {getAvailableFriends, getCounts} from "@app/http/fake-api";
import {Divider} from "@components/ui/divider";
import {FriendTableItem} from "@modules/friends-availability/friend-table-item";
import {useQuery} from "react-query";
import {Loader} from "@components/ui/loader";
import {BlockTitle} from "@components/ui/block-title";

type Availability = "FUN" | "SERIOUS"

const availabilityOptions: Option[] = [
	{ value: "FUN", name: "Just for fun" },
	{ value: "SERIOUS", name: "More serious" }
]


const availabilityButtons = [
	{ index: -1, text: "All", countsIndex: 7 },
	{ index: 0, text: "This week", countsIndex: 0 },
	{ index: 1, text: "Next week", countsIndex: 1 }
]

const weeksOptions = [
	{ value: 0, name: "Week 1" },
	{ value: 1, name: "Week 2" },
	{ value: 2, name: "Week 3" },
	{ value: 3, name: "Week 4" },
	{ value: 4, name: "Week 5" },
	{ value: 5, name: "Week 6" },
	{ value: 6, name: "Week 7" },
]

export const FriendsAvailability = () => {
	const [availabilityType, setAvailabilityType] = useState<Availability>("FUN")
	const [weekIndex, setWeekIndex] = useState(-1)

	const {data: counts,} = useQuery({
		queryKey: ["counts"],
		retryDelay: 1000,
		retry: 0,
		queryFn: () => getCounts(),
	})

	const {data: friends, isLoading} = useQuery({
		queryKey: ["friends", weekIndex],
		retryDelay: 1000,
		retry: 0,
		queryFn: () => getAvailableFriends(weekIndex),
	})

	return (
		<Section noPadding className={styles.friendsAvailability}>
			<BlockTitle title={"My friends"} className={styles.friendsAvailabilityTitle} />
			<header className={styles.friendsAvHeader}>
				<Select options={availabilityOptions}
				        onChange={(o) => setAvailabilityType(o?.value as Availability || "FUN")}
				        selectedOption={availabilityOptions.find(o => o.value === availabilityType) || null}
				        withClearButton={false}
				/>
				<Divider vertical className={styles.divider} />
				<div className={styles.friendsFilter}>
					{ availabilityButtons.map((b, index) => (
						<button key={index}
						        className={[
							        "textButton",
							        styles.friendsFilterButton,
							        weekIndex === b.index ? styles.friendsFilterButton_selected : ""
						        ].join(' ')} onClick={() => setWeekIndex(b.index)}>
							{b.text} { counts?.length ? `(${counts[b.countsIndex]})` : null}
						</button>
					))}
					<Select options={weeksOptions}
					        onChange={(o) => setWeekIndex(o?.value as number || -1)}
					        placeholder={"Select week"}
					        buttonClassName={(
								weekIndex !== 0
						        && weekIndex !== 1
						        && weekIndex !== -1) ? styles.select_selected : ""}
					        selectedOption={weeksOptions[weekIndex] || null} />
				</div>
			</header>
			<div className={styles.friendsTableWrapper}>
				<table className={styles.friendsTable} cellSpacing={0}>
					<thead className={"textBodySmall"}>
					<tr>
						<th style={{width: "20%"}}>Friends</th>
						<th>Available</th>
						<th></th>
					</tr>
					</thead>
					<tbody style={{position: "relative"}}>
					{
						friends?.map((friend, index) => (
							<FriendTableItem friend={friend}
							                 weeksOptions={weeksOptions}
							                 searchIndex={weekIndex}
							                 key={index} />
						))
					}
					</tbody>
				</table>
				{
					isLoading ? <Loader /> : null
				}
			</div>
		</Section>
	);
};
