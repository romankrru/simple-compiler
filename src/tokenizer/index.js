// Tokenizer: (add 2 (subtract 4 2))   =>   [{ type: 'paren', value: '(' }, ...]

function tokenizer(input) {
	let current = 0;
	let tokens = [];

	while (current < input.length) {
		let char = input[current];

		if (char === '(') {
			tokens.push({
				type: 'paren',
				value: '(',
			});

			current++;
			continue;
		}

		if (char === ')') {
			tokens.push({
				type: 'paren',
				value: ')',
			});

			current++;
			continue;
		}

		let WHITESPACE = /\s/;

		if (WHITESPACE.test(char)) {
			current++;
			continue;
		}

		let NUMBERS = /[0-9]/;

		if (NUMBERS.test(char)) {
			let value = '';

			while (NUMBERS.test(char)) {
				value += char;
				char = input[++current];
			}

			tokens.push({type: 'number', value});
			continue;
		}

		if (char === '"') {
			let value = '';
			char = input[++current];

			while (char !== '"') {
				value += char;
				char = input[++current];
			}

			// Skip closing double quote
			char = input[++current];

			tokens.push({type: 'string', value});
		}

		let LETTERS = /[a-z]/i;

		if (LETTERS.test(char)) {
			let value = '';

			while (LETTERS.test(char)) {
				value += char;
				char = input[++current];
			}

			tokens.push({type: 'name', value});
			continue;
		}

		throw new TypeError('Unknown character: ' + char);
	}

	return tokens;
}

export default tokenizer;
