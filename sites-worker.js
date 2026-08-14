export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request)
    if (response.status !== 404) return response

    const indexUrl = new URL(request.url)
    indexUrl.pathname = "/index.html"
    indexUrl.search = ""
    return env.ASSETS.fetch(new Request(indexUrl, request))
  },
}
