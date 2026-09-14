import * as migration_20260911_142959_initial_sqlite from './20260911_142959_initial_sqlite';
import * as migration_20260914_103930_giao_dien_website from './20260914_103930_giao_dien_website';

export const migrations = [
  {
    up: migration_20260911_142959_initial_sqlite.up,
    down: migration_20260911_142959_initial_sqlite.down,
    name: '20260911_142959_initial_sqlite',
  },
  {
    up: migration_20260914_103930_giao_dien_website.up,
    down: migration_20260914_103930_giao_dien_website.down,
    name: '20260914_103930_giao_dien_website'
  },
];
