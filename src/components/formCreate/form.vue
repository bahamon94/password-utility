<template>
  <v-main>
    <v-container fluid>
      <v-form>
        <v-row>
          <v-col cols="12" md="4" xs="12">
          <AccountName  :logo_url="dataInforAccount.logo_url" :account_name="dataInforAccount.account_name" :username="dataInforAccount.username" />
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
            {{ dataInforAccount.created_at | dateParse(dataInforAccount.created_at)  }}
          </p>
        </v-alert>
        <div>
          <v-btn
            color="error"
            class="ma-2 white--text"
            @click="deleteAccount"
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
import utils from '@/mixins/utils'


export default {
  components: {
    AccountName,
  },
  mixins :[utils],
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
      idAccount: 0
    };
  },
  mounted() {
    this.startData()
  },
  methods:{
    deleteAccount(){
      this.$showAlertConfirm('Notificación','Are you sure you want delete user record').then((result) => {
        if (result) {
        this.$axios.delete(`/passwords/${this.idAccount}`)
        this.dataInforAccount = []
        this.$store.commit('set_infoAccount', [])
        this.startData()
        this.$showInfoSuccessNotify()
        this.updateListAccount()
        }
      })

    },
    updateListAccount(){
      console.log('update List');
      this.$emit('updateList')      
    },
    startData(){
      this.dataInforAccount =  this.$store.getters.get_infoAccount
      this.password = this.dataInforAccount.password
      this.name = this.dataInforAccount.account_name
      this.site = this.dataInforAccount.site_url
      this.idAccount = this.dataInforAccount.id
    }
  },
  filters: {
    dateParse(value) {
      return value ? moment(value).format("MMMM Do YYYY, h:mm:ss a") : ''
    },
  },
};
</script>

<style>
</style>