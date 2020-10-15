<template>
  <div id="app">
    <div id="nav">
      <Home/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Home from "@/views/Home";
export default {
  components:{
    Home
  },
  data: () => ({
    cards: ['Today', 'Yesterday'],
      drawer: null,
      links: [
        ['mdi-inbox-arrow-down', 'Inbox'],
        ['mdi-send', 'Send'],
        ['mdi-delete', 'Trash'],
        ['mdi-alert-octagon', 'Spam'],
      ],
  }),
};
</script>
