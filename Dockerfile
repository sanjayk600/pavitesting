# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["nodemon", "backend/index.js"]
CMD ["cd" , "frontend"]
CMD ["npm run", "start"]
EXPOSE 3000