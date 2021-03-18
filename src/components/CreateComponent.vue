<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Create recipe</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="recipe.name" required>
                </div>

                <div class="form-group">
                    <label>Category</label>
                    <input type="email" class="form-control" v-model="recipe.category" required>
                </div>

                <div class="form-group">
                    <label>Note</label>
                    <input type="text" class="form-control" v-model="recipe.note" required>
                </div>

                <div class="form-group">
                    <button class="btn btn-danger btn-block">Create</button>
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
                recipe: {
                   name: '',
                   category: '',
                   note: ''
                }
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