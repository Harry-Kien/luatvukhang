import * as migration_20260908_102543_initial from './20260908_102543_initial';
import * as migration_20260908_151554_content_completion from './20260908_151554_content_completion';
import * as migration_20260910_010919_chinese_locale from './20260910_010919_chinese_locale';

export const migrations = [
  {
    up: migration_20260908_102543_initial.up,
    down: migration_20260908_102543_initial.down,
    name: '20260908_102543_initial',
  },
  {
    up: migration_20260908_151554_content_completion.up,
    down: migration_20260908_151554_content_completion.down,
    name: '20260908_151554_content_completion',
  },
  {
    up: migration_20260910_010919_chinese_locale.up,
    down: migration_20260910_010919_chinese_locale.down,
    name: '20260910_010919_chinese_locale'
  },
];
