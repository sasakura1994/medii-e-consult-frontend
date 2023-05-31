FROM node:18.14.0-alpine

RUN mkdir /app
COPY . /app
WORKDIR /app

ARG endpoint_url
ARG web_server_url
ARG case_bank_url
ENV ENDPOINT_URL=$endpoint_url
ENV WEB_SERVER_URL=$web_server_url
ENV CASE_BANK_URL=$case_bank_url

RUN npm ci
RUN npm run build
RUN npm ci --production

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
