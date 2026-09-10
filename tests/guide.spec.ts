import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('client guide FAQ and enquiry links',async({page})=>{
 for(const locale of ['vi','en']){
  const r=await page.goto(`/${locale}/guide`);expect(r?.status()).toBe(200);
  await expect(page.locator('h1')).toHaveText(locale==='vi'?'Hướng dẫn khách hàng':'Client guide');
  await page.locator('.faq-list summary').first().click();
  await expect(page.locator('.faq-list details').first()).toHaveAttribute('open','');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa']).analyze()).violations).toEqual([]);
  await page.locator('aside a.button').click();await expect(page).toHaveURL(new RegExp(`/${locale}/consultation$`));
 }
});
