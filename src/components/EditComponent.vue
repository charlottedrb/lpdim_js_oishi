<template>
  <div class="d-flex justify-content-center mt-3">
    <div class="block">
      <div class="block-title">
        <h3 class="text-center">Créer une recette</h3>
      </div>
      <div class="block-content">
        <form @submit.prevent="handleUpdateForm">
          <div class="form-row">
            <div class="col-6">
              <label>Nom</label>
              <input
                type="text"
                class="form-control"
                v-model="recipe.name"
                required
              />
            </div>
            <div class="col-6">
              <label>Catégorie</label>
              <select
                class="form-control"
                name="category"
                id="category"
                v-model="recipe.category"
              >
                <option
                  v-for="category in categories"
                  :key="category.value"
                  v-bind:value="category.value"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-group mt-3">
            <label>Ingrédients</label>
            <span class="text-muted ml-2"
              >Appuyer sur Enter ou , pour ajouter un ingrédient. Pour en
              enlever un, appuyer sur la croix ou Delete.</span
            >
            <div class="tag-input">
              <div
                v-for="(tag, index) in recipe.ingredients"
                :key="index"
                class="tag-input__tag"
              >
                <span @click="removeTag(index)">x</span>
                {{ tag.name }}
              </div>
              <input
                type="text"
                placeholder="New ingredient.."
                class="tag-input__text"
                @keydown.enter="addTag"
                @keydown.188="addTag"
                @keydown.delete="removeLastTag"
              />
            </div>
          </div>

          <div class="form-group form-light">
            <label class="d-block">Quantités</label>
            <div
              class="mb-2 d-inline-block"
              v-for="(ingredient, index) in recipe.ingredients"
              :key="index"
            >
              {{ ingredient.name }}
              <input
                type="text"
                class="form-control form-control-sm w-50"
                @input="updateQuantity(index, $event.target.value)"
                :value="ingredient.quantity"
                placeholder="200g, 20ml.."
                required
              />
            </div>
          </div>

          <div class="form-row mt-3">
            <div class="col-4">
              <div class="form-group">
                <label
                  ><span class="custom-badge custom-badge-secondary-outline"
                    >Note</span
                  ></label
                >
                <input
                  type="number"
                  step="0.1"
                  max="5"
                  class="form-control"
                  v-model="recipe.note"
                  required
                />
              </div>
            </div>
            <div class="col-4">
              <div class="form-group">
                <label
                  ><span class="custom-badge custom-badge-primary"
                    >Durée</span
                  ></label
                >
                <input
                  type="time"
                  class="form-control"
                  v-model="recipe.time"
                  required
                />
              </div>
            </div>
            <div class="col-4">
              <div class="form-group">
                <label
                  ><span class="custom-badge custom-badge-secondary"
                    >Parts</span
                  ></label
                >
                <input
                  type="number"
                  class="form-control"
                  v-model="recipe.units"
                  required
                />
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>URL de l'image</label>
            <input class="form-control" type="text" v-model="recipe.image" />
          </div>

          <div class="form-group form-light">
            <label>Étapes</label>
            <div
              class="form-inline mb-2"
              v-for="(step, index) in recipe.steps"
              :key="index"
            >
              <label class="mr-3">{{ step.step }}</label>
              <input
                type="text"
                class="form-control form-control-sm mr-3"
                @input="updateSteps(index, $event.target.value)"
                :value="step.description"
                placeholder="Mix the ingredients.."
                style="width: 80%"
                required
              />
              <button
                class="btn btn-sm custom-btn-secondary mr-2"
                @click="addStep(index, $event)"
                v-if="index != 0 && index == recipe.steps.length - 1"
              >
                +
              </button>
              <button
                class="btn btn-sm custom-btn-primary"
                @click="removeStep(index, $event)"
                v-if="index != 0 && index != recipe.steps.length"
              >
                -
              </button>
            </div>
          </div>

          <div class="text-right">
            <button type="submit" class="block-btn">Modifier</button>
          </div>
        </form>
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
      categories: [
        { name: "Sucré", value: "sucré" },
        { name: "Salé", value: "salé" },
        { name: "Dessert", value: "dessert" },
        { name: "Plat", value: "plat" },
        { name: "Entrée", value: "entrée" },
      ],
    };
  },
  created() {
    let apiURL = `https://oishi-recipes.herokuapp.com/api/show/${this.$route.params.id}`;

    axios.get(apiURL).then((res) => {
      this.recipe = res.data;
    });
  },
  methods: {
    handleUpdateForm() {
      let apiURL = `https://oishi-recipes.herokuapp.com/api/update/${this.$route.params.id}`;

      axios
        .post(apiURL, this.recipe)
        .then((res) => {
          console.log(res);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addTag: function (event) {
      event.preventDefault();
      // trim deletes extra whitespaces at the beginning and the end of the string
      var tag = event.target.value;
      if (tag.length > 0) {
        tag = tag.replace(" ", "-");
        this.recipe.ingredients.push({ name: tag, description: "none" });
        event.target.value = "";
      }
    },
    removeTag: function (index) {
      this.recipe.ingredients.splice(index, 1);
    },
    removeLastTag: function (event) {
      if (event.target.value.length === 0) {
        this.removeTag(this.recipe.ingredients.length - 1);
      }
    },
    addStep(index, $event) {
      $event.preventDefault();
      this.recipe.steps.push({ step: index + 2, description: "" });
    },
    removeStep(index, $event) {
      $event.preventDefault();
      let toChange = this.recipe.steps.slice(index + 1);
      toChange.forEach((el) => {
        el.step--;
      });
      //this.recipe.steps.splice(index + 1, 1);
      //console.log(this.recipe.steps)
      this.$delete(this.recipe.steps, index);
    },
    updateSteps(index, value) {
      this.$set(this.recipe.steps[index], "description", value);
    },
    updateQuantity(index, value) {
      this.$set(this.recipe.ingredients[index], "quantity", value);
    },
  },
};
</script>

<style lang="scss">
@import "../styles/theme.scss";

.form-light {
  background-color: rgb(247, 247, 247);
  padding: 1rem;
  margin-top: 2rem;
  border-radius: 15px;
  box-shadow: 5px 5px 10px #eee;

  label {
    color: $secondary;
  }
}
</style>
