import "./style.css"
import "bootstrap/dist/css/bootstrap.css"

document.getElementById("all-content").style.display = "block"

function showAllUsers(){
  fetch('https://osvaldo.dk/running/api/xxx')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    const users=data.map(user=>`<tr>
    <td>${user.str1}</td>
    <td>${user.str2}</td>
    <td>test</td>
    
    
    </tr>`).join("\n")
    document.getElementById("allUserRows").innerHTML=users
  }  
 );}
showAllUsers()
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



