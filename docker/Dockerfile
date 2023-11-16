FROM node:18.14.0-alpine

RUN mkdir /app
COPY . /app
WORKDIR /app

ARG endpoint_url
ARG web_server_url
ARG case_bank_url
ARG ex_api_dir
ARG ex_web_dir
ARG invitation_url
ENV ENDPOINT_URL=$endpoint_url
ENV WEB_SERVER_URL=$web_server_url
ENV CASE_BANK_URL=$case_bank_url
ENV EX_WEB_DIR=$ex_web_dir
ENV EX_API_DIR=$ex_api_dir
ENV INVITATION_URL=$invitation_url

RUN npm ci --ignore-scripts
RUN npm run build --ignore-scripts
RUN npm ci --production --ignore-scripts

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
