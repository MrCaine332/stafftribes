export const shiftDays = (array: number[], dayToShift: number, finalPosition: number) => {
	const arrayCopy = [...array]
	const toShift = [dayToShift]
	let number = dayToShift

	while (toShift.length !== 0) {
		const current = toShift[toShift.length - 1]
		const prev = current - 1

		const a = arrayCopy.includes(prev)
		if (a) {
			toShift.push(prev)
		} else {
			const index = arrayCopy.findIndex(n => n === current)
			arrayCopy[index] = prev
			if (current !== number) {
				toShift.pop()
				continue
			}
			if (current === number && finalPosition === prev) {
				toShift.pop()
			} else {
				number = prev
				toShift.pop()
				toShift.push(prev)
			}
		}
	}

	return arrayCopy
}
