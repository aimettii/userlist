<template>
    <div>
        <div :class="['sidebar', isSidebarActive  ? '' : 'sidebar-hidden']">
            <div class="sidebar-content">
                <div class="sidebar-header">
                    <div class="sidebar-header-tabs">
                        <div @click="switchTab(CLIENTS_TAB)" class="sidebar-tab"
                             :class="[currentSortTab === CLIENTS_TAB  ? 'sidebar-tab--active' : '']">Clients
                        </div>
                        <div @click="switchTab(RATING_TAB)" class="sidebar-tab"
                             :class="[currentSortTab === RATING_TAB  ? 'sidebar-tab--active' : '']">Rating
                        </div>
                    </div>
                    <button @click="toggleSidebar" class="btn toggle-button btn-sm btn-link">
                        <img :src="ArrowRight" height="10px" width="10px"/>
                    </button>

                    <div v-if="currentSortTab === CLIENTS_TAB" class="sidebar-header-search">
                        <input v-model="searchText" class="sidebar-header-search__field"
                               placeholder="Enter username to search" type="text">
                        <img class="sidebar-header-search__icon" :src="Search" height="20px" width="20px"/>
                    </div>
                </div>
                <div class="sidebar-body">
                    <ul>
                        <li class="sidebar-item" :class="[currentSelectedUser?.id === user.id ? 'sidebar-item--active' : '']" v-for="user in userListSorted" @click="selectUser(user)"  >
                            <div class="sidebar-item__info">
                                <img v-if="currentSortTab === CLIENTS_TAB" class="sidebar-item__logo" :src="user.avatar"/>
                                <h1 v-else class="sidebar-item__logo">{{ user?.additionalData?.points ?? 0 }}</h1>
                                <div class="sidebar-item__name">{{ getFullname(user) }}</div>
                            </div>
                            <div class="sidebar-item__icon">
                                <img :src="ArrowRight" height="10px" width="10px"/>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="sidebar-footer">
                    <button @click="updateList" class="b-button">Update list</button>
                    <a href="https://nomadicsoft.io/" target="_blank" rel="noopener">
                        By: nomadicsoft.io
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ArrowRight from "@/assets/icons/arrow-r.svg"
import Search from "@/assets/icons/search.svg"
import {mapState} from "vuex";
import {CLIENTS_TAB, RATING_TAB} from "@/plugins/vuex.js";

export default {
    name: "Sidebar",
    setup() {
        return {
            ArrowRight,
            Search
        }
    },
    data() {
        return {
            isSidebarActive: true,
            searchText: "",
        }
    },
    computed: {
        CLIENTS_TAB: () => CLIENTS_TAB,
        RATING_TAB: () => RATING_TAB,
        ...mapState({
            userList: (state) => state.userList.data,
            currentSortTab: (state) => state.currentSortTab,
            currentSelectedUser: (state) => state.currentSelectedUser,
        }),
        userListSorted() {
            let filtered = this.userList;

            if (this.searchText.length) {
                filtered = filtered.filter(i =>
                    i.first_name.toLowerCase().search(this.searchText.toLowerCase()) > -1 ||
                        i.last_name.toLowerCase().search(this.searchText.toLowerCase()) > -1
                    )
            }

            switch (this.currentSortTab) {
                case CLIENTS_TAB:
                    return filtered.sort(function (a, b) {
                        return a.last_name.localeCompare(b.last_name);
                    })
                case RATING_TAB:
                    return filtered.map(i => {
                        const additionalData = this.getDataFromLocalStorage(i);

                        return {...i, additionalData}
                    }).sort(function (a, b) {
                        return ((b?.additionalData?.points ?? 0) - (a?.additionalData?.points ?? 0));
                    })
            }
        }
    },
    methods: {
        toggleSidebar() {
            this.isSidebarActive = !this.isSidebarActive
            this.$emit('collapsed', !this.isSidebarActive)
        },
        switchTab(tab) {
            if (tab !== CLIENTS_TAB) {
                this.searchText = '';
            }

            this.$store.commit('switchTab', tab);
        },
        selectUser(user) {
            this.$store.commit('setCurrentSelectedUser', user);
        },
        updateList() {
            this.$store.dispatch('fetchUsers')
        }
    }
}
</script>