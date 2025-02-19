FROM node:22.14-alpine3.21 AS pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN ["npm", "i", "-g", "corepack@latest"]
RUN ["corepack", "enable", "pnpm"]
RUN ["corepack", "use", "pnpm@latest-10"]
COPY package.json pnpm-lock.yaml /app/
WORKDIR /app

FROM pnpm AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store ["pnpm", "install", "--frozen-lockfile"]
COPY . /app
RUN ["pnpm", "build"]

FROM pnpm AS prod
RUN --mount=type=cache,id=pnpm,target=/pnpm/store ["pnpm", "install", "--prod", "--frozen-lockfile"]

FROM pnpm
COPY --from=build /app/dist /app/dist
COPY --from=prod /app/node_modules /app/node_modules
EXPOSE 3000
CMD ["pnpm", "start:prod"]
