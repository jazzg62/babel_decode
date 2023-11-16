import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generator from '@babel/generator';
import * as types from '@babel/types';
import { readFileSync, writeFileSync } from 'fs';

let code = readFileSync('./source_code.js').toString();

let ast = parse(code, { sourceType: 'script' });

traverse(ast, {
    Literal(path) {
        // path.addComment('inner', 'hello')
        if (types.isStringLiteral(path.node) && path.node.value) {
            path.node.value = new String(path.node.value +'') as string
        }
    },
})
let out = generator(ast, { jsescOption: { "minimal": true } }).code
console.log(out)

writeFileSync('./out_code.js', out.toString());