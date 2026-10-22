import * as migration_20260911_142959_initial_sqlite from './20260911_142959_initial_sqlite';
import * as migration_20260914_103930_giao_dien_website from './20260914_103930_giao_dien_website';
import * as migration_20260914_105733_co_ban_dich_may from './20260914_105733_co_ban_dich_may';
import * as migration_20260916_043812_giao_dien_mang_theo_ngon_ngu from './20260916_043812_giao_dien_mang_theo_ngon_ngu';
import * as migration_20260916_120420_them_vai_tro_doi_ngu from './20260916_120420_them_vai_tro_doi_ngu';
import * as migration_20260920_145122_them_theo_doi_yeu_cau from './20260920_145122_them_theo_doi_yeu_cau';
import * as migration_20261022_015132_them_so_zalo_bo_sung from './20261022_015132_them_so_zalo_bo_sung';
import * as migration_20261022_052130_khoi_thu_tu_doi_ngu_he_sinh_thai from './20261022_052130_khoi_thu_tu_doi_ngu_he_sinh_thai';

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
    name: '20260914_105733_co_ban_dich_may',
  },
  {
    up: migration_20260916_043812_giao_dien_mang_theo_ngon_ngu.up,
    down: migration_20260916_043812_giao_dien_mang_theo_ngon_ngu.down,
    name: '20260916_043812_giao_dien_mang_theo_ngon_ngu',
  },
  {
    up: migration_20260916_120420_them_vai_tro_doi_ngu.up,
    down: migration_20260916_120420_them_vai_tro_doi_ngu.down,
    name: '20260916_120420_them_vai_tro_doi_ngu',
  },
  {
    up: migration_20260920_145122_them_theo_doi_yeu_cau.up,
    down: migration_20260920_145122_them_theo_doi_yeu_cau.down,
    name: '20260920_145122_them_theo_doi_yeu_cau',
  },
  {
    up: migration_20261022_015132_them_so_zalo_bo_sung.up,
    down: migration_20261022_015132_them_so_zalo_bo_sung.down,
    name: '20261022_015132_them_so_zalo_bo_sung',
  },
  {
    up: migration_20261022_052130_khoi_thu_tu_doi_ngu_he_sinh_thai.up,
    down: migration_20261022_052130_khoi_thu_tu_doi_ngu_he_sinh_thai.down,
    name: '20261022_052130_khoi_thu_tu_doi_ngu_he_sinh_thai'
  },
];
