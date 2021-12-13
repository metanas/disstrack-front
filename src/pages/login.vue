<template lang="pug">
.bg-gradient-to-r.from-green-400.to-purple-800.h-full.flex.items-center
  .container.mx-auto.flex.justify-center
    .card.max-w-2xl.min-w-2xl.py-4.px-8.bg-white.shadow-lg.rounded-lg.my-20(class="w-2/4")
      .flex.justify-center.mb-6
        img(src="../assets/logo.svg")
      form(@submit.prevent="submit")
        .form-group
          label Email
          input.form-input(type="email" v-model="email" autocomplete="email")
          small.text-red-700 {{ email_error }}
        .form-group
          label Password
          input.form-input(type="password" v-model="password" autocomplete="current-password")
          small.text-red-700 {{ password_error }}
        Button.bg-purple-800.text-white.w-full.mt-3(type="submit") LOGIN
      .flex.mt-7.items-center.text-center
        hr.border-gray-300.border-1.w-full.rounded-md
        label.block.font-medium.text-sm.text-gray-600.w-full
          | Or
        hr.border-gray-300.border-1.w-full.rounded-md
      Button.bg-white.text-black.w-full.mt-4(@click="LoginWithGoogle" :icon="faGoogle") Login with Google
      Button.bg-blue-700.text-white.w-full.mt-4(@click="LoginWithFacebook" :icon="faFacebookF") Login with Facebook
</template>

<script lang="ts" setup>
import Button from "../components/Button.vue";
import { useField, useForm } from "vee-validate";
import { useMutation } from "@vue/apollo-composable";
import LOGIN from "@/graphql/auth/login.graphql";
import SIGN_IN_WITH_GOOGLE from "@/graphql/auth/google_login.graphql";
import SIGN_IN_WITH_FACEBOOK from "@/graphql/auth/facebook_login.graphql";
import { useStore } from "vuex";
import { installGoogleAuth } from "../utilities/googleAuth";
import {
  initFacebook,
  login as loginFacebook,
  logout,
} from "../utilities/facebookAuth";

import { onMounted, ref } from "vue";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons/faFacebookF";

const { handleSubmit } = useForm();
const store = useStore();
let gAuth: any;

const { value: email, errorMessage: email_error } = useField(
  "Email",
  "email|required",
);

const { value: password, errorMessage: password_error } = useField(
  "Password",
  "required|min:8",
);

const { mutate: login, onDone } = useMutation(LOGIN);
const { mutate: signInWithGoogle, onDone: googleOnDone } =
  useMutation(SIGN_IN_WITH_GOOGLE);

const { mutate: signInWithFacebook, onDone: facebookOnDone } = useMutation(
  SIGN_IN_WITH_FACEBOOK,
);

const options = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  scope: "profile email",
  prompt: "select_account",
};

onMounted(async () => {
  gAuth = await installGoogleAuth(options);
  await initFacebook(import.meta.env.VITE_FACEBOOK_APP_ID?.toString());
});

async function LoginWithFacebook() {
  const result = await loginFacebook();

  await signInWithFacebook({ token: result.authResponse.accessToken });
}

function LoginWithGoogle(): void {
  if (!gAuth) return;
  gAuth
    .signIn()
    .then((googleUser: any) => {
      signInWithGoogle({ token: googleUser.wc.access_token });
    })
    .catch((e: any) => {
      console.log("error", e);
    });
}

onDone(({ data }) => loginSuccessfully(data.login));

googleOnDone(({ data }) => loginSuccessfully(data.signInWithGoogle));

facebookOnDone(({ data }) => loginSuccessfully(data.signInWithFacebook));

function loginSuccessfully(data): void {
  store.commit("setUser", data);
  window.location.href = "/";
}

const submit = handleSubmit(() => {
  login({
    email: email.value,
    password: password.value,
  });
});
</script>
