// Transformer: takes the AST and passes it to traverser with a visitor.
// Returns new AST.
import traverser from './traverser';
import {nodeTypes} from '../generic';

function transformer(ast) {
	const newAst = {
		type: nodeTypes.Program,
		body: [],
	};

	ast._context = newAst.body;

	traverser(ast, {
		[nodeTypes.NumberLiteral]: {
			enter(node, parent) {
				parent._context.push({
					type: nodeTypes.NumberLiteral,
					value: node.value,
				});
			},
		},

		[nodeTypes.StringLiteral]: {
			enter(node, parent) {
				parent._context.push({
					type: nodeTypes.StringLiteral,
					value: node.value,
				});
			},
		},

		[nodeTypes.CallExpression]: {
			enter(node, parent) {
				let expression = {
					type: nodeTypes.CallExpression,

					callee: {
						type: nodeTypes.Identifier,
						name: node.name,
					},

					arguments: [],
				};

				node._context = expression.arguments;

				if (parent.type !== nodeTypes.CallExpression) {
					expression = {
						type: nodeTypes.ExpressionStatement,
						expression: expression,
					};
				}

				parent._context.push(expression);
			},
		}
	});

	return newAst;
}

export default transformer;
