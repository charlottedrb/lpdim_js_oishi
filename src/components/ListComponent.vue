<template>
    <div>
        <RecipeCard v-for="recipe in Recipes" :key="recipe._id" :_id="recipe._id" :name="recipe.name" :note="recipe.note" :category="recipe.category" :image="recipe.image"></RecipeCard>
    </div>
</template>

<script>
    import axios from "axios";
    import RecipeCard from "./RecipeCard";

    export default {
        data() {
            return {
                Recipes: []
            }
        },
        created() {
            let apiURL = 'http://localhost:4000/api';
            axios.get(apiURL).then(res => {
                this.Recipes = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
        components: {
            RecipeCard            
        },
        methods: {
            deleteRecipe(id){
                let apiURL = `http://localhost:4000/api/delete/${id}`;
                let indexOfArrayItem = this.Recipes.findIndex(i => i._id === id);

                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.Recipes.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            }
        }
    }
</script>

<style lang="scss">
@import "../styles/theme.scss";
</style>