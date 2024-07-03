FROM node:18 as build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

ENV REACT_APP_FIREBASE_KEY=xxx

ENV REACT_APP_FIREBASE_DOMAIN=xxx

ENV REACT_APP_FIREBASE_PROJECT_ID=xxx

ENV REACT_APP_FIREBASE_STORAGE_BUCKET=xxx

ENV REACT_APP_FIREBASE_APP_ID=xxx

ENV REACT_APP_FIREBASE_BUCKET_URL=xxx

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]