export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  // return a list of URLs to prerender at build time
  async prerender() {
    return ['/', '/projects/sale-and-rental-listings']
  }
}
