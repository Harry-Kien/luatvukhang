import {getPayload} from 'payload';import config from '../src/payload.config';import {zhPolicies} from '../src/lib/zh-content';
const cms=await getPayload({config});
const user=(await cms.find({collection:'users',where:{role:{equals:'admin'}},limit:1})).docs[0];
for(const [slug,title] of [['home','深入理解问题，审慎作出决定。'],['about','关于 Vũ Khang'],['contact','联系'],['privacy','隐私政策'],['terms','使用条款']]){
 const existing=await cms.count({collection:'pages',where:{and:[{language:{equals:'zh'}},{slug:{equals:slug}}]}});if(existing.totalDocs)continue;
 const sections=slug==='privacy'||slug==='terms'?zhPolicies[slug]:[];
 await cms.create({collection:'pages',user,draft:true,data:{title,slug,translationKey:slug,language:'zh',summary:'中文内容草案 — 正式发布前须经审核。',reviewState:'working',_status:'draft',blocks:sections.map(([heading,body])=>({blockType:'callout' as const,heading,body,visible:true}))}});
 console.log('Created Chinese draft:',slug);
}
await cms.destroy();process.exit();

