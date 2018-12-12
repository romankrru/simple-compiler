import tokenizer from './tokenizer';
import parser from './parser';
import transformer from './transformer';

const tokens = tokenizer(
`
(sub 4 5)
(add 1 4 (div 20 5))
`
);

const ast = parser(tokens);
const newAst = transformer(ast)
console.log(ast);
console.log(newAst);
