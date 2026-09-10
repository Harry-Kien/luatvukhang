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

stamp=$(date +%Y%m%d-%H%M%S)
mkdir -p "$DEST"
chmod 700 "$DEST"

# -Fc là định dạng nén của pg_restore, phục hồi chọn lọc được từng bảng.
pg_dump --format=custom --no-owner --file="$DEST/db-$stamp.dump" "$DATABASE_URL"

# Ảnh đã tải lên không nằm trong cơ sở dữ liệu; mất thư mục này thì nội dung
# hiển thị vẫn còn nhưng ảnh hỏng hết.
if [ -d "$APP_DIR/media" ]; then
  tar -czf "$DEST/media-$stamp.tar.gz" -C "$APP_DIR" media
fi

chmod 600 "$DEST"/*-"$stamp".* 2>/dev/null || true
find "$DEST" -type f -mtime "+$KEEP_DAYS" -delete

echo "$(date -Is) sao luu xong: $DEST/db-$stamp.dump"
