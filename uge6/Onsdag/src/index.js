import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import "./jokeFacade"
import jokeFacade from "./jokeFacade"

document.getElementById("all-content").style.display = "block"

/* 
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

/* JS For Exercise-1 below */
function showAllJokes(){
  let jokes=jokeFacade.getJokes().map(joke=>"<li>"+joke+"</li>").join("\n")
  document.getElementById("jokes").innerHTML=jokes
}
showAllJokes()



document.getElementById("formjoke").addEventListener("submit", function (event) {
  event.preventDefault();
  let id = document.getElementById("jokeid").value;
 document.getElementById("ex1joke").innerHTML="<h1>"+jokeFacade.getJokeById(id)+"</h1>"
});


document.getElementById("formaddjoke").addEventListener("submit", function (event) {
  event.preventDefault();
  let joke= document.getElementById("joketxt").value;
  document.getElementById("joketxt").value=""
 jokeFacade.addJoke(joke);
 showAllJokes();
});
/* JS For Exercise-2 below */

function postChuckJoke(){
  fetch('https://api.chucknorris.io/jokes/random')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
   document.getElementById("chuckjoke").innerHTML=data.value+"<br>url: "+data.url;
 });
 

 

}

document.getElementById("chuck").addEventListener("click", function (event) {
  event.preventDefault();
  postChuckJoke();
});

setInterval(function(){postChuckJoke(); }, 6000);
/* JS For Exercise-3 below */
   

/* 
Do NOT focus on the code below, UNLESS you want to use this code for something different than
the Period2-week2-day3 Exercises
*/

function hideAllShowOne(idToShow) {
  document.getElementById("about_html").style = "display:none"
  document.getElementById("ex1_html").style = "display:none"
  document.getElementById("ex2_html").style = "display:none"
  document.getElementById("ex3_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "ex1": hideAllShowOne("ex1_html"); break
    case "ex2": hideAllShowOne("ex2_html"); break
    case "ex3": hideAllShowOne("ex3_html"); break
    default: hideAllShowOne("about_html"); break
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");



