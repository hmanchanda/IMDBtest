<template>
<div class="full-width q-pa-lg">
<div class="row q-col-gutter-lg">
  <q-input
      v-model="idSearch"
      debounce="500"
      class="col-6"
      placeholder="Search By IMDB IDs"
      dense
      outlined
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  <q-input
      v-model="titleSearch"
      debounce="500"
      class="col-6"
      placeholder="Search By Title"
      dense
      outlined
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
</div>

<q-separator class="q-my-md"/>
  
  <div class="full-width">
  <div class="row q-col-gutter-md" >
  <div class="col-3 cursor-pointer" v-for="movie in movieList" :key="movie.imdbID">
      <q-card v-if="movie.imdbID" class="full-width" @click="showMovieDetails(movie)">
      <q-img :src=movie.Poster />

      <q-card-section>
        

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{movie.Title}}
          </div>
          <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
            <q-btn flat round  v-if="movie.favourite" color="red" @click.stop="movie.favourite = !movie.favourite" icon="favorite" />
            <q-btn flat round v-else color="red" @click.stop="movie.favourite = !movie.favourite" icon="favorite_border" />
          </div>
        </div>

        <q-rating :model-value="movie.imdbRating ? +movie.imdbRating/2 : 0" :max="5" color="orange" readonly size="32px" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          {{movie.Genre}}
        </div>
        <div class="text-caption text-grey">
          {{movie.Actors}}
        </div>
      </q-card-section>

    </q-card>
  </div>
  </div>
  </div>

  <q-dialog v-model="movieDetailDialog">
      <q-card class="my-card" style="width: 350px;">
        <q-img v-if="selectedMovie" :src=selectedMovie.Poster />

      <q-card-section>
        

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{selectedMovie.Title}}
          </div>
          <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
            <q-btn flat round  v-if="selectedMovie.favourite" color="red" @click="selectedMovie.favourite = !selectedMovie.favourite" icon="favorite" />
            <q-btn flat round v-else color="red" @click="selectedMovie.favourite = !selectedMovie.favourite" icon="favorite_border" />
          </div>
        </div>

        <q-rating :model-value="selectedMovie.imdbRating ? +selectedMovie.imdbRating/2 : 0"  :max="5" color="orange" readonly size="32px" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          {{selectedMovie.Genre}}
        </div>
      </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="row">
            <div class="col-4">Release Year:</div>
            <div class="col-8">{{selectedMovie.Released}}</div>
            </div>
            <div class="row">
            <div class="col-4">Runtime:</div>
            <div class="col-8">{{selectedMovie.Runtime}}</div>
            </div>
            <div class="row">
            <div class="col-4">Director:</div>
            <div class="col-8">{{selectedMovie.Director}}</div>
            </div>
            <div class="row">
            <div class="col-4">Writer:</div>
            <div class="col-8">{{selectedMovie.Writer}}</div>
            </div>
            <div class="row">
            <div class="col-4">Language:</div>
            <div class="col-8">{{selectedMovie.Language}}</div>
            </div>
            <div class="row">
            <div class="col-4">Plot:</div>
            <div class="col-8">{{selectedMovie.Plot}}</div>
            </div>
            <div class="row">
            <div class="col-4">Awards:</div>
            <div class="col-8">{{selectedMovie.Awards}}</div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    </div>
</template>

<style>
</style>

<script>
export default {
  data(){
    return {
      idSearch: [],
      titleSearch:'',
      movieList:[],
      apiKey:'98dfb1e4',
      url:'http://www.omdbapi.com/?',
      movieDetailDialog: false,
      selectedMovie: {}
    }
    
  },
  watch: {
    idSearch: function (val) {
      if(val){
        const idArr = val.split(',');
        this.getMoviesByIds(idArr);
      }
      
    },
    titleSearch: function (val) {
      if(val){this.getMoviesByTitle(val);}
      
    }
  },
  methods: {
  //tt13199716, tt0120737, tt0120338, tt3896198
    showMovieDetails(movie){
      this.selectedMovie = movie;
      this.movieDetailDialog = true;
    
    },


    getMoviesByIds(val){
      this.titleSearch = '';
      this.movieList = [];
      for(let i = 0; i<val.length; i++){
        this.axios.get(this.url + 'i=' + val[i].trim() + '&apikey=98dfb1e4').then(response => {
          this.movieList.push(response.data)            
        })
      }
    },
    getMoviesByTitle(val){
      this.movieList = [];
      this.idSearch = '';
      this.axios.get(this.url + 't=' + val + '&apikey=98dfb1e4').then(response => {
        this.movieList.push(response.data)
      })
    }
  }
}
</script>

