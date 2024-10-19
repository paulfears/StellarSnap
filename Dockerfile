FROM node:alpine
WORKDIR /app
COPY package.json ./package.json
RUN yarn
COPY . .
RUN yarn build
EXPOSE 5173
EXPOSE 8080
CMD ["yarn", "start"]