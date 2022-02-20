<template lang="pug">
.bg-gradient-to-r.from-green-400.to-purple-800.h-full.flex.items-center
  .container.mx-auto.flex.justify-center
    .card.py-4.px-8.bg-white.shadow-lg.rounded-lg.my-20(class="xl:w-2/4 lg:w-2/3 w-11/12")
      .flex.justify-center.mb-6
        img(src="../assets/logo.svg")
      form(@submit.prevent="submit")
        .form-group
          label First Name
          input.form-input(type="text" v-model="first_name" autocomplete="fname")
          small.text-red-700 {{ first_name_error }}
        .form-group
          label Last Name
          input.form-input(type="text" v-model="last_name" autocomplete="lname")
          small.text-red-700 {{ last_name_error }}
        .form-group
          label Email
          input.form-input(type="email" v-model="email" autocomplete="email")
          small.text-red-700 {{ email_error }}
        .form-group
          label Password
          input.form-input(type="password" v-model="password" autocomplete="current-password")
          small.text-red-700 {{ password_error }}
        Button.bg-purple-800.text-white.w-full.mt-3(type="submit") Register
      .flex.mt-7.items-center.text-center
        hr.border-gray-300.border-1.w-full.rounded-md.grow
        label.block.font-medium.text-sm.text-gray-600.w-full.mx-3
          | Or
        hr.border-gray-300.border-1.w-full.rounded-md.grow
      Button.bg-white.text-black.w-full.mt-4(@click="LoginWithGoogle" :icon="faGoogle") Login with Google
      Button.bg-blue-700.text-white.w-full.mt-4(@click="LoginWithFacebook" :icon="faFacebookF") Login with Facebook
</template>

<script lang="ts" setup>
import Button from "../components/Button.vue";
import { useField, useForm } from "vee-validate";
import { useMutation } from "@vue/apollo-composable";
import REGISTER from "../graphql/auth/register.graphql";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons/faFacebookF";
import SIGN_IN_WITH_GOOGLE from "@/graphql/auth/google_login.graphql";
import SIGN_IN_WITH_FACEBOOK from "@/graphql/auth/facebook_login.graphql";
import { useStore } from "vuex";
import { onMounted } from "vue";
import { installGoogleAuth } from "../utilities/googleAuth";
import {
  initFacebook,
  login as loginFacebook,
} from "../utilities/facebookAuth";

const { handleSubmit } = useForm();
const store = useStore();
let gAuth: any;

const { value: email, errorMessage: email_error } = useField(
  "Email",
  "email|required",
);
const { value: first_name, errorMessage: first_name_error } = useField(
  "First Name",
  "required",
);
const { value: last_name, errorMessage: last_name_error } = useField(
  "Last Name",
  "required",
);
const { value: password, errorMessage: password_error } = useField(
  "Password",
  "required|min:8",
);

const { mutate: register, onDone } = useMutation(REGISTER);
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

onDone(({ data }) => loginSuccessfully(data.register));

googleOnDone(({ data }) => loginSuccessfully(data.signInWithGoogle));

facebookOnDone(({ data }) => loginSuccessfully(data.signInWithFacebook));

function loginSuccessfully(data): void {
  store.commit("setUser", data);
  window.location.href = "/";
}

const submit = handleSubmit(() => {
  register({
    email: email.value,
    first_name: first_name.value,
    last_name: last_name.value,
    password: password.value,
  });
});
</script>
