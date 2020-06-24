<template>
  <div v-if="dish" class="edit-recipe container" @keydown.esc="backToDashboard">
    <h2>Ubah resep {{dish.title}}</h2>
    <form @submit.prevent="editRecipe">
      <div class="field title">
        <label for="title">Nama makanan:</label>
        <input type="text" name="title" v-model="dish.title" />
      </div>
      <div v-for="(ing, index) in dish.ingredients" :key="index" class="field">
        <label for="ingredient">Bahan:</label>
        <input type="text" name="ingredient" v-model="dish.ingredients[index]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Tambah bahan:</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another" />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="btn pink" @click="editRecipe" @keydown.enter="editRecipe">Ubah resep</button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from "slugify";
import db from "../firebase/init";

export default {
  title: "Resepi - Ubah resep",
  name: "EditRecipe",
  data() {
    return {
      dish: null,
      another: null,
      feedback: null
    };
  },
  created() {
    let ref = db
      .collection("dishes")
      .where("slug", "==", this.$route.params.slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.dish = doc.data();
        this.dish.id = doc.id;
      });
    });
  },
  methods: {
    addIng() {
      if (this.another) {
        this.dish.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter an ingredient";
      }
    },
    deleteIng(ing) {
      this.dish.ingredients = this.dish.ingredients.filter(ingredient => {
        return ingredient != ing;
      });
    },
    backToDashboard() {
      this.$router.push({ name: "Dashboard" });
    },
    editRecipe() {
      if (this.dish.title) {
        this.feedback = null;
        this.dish.slug = slugify(this.dish.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("dishes")
          .doc(this.dish.id)
          .update({
            title: this.dish.title,
            ingredients: this.dish.ingredients,
            slug: this.dish.slug
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
    }
  }
};
</script>

<style scoped>
.edit-recipe {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.edit-recipe h2 {
  font-size: 2em;
  margin: 20px auto;
}

.edit-recipe .field {
  margin: 20px auto;
  position: relative;
}

.edit-recipe .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaaaaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>