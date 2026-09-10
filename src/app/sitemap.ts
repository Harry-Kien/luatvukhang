import type {MetadataRoute} from 'next';
import {launched,navigation,locales} from '@/lib/content';
import {getRecords} from '@/lib/cms';
import {siteUrl} from '@/lib/seo';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
 if(!launched)return [];
 const result:MetadataRoute.Sitemap=[];
 const url=(locale:string,path:string)=>`${siteUrl}/${locale}${path?'/'+path:''}`;
 for(const locale of locales){
  for(const path of ['',...navigation.map(n=>n[0]),'industries','careers','guide','consultation','privacy','terms'])result.push({url:url(locale,path),alternates:{languages:{...Object.fromEntries(locales.map(l=>[l==='zh'?'zh-Hans':l,url(l,path)])),'x-default':url('vi',path)}}});
  for(const collection of ['services','industries','lawyers','experience','articles','careers']){
   const groups=await Promise.all(locales.map(async l=>({locale:l,records:await getRecords(collection,l)})));
   for(const record of groups.find(g=>g.locale===locale)!.records){
    const languages:Record<string,string>={};
    for(const group of groups){const twin=group.locale===locale?record:record.translationKey?group.records.find(r=>r.translationKey===record.translationKey):null;if(twin)languages[group.locale==='zh'?'zh-Hans':group.locale]=url(group.locale,collection+'/'+twin.slug);}
    if(languages.vi)languages['x-default']=languages.vi;
    result.push({url:url(locale,collection+'/'+record.slug),lastModified:record.updatedAt,alternates:{languages}});
   }
  }
 }
 return result;
}
