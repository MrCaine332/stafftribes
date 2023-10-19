export function getWeek(n: number = 0) {
	const currentDate = new Date();
	if (n > 0)
		currentDate.setDate(currentDate.getDate() + n * 7)
	const startDate = new Date(currentDate.getFullYear(), 0, 1);
	// @ts-ignore
	const days = Math.floor((currentDate - startDate) /
		(24 * 60 * 60 * 1000));

	const weekNumber = Math.ceil(days / 7);

	return weekNumber
}