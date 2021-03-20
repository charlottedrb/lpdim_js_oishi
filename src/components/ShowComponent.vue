<template>
    <div class="d-flex justify-content-center mt-3">
        <div class="block">
            <div class="block-content">
                <div class="infos">
                    <div class="custom-badge custom-badge-primary" id="time">Time</div>
                    <div id="time-value" class="custom-badge custom-badge-primary-outline">{{ recipe.time }}</div>

                    <div class="custom-badge custom-badge-secondary" id="units">Units</div>
                    <div id="units-value" class="custom-badge custom-badge-secondary-outline">{{ recipe.units }}</div>
                </div>
                <div class="block-image">
                    <img :src="recipe.image">
                    <div class="category">
                        <span v-if="recipe.category == 'salted'" class="custom-badge custom-badge-warning">{{ recipe.category }}</span>
                        <span v-if="recipe.category == 'sweet'" class="custom-badge custom-badge-danger">{{ recipe.category }}</span>
                        <span v-if="recipe.category == 'dessert'" class="custom-badge custom-badge-success">{{ recipe.category }}</span>
                    </div>
                </div>
                <div class="block-body">
                    <div class="block-header">
                        <h2>{{ recipe.name }}</h2>
                    </div>
                    
                    <div class="ingredients">
                        <h4>Ingredients :</h4>
                        <ul>
                            <li v-for="(ingredient, index) in recipe.ingredients" :key="index">{{ ingredient.name }} - <span class="custom-text-tertiary">{{ ingredient.quantity }}</span></li>
                        </ul>
                    </div>
                    <div class="preparation">
                        <h4>Preparation :</h4>
                        <ol>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
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