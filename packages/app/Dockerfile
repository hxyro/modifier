# Install deps & build 
FROM node:18-alpine AS builder
ENV NODE_ENV=production
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json yarn.lock* package-lock.json* ./
RUN yarn install
COPY . .
RUN yarn build

# Production image
FROM nginx:1.23-alpine AS prod
WORKDIR /app
ENV NODE_ENV production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
ENV PORT 80
CMD [ "nginx", "-g", "daemon off;" ]
