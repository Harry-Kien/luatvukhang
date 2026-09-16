import ts from 'typescript';
import fs from 'node:fs';
import zh from '../src/lib/zh';
const missing=new Map<string,string>();let checked=0;const dynamic:string[]=[];
/** Khóa tiếng Anh viết cứng, kể cả khi nằm trong ngoặc hoặc hai nhánh của toán tử ba ngôi. */
function keysOf(node:ts.Node):string[]|null{
 if(ts.isStringLiteralLike(node))return[node.text];
 if(ts.isParenthesizedExpression(node))return keysOf(node.expression);
 if(ts.isConditionalExpression(node)){const a=keysOf(node.whenTrue),b=keysOf(node.whenFalse);return a&&b?[...a,...b]:null;}
 return null;}
function walk(dir:string){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
 if(entry.name==='migrations')continue;const file=dir+'/'+entry.name;
 if(entry.isDirectory()){walk(file);continue;}
 if(!/\.tsx?$/.test(file)||file.endsWith('payload-types.ts'))continue;
 const source=ts.createSourceFile(file,fs.readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true);
 function visit(node:ts.Node){if(ts.isCallExpression(node)&&node.expression.getText(source)==='t'&&node.arguments.length>=3){
  const keys=keysOf(node.arguments[2]);
  if(!keys)dynamic.push(file+':'+(source.getLineAndCharacterOfPosition(node.getStart()).line+1));
  else for(const key of keys){checked++;if(!zh[key]?.trim())missing.set(key,file);}}
 ts.forEachChild(node,visit);}visit(source);
}}
walk('src');
if(missing.size){console.error('Missing Chinese UI translations:',Object.fromEntries(missing));process.exitCode=1;}else console.log(`${checked} static translation calls checked; no missing Chinese UI entries.`);
// Chuỗi dựng lúc chạy không kiểm tra tĩnh được; liệt kê để rà thủ công, không chặn.
if(dynamic.length)console.log(`${dynamic.length} call(s) build their English string at runtime and are not covered:\n  ${dynamic.join('\n  ')}`);
