<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script>
export default {
    name: "index",
    mounted() {
        this.$store.dispatch('fetchUsers')
    }
}
</script>

<style lang="scss">

</style>
