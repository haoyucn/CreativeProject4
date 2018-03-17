const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))


let favorites = [];
let id = 0;

app.get('/api/favorites', (req, res) => {
  res.send(favorites);
});

app.post('/api/addToFav',(req,res) => {
  let song = {
    image: req.body.song.image,
    trackName : req.body.song.trackName,
    artistName: req.body.song.artistName,
    GenreName: req.body.song.primaryGenreName,
    releaseDate: req.body.song.releaseDate,
    previewUrl: req.body.song.previewUrl,
    itunesUrl: req.body.song.trackViewUrl,
    songid: id,
  }
  id++;
  favorites.push(song);
  console.log(favorites);
  res.send(favorites);
});

app.delete('/api/delete/:id',(req,res) => {
  let id = parseInt(req.params.id);
  let removeIndex = favorites.map(song => {return song.songid;}).indexOf(id);
  if (removeIndex === -1) {
    res.status(404).send("Sorry, that item doesn't exist");
    return;
  }
  favorites.splice(removeIndex,1);
    res.sendStatus(200);
});


app.put('/api/sort',(req,res) => {
  favorites.sort(function(a,b){
    if(a.trackName < b.trackName) return -1;
    if(a.trackName > b.trackName) return 1;
    return 0;
  });
  res.sendStatus(200);
});

app.listen(3090, () => console.log('Server listening on port 3090!'))
