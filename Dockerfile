FROM node:20-slim
RUN corepack enable
RUN corepack prepare pnpm@9 --activate

WORKDIR /app
COPY .npmrc package.json pnpm-lock.yaml pnpm-workspace.yaml next.config.mjs ./
COPY ./packages /app/packages

RUN pnpm install

CMD [ "pnpm", "dev" ]