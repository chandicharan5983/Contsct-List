let userList = document.querySelector(".name-list");
let listInput = document.querySelector(".list-input");
let button = document.querySelector(".add-button");
let addNewContact = document.querySelector(".add-new-contact");
let contactFun = document.querySelector("#new-contact-fun");
let details = document.querySelector(".details");
let update = document.querySelector(".update");
let preloader = document.querySelector(".loader");


// window.addEventListener('load', function(){
//     preloader.classList.add("hidden");
// })
// function addUser(){
//     let newLi = document.createElement('LI');
//     let contactList = document.createTextNode(listInput.value);
//     newLi.appendChild(contactList);
//     userList.appendChild(newLi);
// }

// button.addEventListener("click", addUser);

// addNewContact.addEventListener("click", function(){ 
// });


function popup(){
    // alert("hello");
    if (contactFun.style.display === "block") {
        contactFun.style.display = "none";
    } 
    else {
        contactFun.style.display = "block";
    }
}

function detailPopup(){
    // alert("hello");
    if (details.style.display === "block") {
        details.style.display = "none";
    } 
    else {
        details.style.display = "block";
    }
}

function updatePopup(){
    //alert("hello");
    if (update.style.display === "block") {
        update.style.display = "none";
    } 
    else {
        update.style.display = "block";
    }
}

contacts = [];

let contact = {};
let addContact = (e) =>{
    e.preventDefault();
    e.stopPropagation();
    contact = {
        name: document.getElementById("name").value,
        phoneno: document.getElementById("number").value,
        email: document.getElementById("email").value
    }
    //contacts.push(contact);
    //document.querySelector('form').reset();
    //console.log('added', {contacts} );

    //let pre = document.querySelector("#msg pre");
    //pre.textContent = '\n' + JSON.stringify(contacts);
    // localStorage.setItem('MyContact', JSON.stringify(contact));
    //len = contacts.length;
    //console.log("lenV= "+len);
    //len = contacts.length-1;
    document.getElementById("form").reset();
    addUser();
    addPost();
}

function addUser(){
    let newLi = document.createElement('li');
    let callButton = document.createElement("button");
    //console.log("len= "+len);
    let newContact = document.createTextNode(contact.Name);
    newLi.appendChild(newContact);
    document.querySelector(".name-list").appendChild(newLi);
    //userList.appendChild(callButton);
    contactFun.style.display = "none";
    getPosts();
    getPosts();
}

//console.log(contacts);

function addPost(e){
    //console.log(contact);
    fetch("https://phonebookappproject.herokuapp.com/api/phonebook/save", {
        method: 'POST',
        mode: 'cors', 
        headers: {
            'Accept': 'application/json',
            'Content-type':'application/json' 
        },
        body: JSON.stringify(contact),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    })
    .catch((err)=>{
        console.log("Error Type", err);
    });
}
let key;
let id;

function getPosts(){
    preloader.style.display="flex";
    fetch("https://phonebookappproject.herokuapp.com/api/phonebook")
    .then((res) => res.json())
    .then((data) => {
        //contacts=data;
        //console.log("Hello");
        id=0;
        key=0;
        let showData = '<h2>Show Contacts</h2>';
        data.forEach(function(post){
            key = post._id;
            showData +=`
            <li>${post.name}
            <button type"${"button"}" id="${id}" onclick="${"updates(id,key)"}">Update</button>
            <button type"${"button"}" id="${"d"+id}" onclick="${"deleteUser(key)"}">Delete</button>
            </li>
            `;
            // key = post._id;
            contacts = data;
            //console.log(contacts);
            //console.log(id);
            id++;
            //console.log(key)
        });
        userList.innerHTML = showData;
        preloader.style.display="none";
    });
}

//document.getElementById("show").addEventListener('click', getPosts());
document.getElementById("save").addEventListener('click', addContact);
//document.getElementsByClassName("name-list").innerHTML=contacts;


function findContact(){
    let inputName = document.getElementById("findId").value;
    fetch("https://phonebookappproject.herokuapp.com/api/phonebook/"+inputName)
    .then((res) => res.json())
    .then((data) => {
        let showData = '<h2>Details</h2>';
        document.getElementById("dName").value = data[0].name;
        document.getElementById("dNumber").value = data[0].phoneno;
        document.getElementById("dEmail").value = data[0].email;
        detailPopup();
    })
    .catch(err =>{
        console.log("Error"+ err);
        alert("Data not found!");
    });

}

let newKey;

function updates(id,key){
    updatePopup();
    newKey = key;
    //console.log("Key: "+ key);
    fetch("https://phonebookappproject.herokuapp.com/api/phonebook")
    .then((res) => res.json())
    .then((data) => {
        //alert("Update");
        document.getElementById("uName").value = data[id].name;
        document.getElementById("uNumber").value = data[id].phoneno;
        document.getElementById("uEmail").value = data[id].email;
    });  
}

function updateData(){
    let updateName= document.getElementById("uName").value;
    let updateNo = document.getElementById("uNumber").value;
    let updateEmail = document.getElementById("uEmail").value;
    fetch("https://phonebookappproject.herokuapp.com/api/phonebook/update", {
        method: 'PATCH',
        mode: 'cors', 
        headers: {
            'Accept': 'application/json',
            'Content-type':'application/json' 
        },
        body: JSON.stringify({
            "id": newKey,
            "name": updateName,
            "phoneno":updateNo,
            "email": updateEmail
        }),
    })
    .then((res) => res.json())
    .then((data) =>{
        update.style.display = "none";
        getPosts();
        return console.log(data);
    })
    .catch(err=>{
        console.log('Error Type', err);
    });
}

//console.log("id: "+id);
//document.querySelector(id).addEventListener('click', updates);

function deleteUser(key){
    fetch("https://phonebookappproject.herokuapp.com/api/phonebook/delete",{
    method: 'delete',
    mode: 'cors', 
    headers: {
        'Accept': 'application/json',
        'Content-type':'application/json'
    },
    body: JSON.stringify({"id": key})
    
    })
    .then((resp) =>{
        console.log(resp); 
        //console.log(key);
        getPosts();
        return resp.json();
    })
    .then((data)=> console.log(data))
    .catch(err=>{
        console.log('Error type', err);
    });
}