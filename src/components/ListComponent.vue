<template>
  <div>
    <RecipeCard
      v-for="recipe in Recipes"
      :key="recipe._id"
      :_id="recipe._id"
      :name="recipe.name"
      :note="recipe.note"
      :category="recipe.category"
      :image="recipe.image"
    ></RecipeCard>
  </div>
</template>

<script>
import axios from "axios";
import RecipeCard from "./RecipeCard";

export default {
  data() {
    return {
      Recipes: [],
    };
  },
  created() {
    let apiURL = "https://oishi-recipes.herokuapp.com/api";
    axios
      .get(apiURL)
      .then((res) => {
        this.Recipes = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  components: {
    RecipeCard,
  },
};
</script>

<style lang="scss">
@import "../styles/theme.scss";
</style>
