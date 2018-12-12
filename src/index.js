import tokenizer from './tokenizer';
import parser from './parser';
import transformer from './transformer';
import codeGenerator from './code-generator';

const tokens = tokenizer(
`
(add 1 4 (div 20 5))
`
);

const ast = parser(tokens);
const newAst = transformer(ast)
const compiled = codeGenerator(newAst);
console.log(compiled);
