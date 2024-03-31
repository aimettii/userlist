export default {
    methods: {
        getLocalStorageKey(user) {
            return `user.${user?.id}`;
        },
        getFullname(user) {
            return `${user.first_name} ${user.last_name}`;
        },
        getDataFromLocalStorage(user = this.currentSelectedUser) {
            if (!user) return;

            let data = window.localStorage.getItem(this.getLocalStorageKey(user));

            if (data) {
                try {
                    data = JSON.parse(data);

                    return data;
                } catch (e) {
                    window.localStorage.removeItem(this.getLocalStorageKey(user));
                }
            }

            return false;
        },
        setDataToLocalStorage(user, data) {
            window.localStorage.setItem(this.getLocalStorageKey(user), JSON.stringify(data))
        }
    }
}