let differenceInDays = require('date-fns/differenceInDays');

/* array of post objects */
var allPosts = [];

/* object constructur */
function PostObject(name, message) {
    this.name = name;
    this.message = message;
    this.timestamp = new Date();
};

document.getElementById("submit").addEventListener("click", function () {
    let name = document.getElementById("name").value;
    let message = document.getElementById("message").value;   
    allPosts[allPosts.length] = new PostObject(name, message); // add to the end of allPosts

    //convert array of object into string json and save to local storage
    localStorage.setItem("myMessages", JSON.stringify(allPosts));
});

//fetch allPosts from local storage, if it exists
if (localStorage.length !== 0) {
allPosts = JSON.parse(localStorage.getItem("myMessages")); 
console.log(allPosts);
}

  // loop array
  for (var i in allPosts) {
      let pastTimestamp = new Date(allPosts[i].timestamp);
      let nowTimestamp = new Date();
      let result = differenceInDays(nowTimestamp, pastTimestamp);
      
      if (result == 0){
        document.getElementById("display").innerHTML += "<br>" + (allPosts[i].name + "<br>" + allPosts[i].message + "<br>" + "Idag" + "<br>" + "<br>");
      }

      else {
        document.getElementById("display").innerHTML += "<br>" + (allPosts[i].name + "<br>" + allPosts[i].message + "<br>" + result + " dagar sedan" + "<br>" + "<br>");
}
}
