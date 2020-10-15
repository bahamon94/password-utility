<template>
  <v-app id="inspire">
    <v-navigation-drawer width="400px"  absolute app>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-text-field class="pt-2" outlined label="Prepend inner" prepend-inner-icon="mdi-map-marker"></v-text-field>
        </v-list-item>
      </template>
     
      <v-list>
        <v-list-item v-for="n in 13" :key="n" link>
          <AccountName/>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="py-8 px-6" fluid>
      <v-form ref="form"  v-model="valid"  lazy-validation>
        <v-text-field
            outlined
          ></v-text-field>
      </v-form>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src
import AccountName from '@/components/accountName/accountName.vue'

export default {
  name: 'Home',
  components: {
    AccountName
  }
}
</script>
