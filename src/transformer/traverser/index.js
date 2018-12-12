import {nodeTypes} from '../../generic';

function traverser(ast, visitor) {
	function traverseArray(array, parent) {
		array.forEach(child => {
			traverseNode(child, parent);
		});
	}

	function traverseNode(node, parent) {
		const methods = visitor[node.type];

		if (methods && methods.enter) {
			methods.enter(node, parent);
		}

		switch(node.type) {
			case nodeTypes.Program:
				traverseArray(node.body, node);
				break;

			case nodeTypes.CallExpression:
				traverseArray(node.params, node);
				break;

			case nodeTypes.NumberLiteral:
			case nodeTypes.StringLiteral:
				break;

			default:
				throw new TypeError('Unknown node type: ' + node.type);
		}

		if (methods && methods.exit) {
			methods.exit(node.parent);
		}
	}

	traverseNode(ast, null);
}

export default traverser;
