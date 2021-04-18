FROM node:alpine AS build
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run-script build

FROM node:slim
WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/package*.json ./
COPY --from=build /app/next.config.js ./
COPY --from=build /app/public public
COPY --from=build /app/node_modules node_modules

EXPOSE 3000
CMD ["npm", "run", "start"]
