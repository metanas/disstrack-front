import { createApp, provide, h } from "vue";
import App from "./App.vue";
import { apolloClient } from "./vue-apollo";
import { router } from "./routes";
import "./assets/index.scss";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { configure, defineRule } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import { min, required, email } from "@vee-validate/rules";
import en from "@vee-validate/i18n/dist/locale/en.json";
import { store } from "./store";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

defineRule("required", required);
defineRule("min", min);
defineRule("email", email);

configure({
  generateMessage: localize({
    en,
  }),
});

app.use(router);
app.use(store);
app.component("FontAwesomeIcon", FontAwesomeIcon);
app.mount("#app");
