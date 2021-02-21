export const ucFirst = (text) => {
	return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
};

export const threeWords = (text) => {
	return text.split(' ').slice(0,2).join(' ')
};