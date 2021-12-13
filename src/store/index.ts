import { createStore, Store } from "vuex";
import { InjectionKey } from "vue";
import createPersistedState from "vuex-persistedstate";

interface State {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  } | null;
  token: string | null;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state() {
    return {
      user: null,
      token: "",
    };
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    async logout({ commit }) {
      commit("setToken", null);
      commit("setUser", null);
    },
  },
  getters: {
    isAuth: (state) => !!state.token,
    token: (state) => state.token,
    currentUser: (state) => state.user,
  },
  plugins: [createPersistedState()],
});
