FROM node:12
RUN npm install -g typescript
COPY . /
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start"]