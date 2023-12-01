const apiToken = localStorage.getItem('token');
const tweetInput = document.getElementById('tweet-input');
const feedForm = document.getElementById('feed-form');
const tweetsField = document.getElementById('tweets')
const profileName = document.getElementById('profile-name')
const profileEmail = document.getElementById('profile-email')

// const profileUserName = document.createElement('p')
// profileUserName.innerText = tweets.user.name;
// profileName.appendChild(profileUserName);

function loadUserInfo() {
  return fetch('http://167.71.82.123:8081/tweets', {
  headers: {
    Authorization: apiToken,
  },
})
  .then((response) => response.json())
  .then((tweetsArray) => {
    tweetsArray.forEach(tweet => {
      const userName = document.createElement('p')
      userName.innerText = tweet.user.name;

      profileName.appendChild(userName);
    });
  })
  .catch((error) => {
    console.error("error fetching user info: ", error);
  });
}

loadUserInfo();

    
function loadTweets() {
  return fetch("http://167.71.82.123:8081/tweets", {
    headers: {
      Authorization: apiToken,
    },
  })
    .then((response) => response.json())
    .then((tweets) => {

      tweets.forEach(tweet => {
        const tweetContainer = document.createElement('div');
        tweetContainer.style.marginTop = "35px";
        
        const userImage = document.createElement("img");
        userImage.src = './img/profile.png'
        userImage.style.width = "35px";
        userImage.style.height = "35px";
        userImage.style.borderRadius = "9999px";

        const tweetTime = document.createElement('p');
        tweetTime.innerText = "Created on " + tweet.createdAt;
        tweetTime.style.fontSize = "10px";
        tweetTime.style.color = "red";
        tweetTime.style.marginTop = "5px";

        const tweetId = document.createElement('p')
        tweetId.innerText = tweet.user.name;
        tweetId.style.color = "#1da1f2";
        tweetId.style.fontWeight = "bold";
    
        const tweetText = document.createElement('p')
        tweetText.innerText = tweet.text;
        tweetText.style.marginTop = "7px";
    
        tweetContainer.appendChild(userImage);
        tweetContainer.appendChild(tweetId);
        tweetContainer.appendChild(tweetText);
        tweetContainer.appendChild(tweetTime);
        tweetsField.appendChild(tweetContainer);
        
      });
    })  
    .catch((error) => {
      console.error('Error fetching tweets:', error);
    });
}

loadTweets();


feedForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const tweetInputValue = tweetInput.value;
  fetch("http://167.71.82.123:8081/tweets", {
    method: "POST",
    body: JSON.stringify({
      text: tweetInputValue
    }),
    headers: {
      Authorization: apiToken,
      "Content-Type": "application/json; charset=utf-8"
    },
  }).then(response => response.json()).then((data) => {
    console.log('Tweet posted:', data);
  })
  .catch((error) => {
    console.error("Error posting tweet:", error);
  })
});

fetch(`${backendUrl}/tweets`, {
    headers: {
        Authorization: apiToken,
    },
})
    .then(r => r.json())
    .then(console.log);
