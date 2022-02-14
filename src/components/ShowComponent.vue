<template>
  <div class="d-flex justify-content-center mt-3">
    <div class="block">
      <div class="block-content">
        <div class="block-image">
          <img :src="recipe.image" />
          <div class="category">
            <span
              v-if="recipe.category == 'salted'"
              class="custom-badge custom-badge-warning"
              >{{ recipe.category }}</span
            >
            <span
              v-if="recipe.category == 'sweet'"
              class="custom-badge custom-badge-danger"
              >{{ recipe.category }}</span
            >
            <span
              v-if="recipe.category == 'dessert'"
              class="custom-badge custom-badge-success"
              >{{ recipe.category }}</span
            >
          </div>
        </div>
        <div class="block-body">
          <div
            class="block-header d-flex justify-content-between align-items-center"
          >
            <h2>{{ recipe.name }}</h2>
            <div>
              <span class="mr-2">{{ recipe.likes }} </span
              ><font-awesome-icon
                :icon="['fas', 'thumbs-up']"
                @click="addLike"
                class="like"
              />
            </div>
          </div>
          <div class="infos">
            <div class="custom-badge custom-badge-primary" id="time">Durée</div>
            <div
              id="time-value"
              class="custom-badge custom-badge-primary-outline"
            >
              {{ recipe.time }}
            </div>

            <div class="custom-badge custom-badge-secondary" id="units">
              Parts
            </div>
            <div
              id="units-value"
              class="custom-badge custom-badge-secondary-outline"
            >
              {{ recipe.units }}
            </div>
          </div>
          <div class="ingredients">
            <h4>Ingrédients :</h4>
            <ul>
              <li
                v-for="(ingredient, index) in recipe.ingredients"
                :key="index"
              >
                {{ ingredient.name }} -
                <span class="custom-text-secondary">{{
                  ingredient.quantity
                }}</span>
              </li>
            </ul>
          </div>
          <div class="preparation">
            <h4>Préparation :</h4>
            <ul class="mt-3" style="padding-left: 0">
              <li
                v-for="(step, index) in recipe.steps"
                :key="index"
                style="list-style-type: none"
              >
                <span class="custom-text-secondary">{{ step.step }}.</span>
                {{ step.description }}
              </li>
            </ul>
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
      recipe: {},
    };
  },
  created() {
    let apiURL = `https://oishi-recipes.herokuapp.com/api/show/${this.$route.params.id}`;

    axios.get(apiURL).then((res) => {
      this.recipe = res.data;
      console.log("done");
    });
  },
  methods: {
    addLike: function () {
      let apiURL = `https://oishi-recipes.herokuapp.com/api/update/${this.$route.params.id}`;
      this.$set(this.recipe, this.recipe.likes, this.recipe.likes++);

      axios.post(apiURL, this.recipe).then((res) => {
        console.log(res);
        //this.$router.push("/");
      });
    },
  },
};
</script>

<style lang="scss">
@import "../styles/theme.scss";

.like {
  color: $tertiary;
  font-size: 1.5rem;
}
</style>
