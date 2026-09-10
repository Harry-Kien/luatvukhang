import ts from 'typescript';
import fs from 'node:fs';
import zh from '../src/lib/zh';
const missing=new Map<string,string>();let checked=0;
function walk(dir:string){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
 if(entry.name==='migrations')continue;const file=dir+'/'+entry.name;
 if(entry.isDirectory()){walk(file);continue;}
 if(!/\.tsx?$/.test(file)||file.endsWith('payload-types.ts'))continue;
 const source=ts.createSourceFile(file,fs.readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true);
 function visit(node:ts.Node){if(ts.isCallExpression(node)&&node.expression.getText(source)==='t'&&node.arguments.length>=3&&ts.isStringLiteralLike(node.arguments[2])){const key=node.arguments[2].text;checked++;if(!zh[key]?.trim())missing.set(key,file);}ts.forEachChild(node,visit);}visit(source);
}}
walk('src');
if(missing.size){console.error('Missing Chinese UI translations:',Object.fromEntries(missing));process.exitCode=1;}else console.log(`${checked} static translation calls checked; no missing Chinese UI entries.`);
