import * as migration_20260911_142959_initial_sqlite from './20260911_142959_initial_sqlite';
import * as migration_20260914_103930_giao_dien_website from './20260914_103930_giao_dien_website';
import * as migration_20260914_105733_co_ban_dich_may from './20260914_105733_co_ban_dich_may';

export const migrations = [
  {
    up: migration_20260911_142959_initial_sqlite.up,
    down: migration_20260911_142959_initial_sqlite.down,
    name: '20260911_142959_initial_sqlite',
  },
  {
    up: migration_20260914_103930_giao_dien_website.up,
    down: migration_20260914_103930_giao_dien_website.down,
    name: '20260914_103930_giao_dien_website',
  },
  {
    up: migration_20260914_105733_co_ban_dich_may.up,
    down: migration_20260914_105733_co_ban_dich_may.down,
    name: '20260914_105733_co_ban_dich_may'
  },
];
