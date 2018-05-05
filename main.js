var groupId = 36691870;
var url = new URL(window.location);
var params = url.searchParams;
var token = params.get("access_token")
var accessToken = "?token=" + token;
var apiLink = "https://api.groupme.com/v3/groups";
var storage, quote, author, poster, reveal, body, time, currQuote, fullmsg, likes;
var altPoster, altTime, altLikes;
var alt = false;
var messagesViewed;
const NUM_MESSAGES_PER_REQ = 20;

function init() {
  if (token == null) {
    window.location = "https://oauth.groupme.com/oauth/authorize?client_id=ZDxIRTOlmsiv6iOwlmLextWonlTK5vGqB6rWI8J2dnJfkiRB";
  }
  else {
   quote = document.getElementById("quote");
   author = document.getElementById("author");
   poster = document.getElementById("poster");
   reveal = document.getElementById("reveal");
   time = document.getElementById("time");
   likes = document.getElementById("likes");
   fullmsg = document.getElementById("fullmsg");
   altPoster = document.getElementById("altPoster");
   altTime = document.getElementById("altTime");
altLikes = document.getElementById("altLikes");
   storage = window.localStorage;
   messagesViewed = storage.getItem("msgsViewed") || 0;
   loadAllQuotes();
   newQuote();
   document.onkeypress = function (e) {
     e = e || window.event;
      if (e.key == "n") {
        newQuote();
      }
      else if (e.key == "r") {
        revealAnswer();
      }
      else if (e.key == "o"){
        showFullMessage();
      }
   }
   document.getElementById("loading").style.display = "none";
   document.getElementById("app").style.display = "block";
   document.onunload = function () {
     storage.setItem("msgsViewed", messagesViewed);
   }
  }
  
}

function revealAnswer() {
  if(!alt) {
    reveal.style.display = "inline";
  }
  else {
    altReveal.style.display = "inline";
  }
}

var quoteBook = [];
function loadAllQuotes() {
    // request a new batch of NUM_MESSAGES_PER_REQ messages from selected group
    // add them to the quotebook
    // while there are still messages to be loaded, continue
    var cont = true;
    var earliestMessage;
    var numBooks = 1;
    for (var i = 1; i <= numBooks && i < 100; i++) {
        var msgReq = new XMLHttpRequest();
        var before = "";
        if (earliestMessage != null) {
            before = "&before_id=" + earliestMessage;
        }
        msgReq.open("GET", apiLink+"/"+groupId+"/messages"+accessToken+before, false);
        msgReq.send();
        var msgResp = JSON.parse(msgReq.response).response;
        console.log(msgResp);
        if (i == 1) {
          if (msgResp.count == storage.getItem("count")) {
            quoteBook = JSON.parse(storage.getItem('quoteBook'));
            console.log("Updated quote book found!");
            break;
          }
          numBooks = msgResp.count / NUM_MESSAGES_PER_REQ;
          console.log(numBooks);
        }
        quoteBook[i] = msgResp.messages;
        earliestMessage = msgResp.messages[NUM_MESSAGES_PER_REQ-1].id;
    }
    storage.setItem('count', msgResp.count);
    storage.setItem('quoteBook', JSON.stringify(quoteBook));
    console.log("All quotes loaded");
}

function newQuote() {
    fullmsg.innerHTML = "";
    var randBookNum = Math.floor(Math.random()*quoteBook.length);
    var randBook = quoteBook[randBookNum];
    console.log(randBook);
    if(randBook != null) {
    var randMsgNum = Math.floor(Math.random()*randBook.length);
    var randMsg = randBook[randMsgNum];
    console.log(randMsg);
    currQuote = randMsg.text;
    if (randMsg.text == null) {
      currQuote = "";
    }
    var message = currQuote.split("-");
    reveal.style.display = "none";
    altReveal.style.display = "none";
    var postTime = new Date(randMsg.created_at * 1000).toDateString();
    var numLikes = randMsg.favorited_by.length;
    if (message.length == 2) {
      alt = false;
      quote.innerHTML = message[0];
      author.innerHTML = message[1];
      poster.innerHTML = randMsg.name;
      time.innerHTML = postTime;
      likes.innerHTML = numLikes;
      
    }
    else {
      /*alt = true;
      quote.innerHTML = currQuote;
      altPoster.innerHTML = randMsg.name;
      altTime.innerHTML = postTime;
      altLikes.innerHTML = numLikes*/
      newQuote();
    }
    }
    else {
      newQuote();
    }
}

function showFullMessage() {
  fullmsg.innerHTML = "Full quote: " + currQuote;
}