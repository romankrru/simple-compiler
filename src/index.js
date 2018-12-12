import tokenizer from './tokenizer';
import parser from './parser';
import transformer from './transformer';
import codeGenerator from './code-generator';

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const compiler = pipe(
	tokenizer,
	parser,
	transformer,
	codeGenerator,
);

const result = compiler(`
(add 1 4 (div 20 5))
(sub 1 1)
(print "Hi " "There")
(add (sub 2 1) (add 2 2))
`);

console.log(result);
