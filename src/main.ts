import { createApp } from 'vue'
import App from './App.vue'
import { apolloProvider } from "./vue-apollo";
import { router } from "./routes";
import "./assets/index.scss";

createApp(App)
  .use(router)
  .use(apolloProvider)
  .mount('#app')
