/** Repair only the exact obsolete generated Chinese introduction; preserve edited copy. */
import {getPayload} from 'payload';
import config from '../src/payload.config';
import {pageContent} from './content/pages';
const cms=await getPayload({config});
try {
 const admin=(await cms.find({collection:'users',where:{role:{equals:'admin'}},limit:1})).docs[0];
 if(!admin) throw new Error('Administrator required.');
 const correct=pageContent.find(page=>page.slug==='about')!.summary.zh;
 const obsolete=correct.replace('Vũ Khang','遇安（Vũ Khang）');
 const {docs}=await cms.find({collection:'pages',where:{and:[{slug:{equals:'about'}},{language:{equals:'zh'}}]},draft:true,limit:1});
 const record=docs[0];
 if(record?.summary===obsolete){
  await cms.update({collection:'pages',id:record.id,user:admin,draft:record._status!=='published',data:{summary:correct}});
  console.log('Corrected generated brand name; publication status preserved.');
 } else console.log('No obsolete generated copy; existing editorial content preserved.');
} finally {await cms.destroy();}
process.exit(0);
