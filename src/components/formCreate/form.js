import AccountName from "../accountName/accountName";
import moment from "moment";
import utils from "@/mixins/utils";

export default {
  components: {
    AccountName,
  },
  mixins: [utils],
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
      image: "",
      dataInforAccount: [],
      idAccount: 0,
      Showdialog: false,
    };
  },
  mounted() {
    this.startData();
  },
  methods: {
    deleteAccount() {
      if (this.idAccount > 0) {
        this.$showAlertConfirm( "Notificación", "Are you sure you want delete user record").then((result) => {
          if (result) {
            this.$axios.delete(`/passwords/${this.idAccount}`);
            setTimeout(() => this.updateListAccount(), 100);
            this.dataInforAccount = [];
            this.$store.commit("set_infoAccount", []);
            this.startData();
            this.$showInfoSuccessNotify();
          }
        });
      }
    },
    suAccount() {
      console.log(this.idAccount);
      const dtoAccount = {
        account_name: this.name,
        username: this.dataInforAccount.username,
        password: this.password,
        site_url: this.site,
        logo_url: this.image,
      };
      if (this.password && this.name) {
        if (this.idAccount > 0) {
          this.$axios.put(`passwords/${this.idAccount}`, dtoAccount);
        } else {
          dtoAccount.created_at = Date.now();
          this.$axios.post("passwords", dtoAccount);
        }
        this.dataInforAccount = [];
        this.$store.commit("set_infoAccount", []);
        this.startData();
        setTimeout(() => this.updateListAccount(), 100);
        this.$showInfoSuccessNotify();
      }
    },
    updateListAccount() {
      this.$emit("updateList");
    },
    dataNull() {
      this.dataInforAccount = [];
      this.$store.commit("set_infoAccount", []);
      this.startData();
    },
    startData() {
      this.dataInforAccount = this.$store.getters.get_infoAccount;
      this.password = this.dataInforAccount.password;
      this.name = this.dataInforAccount.account_name;
      this.site = this.dataInforAccount.site_url;
      this.idAccount = this.dataInforAccount.id;
      this.image = this.dataInforAccount.logo_url
    },
    generatePassworsAut() {
      this.password = this.$password_generator();
    },
    copyInputPassword() {
      this.icon = !this.icon;
      setTimeout(() => {
        let element = document.getElementById("inPwd");
        element.select();
        document.execCommand("Copy");
        this.icon = !this.icon;
      }, 1);
    },
    openDialog() {
      this.Showdialog = true;
    },
    saveURLImage(){
       this.Showdialog = false
    },
    validSite(){
    fetch(this.site).then(res => {
      console.log(res.status);
    })

    }
  },
  filters: {
    dateParse(value) {
      return  moment(value).format("MMMM Do YYYY, h:mm:ss a");
    },
  },
}