<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="auto">
        <router-link to="/" />
        <v-card
          class="text-center px-12 py-15"
          width="460"
        >
          <v-btn
            block
            class="mt-10"
            color="primary"
            rounded
            x-large
            @click="loginWithGoogle"
          >
            Login with google
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
const firebaseConfig = {
  apiKey: process.env.VUE_APP_ENV_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_ENV_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_ENV_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_ENV_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_ENV_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_ENV_FIREBASE_APP_ID
};
import { getAuth, GoogleAuthProvider, getRedirectResult, signInWithRedirect } from "firebase/auth";
import { initializeApp } from 'firebase/app'
export default {
  data: () => {
    return {
      email: '',
      password: '',
      auth: '',
      provider: '',
    }
  },
  created() {
    this.app = initializeApp(firebaseConfig);
    this.provider = new GoogleAuthProvider();
    this.auth = getAuth();
    getRedirectResult(this.auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.info(`teokn --`, token)
        console.info(`user --`, user)
        // ...
      }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  },
  methods: {
    loginWithGoogle() {
      signInWithRedirect(this.auth, this.provider);
    }
  }
}
</script>
