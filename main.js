var groupInfo;
var groupId, groupName;
            
var url = new URL(window.location);
var params = url.searchParams;
var accessToken = "?token=" + params.get("access_token");
var apiLink = "https://api.groupme.com/v3/groups";
var quote, author, poster, reveal;
function init() {
    if (accessToken == null) {
        window.alert("The app is not authorized! Click the authorization link");
        window.location = "https://oauth.groupme.com/oauth/authorize?client_id=ZDxIRTOlmsiv6iOwlmLextWonlTK5vGqB6rWI8J2dnJfkiRB";
}
else {
   quote = document.getElementById("quote");
   author = document.getElementById("author");
   poster = document.getElementById("poster");
   reveal = document.getElementById("reveal");
   pickGroup();
   loadAllQuotes();

}  
} 


function revealAnswer() {
    reveal.style.display = "inline";
}

function pickGroup() {
                var quoteRequest = new XMLHttpRequest();
                quoteRequest.open("GET", apiLink+accessToken, false);
            
                quoteRequest.send();                  
                var resp = quoteRequest.response;
                groupInfo = JSON.parse(resp);
                var response = groupInfo.response;
                
                for(var i = 0; i < response.length; i++) {
                    quote.innerHTML += response[i].name + "</br>";
                    if (response[i].name == "Quote Book") {
                        groupId = response[i].id;
                        groupName = response[i].name;
                    }
                }
            }


var quoteBook = [];
var numBooks = 1;
function loadAllQuotes() {
    // request a new batch of 100 messages from selected group
    // add them to the quotebook
    // while message count > 0, continue
    var cont = true;
    var earliestMessage;
    var i = 1;
    while(i <= numBooks && cont) {
        var msgReq = new XMLHttpRequest();
        var before = "";
        if (earliestMessage != null) {
            before = "&before_id=" + earliestMessage;
        }
        msgReq.open("GET", apiLink+"/"+groupId+"/messages"+accessToken+before, false);
        msgReq.send();
        var msgResp = JSON.parse(msgReq.response).response;
        console.log(msgResp);
        if (numBooks == 1) {
            numBooks = msgResp.count / 20;
            console.log(numBooks);
        }

        if (i == 100) {
            cont = false;
        }
        else {
            quoteBook[i] = msgResp.messages;
            i++;
        }
        earliestMessage = msgResp.messages[19].id;
    }
    console.log("All quotes loaded");
}


function newQuote() {
    var randBookNum = Math.floor(Math.random()*quoteBook.length);
    var randBook = quoteBook[randBookNum];
    console.log(randBook);
    var randMsgNum = Math.floor(Math.random()*randBook.length);
    var randMsg = randBook[randMsgNum];
    var message = randMsg.text.split("-");
    reveal.style.display = "none";
    quote.innerHTML = message[0];
    author.innerHTML = message[1];
    poster.innerHTML = randMsg.name;
}
