const enEquivalentTofa = {
	'0': '۰',
	'1': '۱',
	'2': '۲',
	'3': '۳',
	'4': '۴',
	'5': '۵',
	'6': '۶',
	'7': '۷',
	'8': '۸',
	'9': '۹'
}


export function tabdil(number, formatted = false) {
	if (!number) {
		return '';
	}

	number = number + '';//if it is inteader we should cast it to number
	var result = number.replace(/[0-9]/g, function (char) {
		return enEquivalentTofa[char];
	});

	// formatted is like 111,111,111
	return formatted ? Number(number).toLocaleString(['fa']) + '' : result;
}
