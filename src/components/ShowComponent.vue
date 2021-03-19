<template>
    <div class="d-flex justify-content-center mt-3">
        <div class="block">
            <div class="block-content">
                <div class="infos">
                    <div class="badge badge-primary" id="duree">Durée</div>
                    <div class="badge badge-secondary" id="parts">Parts</div>
                </div>
                <div class="block-image">
                    <img :src="recipe.image">
                    <div class="category">
                        <span v-if="recipe.category == 'salted'" class="badge badge-salted">{{ recipe.category }}</span>
                        <span v-if="recipe.category == 'sweet'" class="badge badge-sweet">{{ recipe.category }}</span>
                        <span v-if="recipe.category == 'dessert'" class="badge badge-dessert">{{ recipe.category }}</span>
                    </div>
                </div>
                <div class="block-body">
                    <div class="block-header">
                        <h2>{{ recipe.name }}</h2>
                    </div>
                    
                    <div class="ingredients">
                        <h4>Ingrédients :</h4>
                        <ul>
                            <li>Beurre</li>
                            <li>Patate douce</li>
                            <li>Creme</li>
                            <li>Sel</li>
                        </ul>
                    </div>
                    <div class="preparation">
                        <h4>Préparation :</h4>
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