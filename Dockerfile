# Build recipe for the stdio bridge in mcp/. It carries no data and has no dependencies to
# install: the datasets live in this repository and the live tools are served over HTTPS, so the
# image only needs a Node runtime and one file. Nothing here is specific to how the hosted
# endpoint is operated — the single address it talks to is the public one.
FROM node:22-alpine
WORKDIR /app
COPY mcp/package.json mcp/index.js ./
LABEL io.modelcontextprotocol.server.name="com.frontdeskreview/front-desk-review-data"
CMD ["node", "index.js"]
