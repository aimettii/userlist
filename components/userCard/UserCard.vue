<template>
    <div class="b-card">
        <div class="b-card-body">
            <div class="b-card-body__main">
                <img class="b-user-logo" :src="currentSelectedUser.avatar" :alt="currentSelectedUser.first_name">
                <div class="b-user-info">
                    <h1>{{ getFullname(currentSelectedUser) }}</h1>
                    <h3 class="b-user-info__subtitle">{{ currentSelectedUser.email }}</h3>

                    <Rating @update="updatePoints" class="b-user-info__rating" :points="points"/>
                    <textarea class="b-user-info__textarea" v-model="comment" rows="5"></textarea>
                </div>
            </div>
            <button @click="save" class="b-user-save b-button">Save</button>
        </div>
    </div>
</template>

<script>

const initData = {
    comment: null,
    points: 0,
}

export default {
    name: "UserCard",
    props: [
        'currentSelectedUser'
    ],
    data() {
        return {
            ...initData
        }
    },
    watch: {
        'currentSelectedUser.id': {
            handler() {
                this.fetchDataFromLocalStorage();
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        updatePoints(val) {
            this.points = val;
        },
        save() {
            this.setDataToLocalStorage(this.currentSelectedUser, {
                comment: this.comment,
                points: this.points,
            });

            this.$store.dispatch('fetchUsers');
        },
        fetchDataFromLocalStorage() {
            let data = this.getDataFromLocalStorage();

            if (data) {
                this.comment = data.comment || null;
                this.points = data.points ?? 0;
            } else {
                Object.assign(this.$data, {...initData});
            }
        }
    },
}
</script>