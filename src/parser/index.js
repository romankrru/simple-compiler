// Parser: takes array of tokens, returns AST
// [{ type: 'paren', value: '(' }, ...]   =>   { type: 'Program', body: [...] }
import {tokenTypes, nodeTypes} from '../generic';

function parser(tokens) {
	let current = 0;

	function walk() {
		let token = tokens[current];

		if (token.type === tokenTypes.NUMBER) {
			current++;

			return {
				type: nodeTypes.NumberLiteral,
				value: token.value,
			};
		}

		if (token.type === tokenTypes.STRING) {
			current++;

			return {
				type: nodeTypes.StringLiteral,
				value: token.value,
			};
		}

		if (
			token.type === tokenTypes.PAREN &&
			token.value === '('
		) {
			token = tokens[++current];

			const node = {
				type: nodeTypes.CallExpression,
				name: token.value,
				params: [],
			};

			token = tokens[++current];

			while (
				(token.type !== tokenTypes.PAREN) ||
				(token.type === tokenTypes.PAREN && token.value !== ')')
			) {
				node.params.push(walk());
				token = tokens[current];
			}

			current++;

			return node;
		}

		throw new TypeError('Unknown token type: ' + token.type);
	}

	const ast = {
		type: nodeTypes.Program,
		body: [],
	}

	while (current < tokens.length) {
		ast.body.push(walk());
	}

	return ast;
}

export default parser;
