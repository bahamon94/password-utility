<template>
  <v-main>
    <v-container fluid>
      <v-form>
        <v-row>
          <v-col cols="12" md="4" xs="12">
            <AccountName
              @eventTo="openDialog"
              :logo_url="dataInforAccount.logo_url"
              :account_name="dataInforAccount.account_name"
              :username="dataInforAccount.username"
            />
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
              <v-btn @click="generatePassworsAut" outlined text class="ma-2"
                >Generate</v-btn
              >
              <v-btn outlined text @click="copyInputPassword">Copy</v-btn>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6" xs="12">
            <v-text-field
              outlined
              class="pa-2"
              label="Site URL"
              v-model="site"
              @change="validSite"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" xs="12"> </v-col>
        </v-row>
        <v-alert
          >Create at
          <p>
            {{
              dataInforAccount.created_at
                | dateParse(dataInforAccount.created_at)
            }}
          </p>
        </v-alert>
        <div>
          <v-btn color="error" class="ma-2 white--text" @click="deleteAccount">
            Delete
            <v-icon right dark> mdi-delete </v-icon>
          </v-btn>
        </div>
      </v-form>
    </v-container>
    <v-dialog v-model="Showdialog" max-width="490">
      <v-card>
        <v-card-title>URL of picture </v-card-title>
        <v-card-text>
          <v-text-field class="pa-2" v-model="image"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" class="white--text" @click="saveURLImage"> Obtein </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script src="./form.js"></script>
