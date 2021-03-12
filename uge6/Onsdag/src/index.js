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
function handleHttpErrors(res){
  if(!res.ok){
    return Promise.reject({status: res.status, fullError: res.json() })
  }
  return res.json();
 }
 
function makeOptions(method, body) {
  var opts =  {
    method: method,
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    }
  }
  if(body){
    opts.body = JSON.stringify(body);
  }
   return opts;
 }
 
function showAllUsers(){
  fetch('http://localhost:3333/api/users')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    const users=data.map(user=>`<tr>
    <td>${user.id}</td>
    <td>${user.age}</td>
    <td>${user.name}</td>
    <td>${user.gender}</td>
    <td>${user.email}</td>
    
    </tr>`).join("\n")
    document.getElementById("allUserRows").innerHTML=users
  }  
 );}

function deleteuser(id){
const options=makeOptions("DELETE");
fetch("http://localhost:3333/api/users/"+id,options)
.then(handleHttpErrors).then(function(data) {
  document.getElementById("pex3").innerHTML="";

  showAllUsers() 
}  
).catch(err =>{
  if(err.status){
    err.fullError.then(e=> document.getElementById("pex3").innerHTML=e.status+": "+e.msg)
  }
  else{console.log("Network error"); }
});
 ;}

function addUser(user){
  const options=makeOptions("POST",user);
  fetch("http://localhost:3333/api/users/",options)
  .then(handleHttpErrors)
  .then(function(data) {
    document.getElementById("pex3").innerHTML="";
    showAllUsers();
  })
  .catch(err =>{
    if(err.status){
      err.fullError.then(e=> document.getElementById("pex3").innerHTML=e.status+": "+e.msg)
    }
    else{console.log("Network error"); }
  });
   ;}

  function editUser(user){
    const options=makeOptions("PUT",user);
    fetch("http://localhost:3333/api/users/"+user.id,options)
    .then(handleHttpErrors) 
    .then(function(data) {
      document.getElementById("pex3").innerHTML="";
      showAllUsers();
    })
    .catch(err =>{
      if(err.status){
        err.fullError.then(e=> document.getElementById("pex3").innerHTML=e.status+": "+e.msg)
      }
      else{console.log("Network error"); }
    });
     ;}
  
 function showUserById(id){
  fetch("http://localhost:3333/api/users/"+id)
  .then(handleHttpErrors)
  
  .then(function(data) {
    const user=`
    ${data.id}<br>
    ${data.age}<br>
    ${data.name}<br>
    ${data.gender}<br>
    ${data.email}<br>`
    document.getElementById("foundUser").innerHTML=user;
    document.getElementById("pex3").innerHTML="";
  } 
 ).catch(err =>{
  if(err.status){
    err.fullError.then(e=> document.getElementById("pex3").innerHTML=e.status+": "+e.msg)
  }
  else{console.log("Network error"); }
});
 ;}

 function findUserById(id){
  fetch("http://localhost:3333/api/users/"+id)
  .then(handleHttpErrors)
    .then(function(data) {
    document.getElementById("userEditId").value=data.id;
    document.getElementById("userEditAge").value=data.age;
    document.getElementById("userEditName").value=data.name;
    document.getElementById("userEditGender").value=data.gender;
    document.getElementById("userEditEmail").value=data.email;
    document.getElementById("pex3").innerHTML="";
  }  
  ).catch(err =>{
    if(err.status){
      err.fullError.then(e=> document.getElementById("pex3").innerHTML=e.status+": "+e.msg)
    }
    else{console.log("Network error"); }
  });
   ;}

 document.getElementById("formUser").addEventListener("submit", function (event) {
  event.preventDefault();
  let id = document.getElementById("userId").value;
 showUserById(id)
});

document.getElementById("formUserDelete").addEventListener("submit", function (event) {
  event.preventDefault();
  let id = document.getElementById("userDeleteId").value;
  deleteuser(id)
});
document.getElementById("userFindUser").addEventListener("click", function (event) {
  event.preventDefault();
  let id = document.getElementById("userEditId").value;
  findUserById(id)
});


document.getElementById("formAddUser").addEventListener("submit", function (event) {
  event.preventDefault();
  const age = document.getElementById("userAddAge").value;
  const name=document.getElementById("userAddName").value;
  const gender=document.getElementById("userAddGender").value;
  const email=document.getElementById("userAddEmail").value;
  const user={age: age,name:name,gender:gender,email:email};
  addUser(user);
  showAllUsers();
});
document.getElementById("formEditUser").addEventListener("submit", function (event) {
  event.preventDefault();
  const id= document.getElementById("userEditId").value;
  const age = document.getElementById("userEditAge").value;
  const name=document.getElementById("userEditName").value;
  const gender=document.getElementById("userEditGender").value;
  const email=document.getElementById("userEditEmail").value;
  const user={age: age,name:name,gender:gender,email:email,id:id};
  editUser(user);
  showAllUsers();
});

 showAllUsers();
 
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



