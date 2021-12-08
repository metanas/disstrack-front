import { createStore, Store } from "vuex";
import { InjectionKey } from "vue";
import createPersistedState from "vuex-persistedstate";

interface State {
  admin: {
    id: string;
    username: string;
    status: string;
  } | null;
  token: string | null;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state() {
    return {
      admin: null,
      token: "",
    };
  },
  mutations: {
    setAdmin(state, payload) {
      state.admin = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    async logout({ commit }) {
      commit("setToken", null);
      commit("setAdmin", null);
    },
  },
  getters: {
    token: (state) => state.token,
    currentUser: (state) => state.admin,
  },
  plugins: [createPersistedState()],
});
