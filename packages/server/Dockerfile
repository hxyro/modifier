# Install deps
FROM node:18-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json ./
RUN yarn install

# Install production deps
FROM node:18-alpine AS prod-deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY --from=deps /app/package.json ./package.json
RUN yarn
RUN npm prune --production

# build 
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Production image
FROM node:18-alpine AS prod
WORKDIR /app
ENV NODE_ENV production
RUN apk add --no-cache curl
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 xd

COPY --from=builder --chown=xd:nodejs /app/build ./build

COPY --from=prod-deps --chown=xd:nodejs /app/node_modules ./node_modules
USER xd
EXPOSE 5001
ENV PORT 5001
CMD ["node", "build/index.js"]
