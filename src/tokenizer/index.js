// Tokenizer: (add 2 (subtract 4 2))   =>   [{ type: 'paren', value: '(' }, ...]
import {tokenTypes} from '../generic';

function tokenizer(input) {
	let current = 0;
	const tokens = [];

	while (current < input.length) {
		let char = input[current];

		if (char === '(') {
			tokens.push({
				type: tokenTypes.PAREN,
				value: '(',
			});

			current++;
			continue;
		}

		if (char === ')') {
			tokens.push({
				type: tokenTypes.PAREN,
				value: ')',
			});

			current++;
			continue;
		}

		// WHITESPACE
		if (/\s/.test(char)) {
			current++;
			continue;
		}

		const NUMBERS = /[0-9]/;

		if (NUMBERS.test(char)) {
			let value = '';

			while (NUMBERS.test(char)) {
				value += char;
				char = input[++current];
			}

			tokens.push({type: tokenTypes.NUMBER, value});
			continue;
		}

		// STRING
		if (char === '"') {
			let value = '';
			char = input[++current];

			while (char !== '"') {
				value += char;
				char = input[++current];
			}

			// Skip closing double quote
			char = input[++current];

			tokens.push({type: tokenTypes.STRING, value});
		}

		const LETTERS = /[a-z]/i;

		if (LETTERS.test(char)) {
			let value = '';

			while (LETTERS.test(char)) {
				value += char;
				char = input[++current];
			}

			tokens.push({type: tokenTypes.NAME, value});
			continue;
		}

		throw new TypeError('Unknown character: ' + char);
	}

	return tokens;
}

export default tokenizer;
