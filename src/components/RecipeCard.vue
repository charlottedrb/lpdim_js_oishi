<template>
<router-link :to="{name: 'show', params: { id: _id }}">
    <div class="card-recipe">
        <div class="card-recipe-infos">
            <h2>{{ name }}</h2>
            <span v-if="category == 'salted'" class="badge badge-salted">{{ category }}</span>
            <span v-if="category == 'sweet'" class="badge badge-sweet">{{ category }}</span>
            <span v-if="category == 'dessert'" class="badge badge-dessert">{{ category }}</span>
            <div class="card-recipe-image">
                <img :src="image">
            </div>
            <div class="card-recipe-numbers">
                <p class="card-recipe-note"><span v-bind:style="{ width: (100* note /5) + 'px'}">{{ note }}</span></p>
            </div>
        </div>
    </div>
</router-link>
</template>

<script>
export default {
    props: {
        name : {
            required: true
        }, 
        note : {
            required: true
        }, 
        category: {
            required: true
        }, 
        image : {
            default: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
        }, 
        _id: {
            required: true
        }
    }, 
    data: function () {
        return {
            recipeName: 'Crumble', 
            recipeNote: 4, 
            recipeCategory: "None",
            recipeImage: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
            recipeObject: {
                name: "Crumble", 
                note: 3, 
                category: this.recipeCategory
            },
            displayModal: false
        }
    },
}
</script>

<style lang="scss">
@import "../styles/theme.scss";
</style>