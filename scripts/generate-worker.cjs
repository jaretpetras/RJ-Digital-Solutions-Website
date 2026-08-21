const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const readText = (filePath) => fs.readFileSync(path.join(root, filePath), "utf8");
const readBase64 = (filePath) => fs.readFileSync(path.join(root, filePath)).toString("base64");

const css = readText("styles.css");
const mainJs = readText("script.js");
const proofJs = readText("proof.js");

const assets = {
  "/assets/favicon.svg": {
    contentType: "image/svg+xml; charset=utf-8",
    body: readText("assets/favicon.svg"),
    encoding: "text",
  },
  "/assets/rj-logo-rounded-square.svg": {
    contentType: "image/svg+xml; charset=utf-8",
    body: readText("assets/rj-logo-rounded-square.svg"),
    encoding: "text",
  },
  "/assets/rj-digital-solutions-logo-transparent.png": {
    contentType: "image/png",
    body: readBase64("assets/rj-digital-solutions-logo-transparent.png"),
    encoding: "base64",
  },
  "/assets/hero-business-system.png": {
    contentType: "image/png",
    body: readBase64("assets/hero-business-system.png"),
    encoding: "base64",
  },
  "/assets/lead-system-hero.png": {
    contentType: "image/png",
    body: readBase64("assets/lead-system-hero.png"),
    encoding: "base64",
  },
};

function prepareHtml(filePath, { includeProof = false } = {}) {
  return readText(filePath)
    .replace(
      /<link rel="stylesheet" href="styles\.css">/,
      `<style>\n${css}\n</style>`,
    )
    .replace(
      /<script src="script\.js" type="module"><\/script>/,
      `<script type="module">\n${mainJs}\n</script>`,
    )
    .replace(
      /<script src="proof\.js" type="module"><\/script>/,
      includeProof ? `<script type="module">\n${proofJs}\n</script>` : "",
    );
}

const pages = {
  "/": prepareHtml("index.html"),
  "/index.html": prepareHtml("index.html"),
  "/what-we-build": prepareHtml("what-we-build.html", { includeProof: true }),
  "/what-we-build.html": prepareHtml("what-we-build.html", { includeProof: true }),
};

const worker = `const PAGES = ${JSON.stringify(pages)};
const ASSETS = ${JSON.stringify(assets)};

function textResponse(body, contentType, cacheControl = "public, max-age=60") {
  return new Response(body, {
    headers: {
      "content-type": contentType,
      "cache-control": cacheControl,
    },
  });
}

function base64ToBytes(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", { status: 405 });
    }

    if (url.pathname === "/favicon.ico") {
      return textResponse(ASSETS["/assets/favicon.svg"].body, "image/svg+xml; charset=utf-8", "public, max-age=31536000, immutable");
    }

    const asset = ASSETS[url.pathname];
    if (asset) {
      const body = asset.encoding === "base64" ? base64ToBytes(asset.body) : asset.body;
      return new Response(body, {
        headers: {
          "content-type": asset.contentType,
          "cache-control": "public, max-age=31536000, immutable",
        },
      });
    }

    const page = PAGES[url.pathname] || PAGES[url.pathname.replace(/\\/$/, "")];
    if (page) {
      return textResponse(page, "text/html; charset=utf-8");
    }

    return textResponse(PAGES["/"], "text/html; charset=utf-8");
  },
};
`;

fs.mkdirSync(path.join(root, "dist", "server"), { recursive: true });
fs.writeFileSync(path.join(root, "sites-worker.js"), worker);
fs.writeFileSync(path.join(root, "dist", "server", "index.js"), worker);
