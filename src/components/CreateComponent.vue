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
                            <input type="text" class="form-control" v-model="recipe.name" required>
                        </div>
                        <div class="col-6">
                            <label>Category</label>
                            <select class="form-control" name="category" id="category" v-model="selectedCategory">
                                <option v-for="category in categories" :key="category.value" v-bind:value="category.value">{{ category.name }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Ingredients</label>
                        <input type="email" class="form-control" v-model="recipe.category" required>
                    </div>

                    <div class="form-group">
                        <label>Note</label>
                        <input type="number" class="form-control" v-model="recipe.note" required>
                    </div>

                    <div class="form-group text-right">
                        <button class="block-btn">Create</button>
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
                   name: '',
                   category: '',
                   note: ''
                }, 
                selectedCategory: "sweet",
                categories: [
                    { name: "Sweet", value: "sweet" }, 
                    { name: "Salted", value: "salted"}, 
                    { name: "Dessert", value: "dessert"}, 
                    { name: "Fried", value: "fried"}, 
                ], 
            }
        },
        methods: {
            handleSubmitForm() { 
                let apiURL = 'http://localhost:4000/api/add';
                
                axios.post(apiURL, this.recipe).then(() => {
                  this.$router.push('/')
                  this.recipe = {
                    name: '',
                    email: '',
                    phone: ''
                  }
                }).catch(error => {
                    console.log(error)
                });
            }
        }
    }
</script>