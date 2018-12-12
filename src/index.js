import tokenizer from './tokenizer';
import parser from './parser';

const tokens = tokenizer(
`
(sub 4 5)
(add 1 4 (div 20 5))
`
);

const ast = parser(tokens);
console.log(ast);
