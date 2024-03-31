<template>
  <UserCard v-if="currentSelectedUser" class="b-card" :currentSelectedUser="currentSelectedUser"/>
  <div v-else></div>
</template>

<script>
import {mapState} from "vuex";
import UserCard from "@/components/userCard/UserCard.vue";

export default {
    name: "index",
    components: {UserCard},
    computed: {
        ...mapState([
            'currentSelectedUser'
        ]),
    }
}
</script>
