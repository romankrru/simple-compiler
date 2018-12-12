// Code Generator: prints tree into string
import {nodeTypes} from '../generic';

function codeGenerator(node) {
	switch(node.type) {
		case nodeTypes.Program:
			return node.body.map(codeGenerator).join('\n');

		case nodeTypes.ExpressionStatement:
			return `${codeGenerator(node.expression)};`;

		case nodeTypes.CallExpression:
			return [
				codeGenerator(node.callee),
				'(',
				node.arguments.map(codeGenerator).join(', '),
				')',
			].join('');

		case nodeTypes.Identifier:
			return node.name;

		case nodeTypes.NumberLiteral:
			return node.value;

		case nodeTypes.StringLiteral:
			return `"${node.value}"`;

		default:
			throw new TypeError(node.type);
	}
}

export default codeGenerator;
