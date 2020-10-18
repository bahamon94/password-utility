<template>
  <v-app id="inspire">
    <v-navigation-drawer width="400px" absolute app>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-text-field
            class="pt-2"
            outlined
            prepend-inner-icon="mdi-card-search"
            placeholder="Search"
            @input="search"
          ></v-text-field>
          <v-btn
           
            color="success"
            class="ma-2 white--text"
            @click="saveAccount"
          >
            <v-icon right dark> mdi-plus-box </v-icon>
          </v-btn>
        </v-list-item>
      </template>

      <v-list>
      <v-alert v-if="dataUsernames.lenght " type="info">There is no information</v-alert>

        <div v-else v-for="(item,index) in newArray " :key="index" link @click="viewFormInfo(item)" class="pa-1">
          <AccountName v-if="showAccount" :logo_url="item.logo_url" :account_name="item.account_name" :username="item.username" />
        </div>
      </v-list>
    </v-navigation-drawer>

    <formulario-create ref="formInfo" v-if="loadingForm" :infoAccount="formAccountInfo" v-model="formAccountInfo" @updateList="viewAccounts" />
  </v-app>
</template>

<script>
// @ is an alias to /src
import AccountName from "@/components/accountName/accountName.vue";
import formulario from "@/components/formCreate/form.vue";

export default {
  name: "Home",
  components: {
    AccountName,
    "formulario-create": formulario,
  },
  data() {
    return {
      loadingForm : true,
      dataUsernames: [],
      showAccount : false,
      formAccountInfo: {},
      newArray : []
    };
  },
  watch:{
    formAccountInfo(){
      this.$refs.formInfo.startData()
    }
    
  },
  mounted() {
    this.viewAccounts();
  },
  methods: {
    async viewAccounts() {
      const response = await this.$axios("/passwords");
     this.$store.commit('set_accounts', response.data) 
      this.dataUsernames = response.data.sort((a,b) => a.created_at - b.created_at);
      this.newArray = this.dataUsernames
      this.showAccount = true
    },
    saveAccount(){
      this.$refs.formInfo.suAccount()
    },
    viewFormInfo(item){
      this.$store.commit('set_infoAccount', item)
      this.formAccountInfo = item
    },
    search(input= ''){
      let newArray = []
      this.dataUsernames.forEach(element => {
        if (element.account_name.toUpperCase().includes(input.toUpperCase())) {
          newArray.unshift(element)
        }
      });
     this.newArray = newArray
    }
  },
};
</script>
