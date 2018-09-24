<template>
  <div class="leftcolumn">
    <div class="card ml-4 mr-4">
      <div class="card-body">
        <div class="form-group">
          <input type="text" class="form-control" id="searchQuery" placeholder="Search article">
        </div>
        <button type="button" class="btn btn-secondary">Search</button>
      </div>
    </div>
    <br><br>
    <div class="card ml-4 mr-4">
      <div class="card-body">
        <button type="button" class="btn btn-secondary">
          <router-link :to="{ name: 'form' }">Write an article</router-link>
        </button>
        <br><br>
        <ul class="list-group">
          <router-link v-for="(article,index) in articles" :key="index" class="list-group-item list-group-item-action"
            :to="{ name: 'details', params: { id: article._id } }">{{ article.title }}</router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'LeftColumn',
    data() {
      return {
        articles: []
      }
    },
    props: ['refresh'],
    methods: {

    },
    created() {
      let self = this
      axios({
          method: 'get',
          url: 'http://localhost:3000/articles/display',
        })
        .then(articles => {
          articles.data.data.forEach(article => {
            self.articles.push(article)
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    watch: {
      refresh: function (newVal, oldVal) {
        let self = this
        axios({
            method: 'get',
            url: 'http://localhost:3000/articles/display',
          })
          .then(articles => {
            self.articles = []
            articles.data.data.forEach(article => {
              self.articles.push(article)
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>


<style scoped>
  .list-group {
    text-align: left;
  }

  h3 {
    margin: 40px 0 0;
  }

  button a {
    text-decoration: none;
    color: white;
  }

  .list-group-item:hover {
    background-color: #d0d9d2;
  }

  .list-group-item-action.active {
    background-color: #15441e;
  }
</style>