import {test,expect} from '@playwright/test';
test('health checks expose status only and are not cached',async({request})=>{
 const live=await request.get('/api/health/live');expect(live.status()).toBe(200);expect(await live.json()).toEqual({status:'ok'});
 const ready=await request.get('/api/health/ready');expect(ready.status()).toBe(200);expect(await ready.json()).toEqual({status:'ready'});
 for(const r of [live,ready]){expect(r.headers()['cache-control']).toContain('no-store');expect(r.headers()['x-robots-tag']).toContain('noindex');}
});
