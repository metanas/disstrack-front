import { createApp, provide, h } from "vue";
import App from "./App.vue";
import { apolloClient } from "./vue-apollo";
import { router } from "./routes";
import "./assets/index.scss";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { DefaultApolloClient } from "@vue/apollo-composable";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(router).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
