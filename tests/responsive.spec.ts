import {test,expect} from '@playwright/test';
const sizes=[320,390,600,768,900,1024,1440,1920,2560,3840];
for(const width of sizes){
 test(`responsive layout at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:1000});
  for(const route of ['','contact','consultation','lawyers','guide','privacy','services','search?q=dau']){
   const response=await page.goto('/vi'+(route?'/'+route:''));expect(response?.status()).toBe(200);
   await page.evaluate(()=>document.fonts.ready);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),route+' horizontal overflow').toBeTruthy();
   const grid=page.locator('.content-grid').first();
   if(await grid.count()){
    const first=await grid.locator(':scope > :first-child').boundingBox();
    expect(first!.width,route+' readable main column').toBeGreaterThan(width>=1024?450:Math.min(240,width-60));
    if(width<=900){const second=await grid.locator(':scope > :nth-child(2)').boundingBox();if(second)expect(second.y).toBeGreaterThanOrEqual(first!.y+first!.height-1);}
   }
   if(route==='contact'&&(width===390||width===2560))await page.screenshot({path:`artifacts/contact-fixed-${width}.jpg`,fullPage:true,type:'jpeg',quality:75,scale:'css'});
  }
 });
}
