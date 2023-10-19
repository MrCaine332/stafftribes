export function isNullOrWhitespace(input: string) {
	return (typeof input === 'undefined' || input == null)
		|| input.replace(/\s/g, '').length < 1;
}