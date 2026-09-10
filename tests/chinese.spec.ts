import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {consultationSchema} from '../src/lib/consultation';
import {languageAlternates} from '../src/lib/seo';
test('Chinese pages, navigation, form and layout',async({page},info)=>{
 for(const route of ['','about','services','lawyers','articles','contact','consultation','guide','privacy','terms','industries','careers']){
 const r=await page.goto('/zh'+(route?'/'+route:''));expect(r?.status()).toBe(200);await expect(page.locator('html')).toHaveAttribute('lang','zh-Hans');await expect(page.locator('h1')).toContainText(/[\u4e00-\u9fff]/);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
 }
 await page.goto('/zh/guide');await expect(page.getByRole('heading',{name:'准备背景'})).toBeVisible();
 await page.goto('/zh/consultation');await expect(page.getByLabel('姓名 *',{exact:true})).toBeVisible();
 expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa']).analyze()).violations).toEqual([]);
 await page.route('**/api/consultation',async route=>{expect(route.request().postDataJSON().language).toBe('zh');await route.fulfill({status:201,contentType:'application/json',body:JSON.stringify({reference:'QA-ZH'})});});
 await page.locator('#name').fill('测试用户');await page.locator('#email').fill('qa@example.invalid');await page.locator('#message').fill('这是用于测试中文咨询表单的数据，不是真实的咨询申请。');await page.locator('input[type=checkbox]').check();await page.getByRole('button',{name:/提交申请/}).click();await expect(page.getByRole('status')).toContainText('已收到并保存申请 QA-ZH');
 await page.goto('/vi/about');await page.getByRole('link',{name:'中文',exact:true}).click();await expect(page).toHaveURL(/\/zh\/about$/);await page.getByRole('link',{name:'EN',exact:true}).click();await expect(page).toHaveURL(/\/en\/about$/);
 await page.goto('/zh');await page.screenshot({path:`artifacts/chinese-${info.project.name}.jpg`,type:'jpeg',quality:75,scale:'css'});
});
test('Chinese accepted by server validation and hreflang helper',()=>{
 expect(consultationSchema.safeParse({name:'测试',email:'qa@example.invalid',phone:'',service:'',message:'这是测试数据，这是测试数据，这是测试数据。',consent:true,language:'zh',website:'',preferredDate:'',idempotencyKey:crypto.randomUUID()}).success).toBeTruthy();expect(languageAlternates({vi:'/vi',zh:'/zh'})).toMatchObject({'zh-Hans':'/zh'});
});


