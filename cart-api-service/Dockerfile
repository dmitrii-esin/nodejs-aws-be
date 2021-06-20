# Stage 1: Building the code
FROM node:lts-alpine@sha256:5edad160011cc8cfb69d990e9ae1cb2681c0f280178241d58eba05b5bfc34047 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build && npm prune --production
# Stage 2: And then copy over node_modules, etc from that stage to the smaller base image
FROM node:lts-slim@sha256:f07d995a6b0bb73e3bd8fa42ba328dd0481f4f0a4c0c39008c05d91602bba6f1 as production
USER node
ARG PORT
ENV NODE_ENV=production
WORKDIR /app
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
EXPOSE $PORT
ENTRYPOINT [ "node" ]
CMD [ "dist/main.js" ]
