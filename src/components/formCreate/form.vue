<template>
  <v-main>
    <v-container fluid>
      <v-form>
        <v-row>
          <v-col cols="12" md="4" xs="12">
          <AccountName  :logo_url="infoAccount.logo_url" :account_name="infoAccount.account_name" :username="infoAccount.username" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" xs="12">
            <v-text-field outlined label="Name" v-model="name"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6" xs="12">
            <v-text-field
              label="password"
              v-model="password"
              :append-icon="icon ? 'mdi-eye-off' : 'mdi-eye'"
              :type="icon ? 'password' : 'text'"
              outlined
              class="pa-2"
              @click:append="icon = !icon"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6" xs="12">
            <div>
              <v-btn outlined text class="ma-2">Generate</v-btn>
              <v-btn outlined text>Copy</v-btn>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6" xs="12">
            <v-text-field outlined class="pa-2" label="Site URL" v-model="site"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" xs="12"> </v-col>
        </v-row>
        <v-alert
          >Create at
          <p>
            {{ infoAccount.created_at | dateParse(infoAccount.created_at) }}
          </p>
        </v-alert>
        <div>
          <v-btn
            color="error"
            class="ma-2 white--text"
            @click="loader = 'loading3'"
          >
            Delete
            <v-icon right dark> mdi-delete </v-icon>
          </v-btn>
        </div>
      </v-form>
    </v-container>
  </v-main>
</template>

<script>
import AccountName from "../accountName/accountName";
import moment from "moment";

export default {
  components: {
    AccountName,
  },
  props: {
    infoAccount: {
      type: Object,
      required: false,
      default: {},
    },
  },
  data() {
    return {
      icon: true,
      password: "",
      name: "",
      site: "",
      dataInforAccount: [],
    };
  },
  mounted() {
    this.startData()
  },
  methods:{
    startData(){
    this.dataInforAccount =  this.$store.getters.get_infoAccount
    this.password = this.dataInforAccount.password;
    this.name = this.dataInforAccount.account_name;
    this.site = this.dataInforAccount.site_url
    }
  },
  filters: {
    dateParse(value) {
      return moment(value).format("MMMM Do YYYY, h:mm:ss a");
    },
  },
};
</script>

<style>
</style>