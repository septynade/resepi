<template>
  <div class="dashboard container">
    <div class="card" v-for="dish in dishes" :key="dish.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteDish(dish.id)">delete</i>
        <h2 class="indigo-text">{{dish.title}}</h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in dish.ingredients" :key="index">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{name: 'EditRecipe', params: {slug: dish.slug}}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "../firebase/init";

export default {
  title: "Resepi - Dashboard",
  name: "Dashboard",
  created() {
    db.collection("dishes")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let dish = doc.data();
          dish.id = doc.id;
          this.dishes.push(dish);
        });
      });
  },
  data() {
    return {
      dishes: []
    };
  },
  methods: {
    deleteDish(id) {
      db.collection("dishes")
        .doc(id)
        .delete()
        .then(() => {
          this.dishes = this.dishes.filter(dish => {
            return dish.id != id;
          });
        });
    }
  }
};
</script>

<style>
.dashboard {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}

.dashboard h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}

.dashboard .ingredients {
  margin: 30px auto;
}

.dashboard .ingredients li {
  display: inline-block;
}

.dashboard .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>