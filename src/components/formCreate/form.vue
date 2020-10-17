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
              id="inPwd"
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
              <v-btn @click="generatePassworsAut" outlined text class="ma-2">Generate</v-btn>
              <v-btn outlined text @click="copyInputPassword">Copy</v-btn>
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
        this.dataNull
        this.$showInfoSuccessNotify()
        this.updateListAccount()
        }
      })

    },
    suAccount(){
      console.log(this.idAccount);
      const dtoAccount = {
        "account_name": this.name,
        "username":this.dataInforAccount.username ,
        "password": this.password,
        "site_url": this.site,
        "logo_url": this.dataInforAccount.logo_url
      }
      if (this.idAccount != 0) {
        this.$axios.put(`passwords/${this.idAccount}`, dtoAccount)
      } else {
        this.$axios.post('passwords', dtoAccount)
        dtoAccount.created_at = Date.now()
      }
      this.dataNull()
      this.updateListAccount()
    },
    updateListAccount(){
      this.$emit('updateList')      
    },
    dataNull(){
      this.dataInforAccount = []
      this.$store.commit('set_infoAccount', [])
      this.startData()

    },
    startData(){
      this.dataInforAccount =  this.$store.getters.get_infoAccount
      this.password = this.dataInforAccount.password
      this.name = this.dataInforAccount.account_name
      this.site = this.dataInforAccount.site_url
      this.idAccount = this.dataInforAccount.id
    },
    generatePassworsAut(){
      this.password = this.$password_generator() 
    },
    copyInputPassword(){
      this.icon = !this.icon
      setTimeout(() => {
      let element = document.getElementById('inPwd')
      element.select()
      document.execCommand("Copy")
      this.icon = !this.icon
      }, 1);

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