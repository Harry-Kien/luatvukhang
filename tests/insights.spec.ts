import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
import {randomUUID} from 'node:crypto';
test('article library publishes and filters editorial records',async({request,page})=>{
 const password=(await fs.readFile('.local/admin-access.txt','utf8')).match(/Password: (.+)/)![1].trim();
 const login=await request.post('/api/users/login',{data:{email:'admin@local.invalid',password}});expect(login.ok()).toBeTruthy();const headers={Authorization:'JWT '+(await login.json()).token};
 const created:{collection:string;id:number}[]=[];
 const create=async(collection:string,data:any)=>{const key='qa-'+randomUUID();const r=await request.post(`/api/${collection}`,{headers,data:{title:'QA Nội dung kiểm thử',summary:'Bản ghi kiểm thử tự động được xóa sau khi kiểm tra.',slug:key,translationKey:key,language:'vi',reviewState:'approved',_status:'published',...data}});expect(r.ok()).toBeTruthy();const doc=(await r.json()).doc;created.push({collection,id:doc.id});return doc;};
 try{const category=await create('categories',{title:'QA Chủ đề'});const article=await create('articles',{title:'QA Hướng dẫn kiểm thử',categories:[category.id]});
 await page.goto('/vi/articles');await page.getByLabel('Tìm trong bài viết').fill('huong dan kiem thu');await page.getByLabel('Chủ đề',{exact:true}).selectOption(String(category.id));await page.getByRole('button',{name:'Tìm bài viết'}).click();await expect(page.locator('.insight-card')).toHaveCount(1);await expect(page.locator('.insight-card')).toContainText(article.title);
 expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa']).analyze()).violations).toEqual([]);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
 await page.locator('.insight-card h2 a').click();await expect(page.locator('h1')).toHaveText(article.title);
 }finally{for(const c of created.reverse())await request.delete(`/api/${c.collection}/${c.id}`,{headers});}
});
