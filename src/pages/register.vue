<template lang="pug">
.bg-gradient-to-r.from-green-400.to-purple-800.h-full.flex.items-center
  .container.mx-auto.flex.justify-center
    .card.max-w-2xl.min-w-2xl.py-4.px-8.bg-white.shadow-lg.rounded-lg.my-20(class="w-2/4")
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
        Button.bg-purple-800.text-white.w-full(type="submit") Register

</template>

<script lang="ts" setup>
import Button from "../components/Button.vue";
import { useField, useForm } from "vee-validate";
import { useMutation } from "@vue/apollo-composable";
import REGISTER from "../graphql/auth/register.graphql";

const { handleSubmit } = useForm();

const { value: email, errorMessage: email_error } = useField(
  "Email",
  "email|required"
);
const { value: first_name, errorMessage: first_name_error } = useField(
  "First Name",
  "required"
);
const { value: last_name, errorMessage: last_name_error } = useField(
  "Last Name",
  "required"
);
const { value: password, errorMessage: password_error } = useField(
  "Password",
  "required|min:8"
);

const { mutate: register } = useMutation(REGISTER);

const submit = handleSubmit(() => {
  register({
    email: email.value,
    first_name: first_name.value,
    last_name: last_name.value,
    password: password.value,
  });
});
</script>
