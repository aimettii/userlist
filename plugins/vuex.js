import { createStore } from "vuex";
import axios from "axios";
export const CLIENTS_TAB = 'clients';
export const RATING_TAB = 'rating';

const store = createStore({
    state() {
        return {
            userList: {
                data: []
            },
            currentSortTab: CLIENTS_TAB,
            currentSelectedUser: null
        };
    },
    mutations: {
        setUsers (state, payload) {
            state.userList = payload
        },
        switchTab(state, tab) {
            state.currentSortTab = tab;
        },
        setCurrentSelectedUser(state, user) {
            state.currentSelectedUser = user;
        }
    },
    actions: {
        async fetchUsers({ commit }) {
            const {data} = await axios.get('https://reqres.in/api/users').catch(() => {
                alert('An error occurred while requesting to get users')
            })

            commit('setUsers', data)
        }
    }
});

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
    // Install the store instance as a plugin
});