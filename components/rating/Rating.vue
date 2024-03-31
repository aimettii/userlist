<template>
    <div class="rating">
        <button @click="decrease" class="rating__button" :disabled="points <= 0">-</button>
        <span class="rating_text">{{ this.points }} points</span>
        <button @click="increase" class="rating__button">+</button>
    </div>
</template>

<script>
export default {
    name: "Rating",
    props: {
        points: {
            default() {
                return 0;
            }
        }
    },
    methods: {
        decrease() {
            if (this.points <= 0) {
                return;
            }

            this.$emit('update', this.points - 1);
        },
        increase() {
            this.$emit('update', this.points + 1);
        }
    }
}
</script>