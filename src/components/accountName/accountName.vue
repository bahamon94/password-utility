<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
      <v-avatar class="profile mr-2" color="grey" tile>
        <v-img :src="logo_url"></v-img>
      </v-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">
          {{ account_name }}
        </v-list-item-title>
        <v-list-item-subtitle>{{ username }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>
export default {
  props: {
    logo_url: {
      type: String,
      required: false,
      default: '',
    },
    account_name: {
      type: String,
      required: false,
      default: '',
    },
    username: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>