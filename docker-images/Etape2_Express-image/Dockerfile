FROM node:18.12.1

COPY src /opt/app

# Port for http (web interface)
EXPOSE 2022

WORKDIR /opt/app

RUN npm install

CMD ["node", "/opt/app/index.js"]