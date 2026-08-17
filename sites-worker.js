export default {
  async fetch(request, env) {
    const directResponse = await env.ASSETS.fetch(request)
    if (directResponse.status !== 404) return directResponse

    const url = new URL(request.url)
    if (url.pathname.startsWith("/assets/")) {
      const assetUrl = new URL(request.url)
      assetUrl.pathname = `/dist${url.pathname}`
      const assetResponse = await env.ASSETS.fetch(new Request(assetUrl, request))
      if (assetResponse.status !== 404) return assetResponse
    }

    const indexUrl = new URL(request.url)
    indexUrl.pathname = "/index.html"
    indexUrl.search = ""
    return env.ASSETS.fetch(new Request(indexUrl, request))
  },
}
