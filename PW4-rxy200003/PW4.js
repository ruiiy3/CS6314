async function loadDoc() {
   
    const response =  await fetch('movies.xml');
    const rexml = await response.text();
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(rexml,"text/xml"); 
    //const xml = await(new window.DOMParser()).parseFromString(rexml, "text/xml");  
  var mov = xmlDoc.getElementsByTagName('movie');
  var title, genre, director, cast, imdb, description, rate;
  var table="<tr><th>Title</th><th>Genre</th><th>Director</th><th>Cast</th><th>Short Description</th><th>IMDB-rating</th></tr>";
  
  for (let movie of mov) { 
      title = movie.querySelector("title").childNodes[0].nodeValue;
      //title = movie.getElementsByTagName("title")[0]

      genre = movie.querySelectorAll("genre");
      console.log(genre);
      var g = "";
      for(let i = 0; i < genre.length; i++) {
            if(i == genre.length - 1)
                g += genre[i].childNodes[0].nodeValue;
            else
                g += genre[i].childNodes[0].nodeValue + ', ';
      }
      director = movie.querySelector("director").childNodes[0].nodeValue;
      cast = movie.querySelectorAll("person");
      console.log(cast);
      var p = "";
      for(let j = 0; j < cast.length; j++) {
        if(j == cast.length - 1)
            p += cast[j].getAttribute("name");
        else
            p += cast[j].getAttribute("name")+ ", "; 
    }
      imdb = movie.querySelector("imdb-info");
      description = imdb.querySelector("synopsis").childNodes[0].nodeValue;   
      rate = imdb.querySelector("score").childNodes[0].nodeValue;
      //table += "<tr><td>" + title + "</td></tr>";
      
      table += "<tr><td>" + title +
      "</td><td>" + g +
      "</td><td>" + director +
      "</td><td>" +  p + 
      "</td><td>" + description +
      "</td><td>" + rate +
       "</td></tr>";
    //console.log(table);
  }
  
  document.querySelector("table").innerHTML = table;
  

        
    
}
