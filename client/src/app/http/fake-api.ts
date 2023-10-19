import data from "@app/data/friends.json"

export type Friend = {
	id: number
	name: string
	availability: (number[] | null)[]
}

const delay = async (timeout: number) => {
	const promise = new Promise(resolve => setTimeout(resolve, timeout))
	return promise
}

export const getCounts = async () => {
	const counts: number[] = [0,0,0,0,0,0,0]
	let totalAvailableFriends = 0

	data.forEach((friend, fi) => {
		let isFriendAvailable = false
		friend.availability.forEach((item, index) => {
			if (item && item.length > 0) {
				counts[index] = counts[index] + 1
				isFriendAvailable = true
			}
		})
		if (isFriendAvailable)
			totalAvailableFriends++
	})

	counts.push(totalAvailableFriends)
	await delay(1000)
	return counts
}

export const getAvailableFriends = async (weekIndex: number) => {
	if (weekIndex === -1) {
		await delay(1000)
		return data
	}
	const availableFriends = data.filter(friend => friend.availability[weekIndex])
	await delay(1000)
	return availableFriends
}