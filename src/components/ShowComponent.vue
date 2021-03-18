<template>
    <div>
        <input type="text" v-model="recipe.name">
    </div>
</template>

<script>
import axios from "axios";

export default {

    data() {
        return {
            recipe: {}
        }
    },
    created() {
        let apiURL = `http://localhost:4000/api/edit/${this.$route.params.id}`;

        axios.get(apiURL).then((res) => {
            this.recipe = res.data;
            console.log('done');
        })
    },
}
</script>

<style lang="scss">
@import "../styles/theme.scss";
</style>