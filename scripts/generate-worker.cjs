const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const read = (filePath) => fs.readFileSync(path.join(root, filePath));

let html = read("dist/index.html").toString("utf8");
const css = read("dist/assets/index-D7zd7PvC.css").toString("utf8");
const js = read("dist/assets/index-BLWHJ9y2.js").toString("utf8");
const hero =
  "data:image/png;base64," +
  read("dist/assets/hero-business-system-BkP6gHng.png").toString("base64");
const logo =
  "data:image/png;base64," +
  read("dist/assets/rj-digital-solutions-logo-transparent-CNzm6FDg.png").toString("base64");
const faviconSvg = read("dist/assets/favicon-BABP3Hd6.svg").toString("utf8");
const favicon =
  "data:image/svg+xml;base64," + Buffer.from(faviconSvg, "utf8").toString("base64");

html = html
  .replace(
    /<link rel="icon" href="\/assets\/favicon-[^"]+" type="image\/svg\+xml">/,
    `<link rel="icon" href="${favicon}" type="image/svg+xml">`,
  )
  .replace(
    /<link rel="preload" href="\/assets\/hero-business-system-[^"]+" as="image" fetchpriority="high">/,
    `<link rel="preload" href="${hero}" as="image" fetchpriority="high">`,
  )
  .replace(
    /<script type="module" crossorigin src="\/assets\/index-[^"]+\.js"><\/script>/,
    `<script type="module">\n${js}\n</script>`,
  )
  .replace(
    /<link rel="stylesheet" crossorigin href="\/assets\/index-[^"]+\.css">/,
    `<style>\n${css}\n</style>`,
  )
  .replaceAll(/\/assets\/hero-business-system-[A-Za-z0-9]+\.png/g, hero)
  .replaceAll(/\/assets\/rj-digital-solutions-logo-transparent-[A-Za-z0-9]+\.png/g, logo);

const worker = `const HTML = ${JSON.stringify(html)};
const FAVICON = ${JSON.stringify(faviconSvg)};

function htmlResponse() {
  return new Response(HTML, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=60",
    },
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/favicon.ico" || url.pathname === "/assets/favicon.svg") {
      return new Response(FAVICON, {
        headers: {
          "content-type": "image/svg+xml; charset=utf-8",
          "cache-control": "public, max-age=31536000, immutable",
        },
      });
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", { status: 405 });
    }

    return htmlResponse();
  },
};
`;

fs.writeFileSync(path.join(root, "sites-worker.js"), worker);
fs.writeFileSync(path.join(root, "dist/server/index.js"), worker);
