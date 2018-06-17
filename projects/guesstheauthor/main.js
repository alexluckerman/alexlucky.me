var groupId = 36691870;
var url = new URL(window.location);
var params = url.searchParams;
var token = params.get("access_token");
var accessToken = "?token=" + token;
var apiLink = "https://api.groupme.com/v3/groups";
var storage, quote, author, poster, reveal, time, currQuote, likes, currQuoteLiked, prog;

// Show full message support is currently disabled
//var fullmsg;

// Alternate quote format handling is currently disabled
//var alt = false;
//var altPoster, altTime, altLikes;

var messagesViewed;
var NUM_MESSAGES_PER_REQ = 100;
var PROG_AFTER_AUTH = 5;

function init() {
    if (token === null) {
        window.location = "https://oauth.groupme.com/oauth/authorize?client_id=ZDxIRTOlmsiv6iOwlmLextWonlTK5vGqB6rWI8J2dnJfkiRB";
    } else {
        quote = document.getElementById("quote");
        author = document.getElementById("author");
        poster = document.getElementById("poster");
        reveal = document.getElementById("reveal");
        time = document.getElementById("time");
        likes = document.getElementById("likes");
        prog = document.getElementsByTagName("progress")[0];
        prog.value = PROG_AFTER_AUTH;
        /*fullmsg = document.getElementById("fullmsg");
        altPoster = document.getElementById("altPoster");
        altTime = document.getElementById("altTime");
        altLikes = document.getElementById("altLikes");*/
        storage = window.localStorage;
        messagesViewed = parseInt(storage.getItem("msgsViewed")) || 0;
        loadAllQuotes();
        newQuote();
        document.onkeypress = function(e) {
            e = e || window.event;
            if (e.key == "n") {
                newQuote();
            } else if (e.key == "r") {
                revealAnswer();
            } /*else if (e.key == "o") {
                showFullMessage();
            }*/
        };
        document.getElementById("loading").style.display = "none";
        document.getElementById("app").style.display = "block";
        window.onunload = function() {
            storage.setItem("msgsViewed", messagesViewed);
        };
    }
}

function revealAnswer() {
    //if(!alt) {
    reveal.style.display = "inline";
    /*}
    else {
      altReveal.style.display = "inline";
    }*/
}

var quoteBook = [];

function loadAllQuotes() {
    // request a new batch of NUM_MESSAGES_PER_REQ messages from selected group
    // add them to the quotebook
    // while there are still messages to be loaded, continue
    var earliestMessage;
    var numBooks = 1;
    var i, msgResp;
    for (i = 1; i <= numBooks; i++) { //&& i < 100; i++) {
        var msgReq = new XMLHttpRequest();
        var before = "";
        if (earliestMessage !== undefined) {
            before = "&before_id=" + earliestMessage;
        }
        msgReq.open("GET", apiLink + "/" + groupId + "/messages" + accessToken + before + "&limit=" + NUM_MESSAGES_PER_REQ, false);
        msgReq.send();
        msgResp = JSON.parse(msgReq.response).response;
        console.log(msgResp);
        if (i == 1) {
            if (msgResp.count == storage.getItem("count")) {
                quoteBook = JSON.parse(storage.getItem('quoteBook'));
                console.log("Updated quote book found!");
                prog.value = 100;
                break;
            }
            numBooks = Math.ceil(msgResp.count / NUM_MESSAGES_PER_REQ);
            console.log(numBooks);
        }
        prog.value +=  (100 - PROG_AFTER_AUTH) / numBooks;
        var j, k = quoteBook.length, l = msgResp.messages.length;
        console.log("Iteration " + i + ", quoteBook.length=" + k);
        for(j = 0; j < l; j++) {
            console.log(j+k);
            quoteBook[j+k] = msgResp.messages[j];
        }
        //quoteBook[i] = msgResp.messages;
        earliestMessage = msgResp.messages[l - 1].id;
    }
    prog.value = 100;
    storage.setItem('count', msgResp.count);
    storage.setItem('quoteBook', JSON.stringify(quoteBook));
    console.log("All quotes loaded");
}

function newQuote() {
    //fullmsg.innerHTML = "";
    
    var randMsgNum = Math.floor(Math.random() * quoteBook.length);
    console.log(randMsgNum);
    //var randBookNum = Math.floor(Math.random() * quoteBook.length);
    //var randBook = quoteBook[randBookNum];
    //console.log(randBook);
    //if (randBook !== null) {
        //var randMsgNum = Math.floor(Math.random() * randBook.length);
        //var randMsg = randBook[randMsgNum];
        var randMsg = quoteBook[randMsgNum];
        console.log(randMsg);
        currQuote = randMsg.text;
        if (randMsg.text === null) {
            currQuote = "";
        }
        var message = currQuote.split("-");
        reveal.style.display = "none";
        //altReveal.style.display = "none";
        var postTime = new Date(randMsg.created_at * 1000).toDateString();
        var numLikes = randMsg.favorited_by.length;
        //curQuoteLike =
        if (message.length == 2 && message[0].length > 0 && numLikes >= 2) {
            //alt = false;
            quote.innerHTML = message[0];
            author.innerHTML = message[1];
            poster.innerHTML = randMsg.name;
            time.innerHTML = postTime;
            likes.innerHTML = numLikes;
            messagesViewed++;
        } else {
            /*alt = true;
            quote.innerHTML = currQuote;
            altPoster.innerHTML = randMsg.name;
            altTime.innerHTML = postTime;
            altLikes.innerHTML = numLikes*/
            newQuote();
        }
    /*} else {
        newQuote();
    }*/
}

/*function showFullMessage() {
    fullmsg.innerHTML = "Full quote: " + currQuote;
}*/

function toggleLike() {
    if (curQuoteLiked === true) {
        //unlike
    }
    else {
        //like
    }
}