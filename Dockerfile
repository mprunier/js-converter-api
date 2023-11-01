FROM node:22.11.0

WORKDIR /app

COPY node_modules ./node_modules
COPY dist ./dist

EXPOSE 3000

CMD ["node", "dist/app.js"]