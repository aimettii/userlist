<template>
  <div class="b-layout" :class="[collapsedSidebar ? 'b-layout--collapsed-sidebar' : '']">
      <Sidebar @collapsed="onCollapsed"/>
      <div class="b-page">
          <slot />
      </div>
  </div>
</template>

<script>
export default {
    name: "default",
    data() {
        return {
            collapsedSidebar: false
        }
    },
    methods: {
        onCollapsed(value) {
            this.collapsedSidebar = value;
        }
    }
}
</script>

<style scoped>

</style>