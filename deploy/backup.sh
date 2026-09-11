#!/usr/bin/env bash
# Sao lưu cơ sở dữ liệu và thư mục ảnh.
#
#   sudo cp deploy/backup.sh /usr/local/bin/luatvukhang-backup
#   sudo chmod +x /usr/local/bin/luatvukhang-backup
#   sudo crontab -e
#   15 2 * * * /usr/local/bin/luatvukhang-backup >> /var/log/luatvukhang-backup.log 2>&1
#
# Bản sao lưu chứa dữ liệu khách hàng và hash mật khẩu. Đặt quyền chặt, và đưa
# một bản ra khỏi máy chủ này — sao lưu nằm cùng ổ đĩa với dữ liệu gốc thì không
# cứu được gì khi ổ đĩa hỏng.
#
# Sao lưu chỉ có giá trị khi đã thử phục hồi. Xem docs/OPERATIONS.md.
set -euo pipefail

APP_DIR=${APP_DIR:-/srv/luatvukhang}
DEST=${DEST:-/var/backups/luatvukhang}
KEEP_DAYS=${KEEP_DAYS:-14}

# shellcheck disable=SC1091
set -a
source "$APP_DIR/.env"
set +a

if [ -z "${DATABASE_URL:-}" ]; then
  echo "Thieu DATABASE_URL trong $APP_DIR/.env" >&2
  exit 1
fi

# SQLite là một tệp; DATABASE_URL có dạng file:/duong/dan/law.db.
if [ "${DATABASE_URL#file:}" = "$DATABASE_URL" ]; then
  echo "DATABASE_URL phai bat dau bang file: — hien tai: $DATABASE_URL" >&2
  exit 1
fi
DB_FILE=${DATABASE_URL#file:}
[ "${DB_FILE#/}" = "$DB_FILE" ] && DB_FILE="$APP_DIR/$DB_FILE"

if [ ! -f "$DB_FILE" ]; then
  echo "Khong thay co so du lieu tai $DB_FILE" >&2
  exit 1
fi

stamp=$(date +%Y%m%d-%H%M%S)
mkdir -p "$DEST"
chmod 700 "$DEST"

# KHÔNG dùng `cp`. Website vẫn đang chạy, và SQLite ở chế độ WAL giữ một phần
# dữ liệu mới trong tệp -wal chưa nhập vào tệp chính; chép thẳng sẽ ra một bản
# rách mà chỉ lúc cần phục hồi mới phát hiện.
#
# `VACUUM INTO` là cách sao lưu trực tuyến của chính SQLite: nó đọc trong một
# giao dịch nên bản ra luôn nhất quán, và đã gộp sẵn WAL.
if command -v sqlite3 >/dev/null 2>&1; then
  sqlite3 "$DB_FILE" "VACUUM INTO '$DEST/db-$stamp.db'"
else
  # sqlite3 hay thiếu trên hosting dùng chung. Thư viện của chính ứng dụng làm
  # được việc tương đương, và nó chắc chắn đã được cài.
  # `cd` vào thư mục ứng dụng: `node -e` tìm module theo thư mục hiện hành, và
  # cron chạy script này từ thư mục nhà của root.
  ( cd "$APP_DIR" && DB_FILE="$DB_FILE" OUT_FILE="$DEST/db-$stamp.db" node -e '
    const { createClient } = require("@libsql/client");
    createClient({ url: "file:" + process.env.DB_FILE })
      .execute({ sql: "VACUUM INTO ?", args: [process.env.OUT_FILE] })
      .then(() => process.exit(0))
      .catch((error) => {
        console.error(String((error && error.message) || error));
        process.exit(1);
      });
  ' )
fi

# Ảnh đã tải lên không nằm trong cơ sở dữ liệu; mất thư mục này thì nội dung
# hiển thị vẫn còn nhưng ảnh hỏng hết.
if [ -d "$APP_DIR/media" ]; then
  tar -czf "$DEST/media-$stamp.tar.gz" -C "$APP_DIR" media
fi

chmod 600 "$DEST"/*-"$stamp".* 2>/dev/null || true
find "$DEST" -type f -mtime "+$KEEP_DAYS" -delete

echo "$(date -Is) sao luu xong: $DEST/db-$stamp.db"
