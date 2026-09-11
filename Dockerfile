# Ảnh chạy production cho website.
#
# Dùng bookworm-slim chứ không dùng alpine: sharp cần thư viện ảnh gốc, bản
# dựng sẵn cho glibc ổn định hơn cho musl.
#
# Migration KHÔNG chạy khi khởi động container. Nhiều bản sao cùng khởi động sẽ
# cùng chạy migration một lúc. Hãy chạy như một bước phát hành riêng:
#   docker run --rm --env-file .env <image> npm run payload -- migrate
#
# Tệp tải lên nằm ở /app/media. Gắn volume hoặc chuyển sang object storage,
# nếu không mỗi lần triển khai lại sẽ mất toàn bộ ảnh đã tải lên.

FROM node:24-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts=false

FROM node:24-bookworm-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Bản dựng nhúng sẵn các biến NEXT_PUBLIC_*, nên phải truyền vào lúc dựng ảnh
# chứ không phải lúc chạy. Giá trị mặc định ở đây chỉ để lệnh build chạy được;
# hãy truyền --build-arg với giá trị thật khi dựng ảnh phát hành.
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ARG NEXT_PUBLIC_DEMO_MODE=false
ARG NEXT_PUBLIC_ANALYTICS_ID=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_DEMO_MODE=$NEXT_PUBLIC_DEMO_MODE \
    NEXT_PUBLIC_ANALYTICS_ID=$NEXT_PUBLIC_ANALYTICS_ID
RUN npm run build

FROM node:24-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000
# Không chạy bằng quyền root: node:24 đã có sẵn người dùng "node".
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/.next ./.next
COPY --from=build --chown=node:node /app/public ./public
COPY --from=build --chown=node:node /app/src ./src
COPY --from=build --chown=node:node /app/package.json ./package.json
COPY --from=build --chown=node:node /app/next.config.mjs ./next.config.mjs
COPY --from=build --chown=node:node /app/tsconfig.json ./tsconfig.json
# Thư mục tải lên phải tồn tại và thuộc quyền người dùng chạy ứng dụng.
# Thư mục tải lên và thư mục chứa cơ sở dữ liệu SQLite phải tồn tại và thuộc
# quyền người dùng chạy ứng dụng. Cả hai đều cần gắn volume, nếu không mỗi lần
# triển khai lại sẽ mất ảnh biên tập viên đã tải và toàn bộ dữ liệu.
RUN mkdir -p /app/media /app/.local && chown node:node /app/media /app/.local
USER node
EXPOSE 3000
# Hạ tầng nên dùng /api/health/ready để quyết định khi nào đưa bản sao vào phục
# vụ; HEALTHCHECK ở đây để chạy bằng docker run hoặc compose cũng có tín hiệu.
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/api/health/ready').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["npm", "start"]
