<template>
  <div class="add-recipe container" @keydown.esc="backToDashboard">
    <h2 class="center-align indigo-text">Tambah resep baru</h2>
    <form @submit.prevent="AddRecipe">
      <div class="field title">
        <label for="title">Nama makanan:</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div v-for="(ing, index) in ingredients" :key="index" class="field">
        <label for="ingredient">Bahan:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Tambah bahan:</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another" />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="btn pink" @click="AddRecipe" @keydown.enter="AddRecipe">Simpan resep</button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from "slugify";
import db from "../firebase/init";

export default {
  title: "Resepi - Tambah resep",
  name: "AddRecipe",
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null
    };
  },
  methods: {
    AddRecipe() {
      if (this.title) {
        this.feedback = null;
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("dishes")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug
          })
          .then(() => {
            this.$router.push({ name: "Dashboard" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "You must enter a dish name";
      }
    },
    addIng() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter an ingredient";
      }
    },
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient != ing;
      });
    },
    backToDashboard() {
      this.$router.push({ name: "Dashboard" });
    }
  }
};
</script>

<style>
.add-recipe {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.add-recipe h2 {
  font-size: 2em;
  margin: 20px auto;
}

.add-recipe .field {
  margin: 20px auto;
  position: relative;
}

.add-recipe .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaaaaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>