var app = new Vue({
  el: '#app',
  data: {
    musicList: [],
    resultString: '',
    loading: false,
    musicName: '',
  },
  methods: {
    GetSongs: function(){
      console.log("get here");
      this.loading = true;
      this.resultString = "";
      this.musicList = [];
      fetch('https://itunes.apple.com/search?term=' + this.musicName).then(response => {
        return response.json();
      }).then(json =>{
        this.loading = false;
          this.resultString = "Search results for " + this.musicName + " (total of " + json.results.length + " items)";
              for (var i = 0; i < json.results.length; i++) {
                var data = {
                  image: json.results[i].artworkUrl100,
                  trackName : this.truncate(json.results[i].trackName),
                  artistName: this.truncate(json.results[i].artistName),
                  GenreName: this.truncate(json.results[i].primaryGenreName),
                  releaseDate: this.truncateDate(json.results[i].releaseDate),
                  previewUrl: json.results[i].previewUrl,
                  itunesUrl: json.results[i].trackViewUrl,
                };
                this.musicList.push(data);
              }
      })
    },
    truncate: function(string) {
      var tempString = string;
      if (tempString.length > 25) {
        tempString = tempString.substring(0, 25);
        tempString += "...";
      }
      return tempString;
    },
    truncateDate: function(string) {
      return string.substring(0, 10);
    }
  },
  computed: {

  },
  watch: {

  }
});
