<script>
  import { afterUpdate } from 'svelte'
  export let hashParam = ""
  export let tvChannelData = []
  let channel
  let sidebarOpen = false
  afterUpdate(() => {
    channel = tvChannelData.filter((channel) => {
      return channel.id == hashParam
    })
    channel = channel[0]
  })
</script>

<div class="w-screen h-screen flex flex-row">
  {#if sidebarOpen}
    <div class="w-60 h-full shadow-md bg-white px-1 absolute">
      <ul class="relative">
        {#each tvChannelData as channel}
          <li class="relative">
            <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href={"#/tvchannel/" + channel.id} data-mdb-ripple="true" data-mdb-ripple-color="dark">{channel.name}</a>
          </li>
        {/each}
      </ul>
    </div>
  {/if}

  {#if channel}
    <div class="flex flex-col flex-1">
      <h1 class="text-3xl">{channel.name}</h1>
      <div class="flex space-x-2 justify-end">
        <button on:click={() => sidebarOpen = !sidebarOpen} type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Sidebar</button>
      </div>
      {#if channel.type == "yt"}
        <iframe class="w-full h-full" width="560" height="315" src="https://www.youtube-nocookie.com/embed/{channel.videoId}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      {/if}
      {#if channel.type == "ytlist"}
        <iframe class="w-full h-full" width="560" height="315" src="https://www.youtube-nocookie.com/embed/videoseries?list={channel.videoListId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      {/if}
    </div>
  {/if}
</div>