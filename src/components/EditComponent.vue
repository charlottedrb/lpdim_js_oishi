<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center">Update Recipe</h3>
      <form @submit.prevent="handleUpdateForm">
        <div class="form-group">
          <label>Name</label>
          <input
            type="text"
            class="form-control"
            v-model="recipe.name"
            required
          />
        </div>

        <div class="form-group">
          <label>Category</label>
          <input
            type="text"
            class="form-control"
            v-model="recipe.category"
            required
          />
        </div>

        <div class="form-group">
          <label>Note</label>
          <input
            type="text"
            class="form-control"
            v-model="recipe.note"
            required
          />
        </div>

        <div class="form-group">
          <button class="btn btn-danger btn-block">Update</button>
        </div>
      </form>
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
    let apiURL = `http://localhost:4000/api/edit/${this.$route.params.id}`;

    axios.get(apiURL).then((res) => {
      this.recipe = res.data;
    });
  },
  methods: {
    handleUpdateForm() {
      let apiURL = `http://localhost:4000/api/update/${this.$route.params.id}`;

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
  },
};
</script>
