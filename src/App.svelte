<script>
  import { beautify_hash } from "./lib/hashRouter"
  import NotFound from "./pages/NotFound.svelte"
  import Index from "./pages/Index.svelte"
  import TvChannel from "./pages/TvChannel.svelte"

  import tvChannelData from "./assets/tvchannel-data.json"
  let page
  let hashParam
  const redirect_hash = (from, to) => {
    from = beautify_hash(from)
    to = beautify_hash(to)
    let hash = beautify_hash(location.hash)
    if (hash == from) {
      location.hash = to
    }
  }
  const check_first_level_dynamic_route = (routeName, dynamicPage, rootPageFunction) => {
    if (location.hash.split("/")[1] == routeName){
      if (location.hash.split("/")[2]){
        hashParam = location.hash.split("/")[2]
        page = dynamicPage
      } else {
        hashParam = ""
        rootPageFunction()
      }
    }
  }
  const check_static_route = (routeName, rootPage) => {
    let assignHash = beautify_hash(routeName)
    let hash = beautify_hash(location.hash)
    if (hash == assignHash){
      page = rootPage
    }
  }
  const routeChange = () => {
    redirect_hash("","#/tvchannel/")
    redirect_hash("#/","#/tvchannel/")
    page = NotFound
    check_first_level_dynamic_route("tvchannel", TvChannel, () => {location.hash = "#/tvchannel/1"})
  }
  routeChange()
</script>

<svelte:window on:hashchange={routeChange} />

<svelte:component this={page} {hashParam} {tvChannelData} />