import styles from './FriendTableItem.module.scss'
import {Friend} from "@app/http/fake-api";
import {Option} from "@components/ui/select/Select";
import {Button} from "@components/ui/button";
import Icons from "@components/ui/icons";
import {Tooltip} from "@components/ui/tooltip/Tooltip";

type FriendTableItemProps = {
	friend: Friend,
	searchIndex: number
	weeksOptions: Option[]
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const getAvailabilityMessage = (friend: Friend, weeksOptions: Option[], searchIndex: number) => {
	let message = ""
	// if (searchIndex === -1) {
	// 	const index = friend.availability.findIndex(a => a !== null)
	// 	if (index === -1)
	// 		message = "Not available"
	// 	let start
	// 	if (index === 0 || index === 1) {
	// 		start = index === 0 ? "This week" : "Next week"
	// 	} else {
	// 		start = weeksOptions[index].name
	// 	}
	// } else {
	// 	message = weeksOptions[searchIndex].name + ":"
	// 	message += friend.availability[searchIndex]!.reduce((prev, curr, currentIndex) => {
	// 		if (currentIndex === 0)
	// 			return prev + " " + days[curr]
	// 		return prev + ", " + days[curr]
	// 	}, "")
	// }

	const actualIndex = searchIndex === -1
		? friend.availability.findIndex(a => a !== null)
		: searchIndex

	if (searchIndex === -1 && actualIndex === -1) {
		return "Not available"
	}

	let start
	console.log(searchIndex, actualIndex)
	if (searchIndex === -1 || (actualIndex === 0 || actualIndex === 1)) {
		start = actualIndex === 0 ? "This week" : "Next week"
	} else {
		start = weeksOptions[actualIndex].name
	}

	const daysString = friend.availability[actualIndex]!.reduce((prev, curr, index, arr) => {
		if (index % 2 !== 0) {
			return prev
		}
		const sign = index === 0 ? ": " : ", "
		const pair = [arr[index], arr[index + 1]]
		if (pair[0] === pair[1]) {
			return prev + sign + days[curr]
		} else {
			return prev + sign + `${days[pair[0]]}-${days[pair[1]]}`
		}
	}, "")
	message += start + daysString

	return message
}

export const FriendTableItem = ({ friend, weeksOptions, searchIndex }: FriendTableItemProps) => {
	const availabilityMessage = getAvailabilityMessage(friend, weeksOptions, searchIndex)

	return (
		<tr className={styles.friendsTableItem}>
			<td className={"textBodySmall"}>{ friend.name }</td>
			<td className={"textBodySmall"}>
				{ availabilityMessage }
			</td>
			<td>
				<div className={styles.friendsTableItemButtons}>
					<Button className={styles.friendsTableItemButton}>
						<Icons name={"eye"} size={16} />
						<Tooltip text={"View profile"} className={styles.buttonTooltip} />
					</Button>
					<Button className={styles.friendsTableItemButton}>
						<Icons name={"lightning"} size={16} />
						<Tooltip text={"Send challenge"} className={styles.buttonTooltip} />
					</Button>
					<Button className={styles.friendsTableItemButton}>
						<Icons name={"message"} size={16} />
						<Tooltip text={"Send email"} className={styles.buttonTooltip} />
					</Button>
					<Button className={styles.friendsTableItemButton}>
						<Icons name={"comment"} size={16} />
						<Tooltip text={"Open chat"} className={styles.buttonTooltip} />
					</Button>
					<Button className={[styles.friendsTableItemButton, styles.deleteBtn].join(' ')}>
						<Icons name={"close"} size={16} />
						<Tooltip text={"Remove this friend"} className={styles.buttonTooltip} />
					</Button>
				</div>
			</td>
		</tr>
	);
};