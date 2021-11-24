import { getCurrentInstance } from "vue";

export default async (): Promise<any> => {
  const $apollo =
    getCurrentInstance()?.appContext.config.globalProperties.$apolloProvider
      .defaultClient;

  return $apollo.query;
};
