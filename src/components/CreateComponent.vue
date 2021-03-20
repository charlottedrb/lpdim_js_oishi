<template>
  <div class="d-flex justify-content-center mt-3">
    <div class="block">
      <div class="block-title">
        <h3 class="text-center">Create recipe</h3>
      </div>
      <div class="block-content">
        <form @submit.prevent="handleSubmitForm">
          <div class="form-row">
            <div class="col-6">
              <label>Name</label>
              <input
                type="text"
                class="form-control"
                v-model="recipe.name"
                required
              />
            </div>
            <div class="col-6">
              <label>Category</label>
              <select
                class="form-control"
                name="category"
                id="category"
                v-model="selectedCategory"
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
            <label>Ingredients</label>
            <span class="text-muted ml-2"
              >Press Enter or , to add your tag. Then press Delete or click the
              cross to remove one.</span
            >
            <div class="tag-input">
              <div
                v-for="(tag, index) in currentIngredients"
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
            <label class="d-block">Quantities</label>
            <div
              class="mb-2 d-inline-block"
              v-for="(ingredient, index) in currentIngredients"
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
                    >Time</span
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
                    >Units</span
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
            <label>Image URL</label>
            <input class="form-control" type="text" v-model="recipe.image" />
          </div>

          <div class="form-group form-light">
            <label>Steps</label>
            <div
              class="form-inline mb-2"
              v-for="(step, index) in currentSteps"
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
                class="btn btn-sm custom-btn-tertiary mr-2"
                @click="addStep(index, $event)"
                v-if="index != 0 && index == currentSteps.length - 1"
              >
                +
              </button>
              <button
                class="btn btn-sm custom-btn-primary"
                @click="removeStep(index, $event)"
                v-if="index != 0 && index != currentSteps.length"
              >
                -
              </button>
            </div>
          </div>

          <div class="text-right">
            <button type="submit" class="block-btn">Create</button>
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
      recipe: {
        name: "",
        note: "",
        category: "",
        image:
          "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
        units: "",
        time: "",
        ingredients: [],
        steps: [],
      },
      selectedCategory: "sweet",
      currentIngredients: [
        { name: "butter", quantity: "200g" },
        { name: "flour", quantity: "100g" },
      ],
      currentSteps: [
        { step: 1, description: "Melt the butter." },
        { step: 2, description: "Mix with the flour." },
      ],
      categories: [
        { name: "Sweet", value: "sweet" },
        { name: "Salted", value: "salted" },
        { name: "Dessert", value: "dessert" },
        { name: "Fried", value: "fried" },
      ],
    };
  },
  methods: {
    addTag: function (event) {
      event.preventDefault();
      // trim deletes extra whitespaces at the beginning and the end of the string
      var tag = event.target.value;
      if (tag.length > 0) {
        tag = tag.replace(" ", "-");
        this.currentIngredients.push({ name: tag, quantity: "none" });
        //this.$set(this.recipe.ingredients, tag, "");
        event.target.value = "";
      }
    },
    removeTag: function (index) {
      this.currentIngredients.splice(index, 1);
      //this.$delete(this.recipe.ingredients, ingredient)
    },
    removeLastTag: function (event) {
      if (event.target.value.length === 0) {
        this.removeTag(this.currentIngredients.length - 1);
      }
    },
    handleSubmitForm() {
      let apiURL = "http://localhost:4000/api/add";
      this.recipe.ingredients = this.currentIngredients;
      this.recipe.category = this.selectedCategory;
      this.recipe.steps = this.currentSteps;
      console.log(this.recipe);
      axios
        .post(apiURL, this.recipe)
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateQuantity(index, value) {
      this.$set(this.currentIngredients[index], "quantity", value);
    },
    addStep(index, event) {
      event.preventDefault();
      this.currentSteps.push({ step: index + 2, description: "" });
    },
    removeStep(index, event) {
      event.preventDefault();
      let toChange = this.currentSteps.slice(index + 1);
      toChange.forEach((el) => {
        el.step--;
      });
      this.currentSteps.splice(index + 1, 1);
    },
    updateSteps($event, value) {
      this.$set(this.currentSteps[$event], "description", value);
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
    color: $tertiary;
  }
}
</style>
