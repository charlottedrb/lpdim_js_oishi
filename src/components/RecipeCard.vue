<template>
  <div class="card-recipe">
    <router-link :to="{ name: 'show', params: { id: _id } }">
      <div class="card-recipe-infos">
        <h2>{{ name }}</h2>
        <span
          v-if="category == 'salé'"
          class="custom-badge custom-badge-warning"
          >{{ category }}</span
        >
        <span
          v-if="category == 'sucré'"
          class="custom-badge custom-badge-danger"
          >{{ category }}</span
        >
        <span
          v-if="category == 'dessert'"
          class="custom-badge custom-badge-success"
          >{{ category }}</span
        >
        <span
          v-if="category == 'plat'"
          class="custom-badge custom-badge-info"
          >{{ category }}</span
        >
        <span
          v-if="category == 'entrée'"
          class="custom-badge custom-badge-pink"
          >{{ category }}</span
        >
        <div class="card-recipe-image">
          <img :src="image" />
        </div>
      </div>
    </router-link>
    <div class="card-recipe-numbers">
      <p class="card-recipe-note">
        <span v-bind:style="{ width: (100 * note) / 5 - 5 + 'px' }">{{
          note
        }}</span>
      </p>
      <span title="Éditer">
        <router-link :to="{ name: 'edit', params: { id: _id } }"
          ><font-awesome-icon :icon="['fas', 'pen']" class="edit"
        /></router-link>
      </span>
      <span id="deleteIcon" title="Supprimer" @click="deleteRecipe(_id)">
        <font-awesome-icon :icon="['fas', 'trash']" class="delete" />
      </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    name: {
      required: true,
    },
    note: {
      required: true,
    },
    category: {
      required: true,
    },
    image: {
      default:
        "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
    },
    _id: {
      required: true,
    },
  },
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
  methods: {
    deleteRecipe(id) {
      let apiURL = `https://oishi-recipes.herokuapp.com/api/delete/${id}`;
      let indexOfArrayItem = this.Recipes.findIndex((i) => i._id === id);

      if (window.confirm("Do you really want to delete?")) {
        axios
          .delete(apiURL)
          .then(() => {
            this.Recipes.splice(indexOfArrayItem, 1);
            location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style lang="scss">
@import "../styles/theme.scss";
.block {
  overflow-y: visible;
}

.edit {
  color: $primary;
}

#deleteIcon {
  z-index: 3;
  cursor: pointer;

  .delete {
    color: $tertiary;
  }
}
</style>
