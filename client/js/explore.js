const backendUrl = 'http://167.71.82.123:8081';
const apiToken = localStorage.getItem('token');
const followBtns = document.querySelectorAll('.follow-btn');
const allContent = document.querySelectorAll('.display-content')
const followUsers = document.getElementById('followContainer');
const profileName = document.getElementById('profile-name')
const profileEmail = document.getElementById('profile-email')
const followingUsers = document.getElementById('followingContainer')


function loadUserInfo() {
  return fetch('http://167.71.82.123:8081/me', {
  headers: {
    Authorization: apiToken,
  },
})
  .then((response) => response.json())
  .then((tweetsArray) => {
      const userName = document.createElement('a')
      userName.href = 'https://www.google.com/'
      userName.target = '_blank';
      userName.innerText = tweetsArray.name;
      userName.style.color = "black";
      userName.style.fontWeight = "bold";
      userName.style.fontSize = "12px";
      profileName.appendChild(userName);

      const userEmail = document.createElement('p')
      userEmail.innerText = tweetsArray.email;
      userEmail.style.color = "#5B7083";
      userEmail.style.fontSize = "12px";
      profileEmail.appendChild(userEmail);
  })
  .catch((error) => {
    console.error("error fetching user info: ", error);
  });
}

loadUserInfo();

followBtns.forEach((follow, index) => {
  follow.addEventListener('click', (e)=>{
    followBtns.forEach(follow=>{follow.classList.remove('active')});
    follow.classList.add('active');
    let line = document.querySelector('.follow-btn-line');
    line.style.width = e.target.offsetWidth + 50 + "px";
    
    const lineWidth = parseInt(line.style.width); 
    const buttonWidth = e.target.offsetWidth;
    const buttonLeft = e.target.offsetLeft;
    const lineLeft = buttonLeft + (buttonWidth - lineWidth) / 2;
    line.style.left = lineLeft + "px";
    
    allContent.forEach(content => {content.classList.remove('active')});
    allContent[index].classList.add('active');
  })
})

function loadUsersToFollow() {
  return fetch ('http://167.71.82.123:8081/users', {
    headers: {
      Authorization: apiToken,
    },
  })
  .then(( response) => response.json())
  .then((fetchedUsers) => {
    fetchedUsers.forEach((user) => {
      if(user.following == false) {
        const followContainer = document.createElement('div')

        const followUserNameContainer = document.createElement('div');
        followUserNameContainer.classList.add('follow-user-container')
        
  
        const followUserImage = document.createElement('img');
        followUserImage.src = './img/profile.png';
        followUserImage.style.width = "35px";
        followUserImage.style.height = "35px";
        followUserImage.style.borderRadius = "9999px";
        
  
        const followUserName = document.createElement('a');
        followUserName.href = "/users";
        followUserName.textContent = `${user.name}`
        followUserName.innerText = user.name;
        followUserName.style.color = "#1da1f2";
        followUserName.style.fontWeight = "bold";
        followUserName.style.minWidth = "100px"
  
        const followBtn = document.createElement('button');
        followBtn.innerHTML = "Follow";
        followBtn.classList.add('follow-button');
        
        followBtn.addEventListener('click', () => {
          followBtn.innerHTML = "Followed"
          followBtn.style.background = "green";
          const exploreUrl = `${backendUrl}/users/follow/${user._id}`;
  
          fetch(exploreUrl, {
            method: "POST",
            headers: {
              Authorization: apiToken,
            },
          })
          .then((response) => {
            if (response.ok) {
              user.following = true;
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
        });

        followUserNameContainer.appendChild(followUserImage);
        followUserNameContainer.appendChild(followUserName);
        followUserNameContainer.appendChild(followBtn);
        followContainer.appendChild(followUserNameContainer);
        followUsers.appendChild(followContainer);
      }
    })
  })
  .catch((error) => {
    console.error('Error fetching users:', error);
  });
}

loadUsersToFollow();


function loadUsersAlreadyFollowing() {
  return fetch ('http://167.71.82.123:8081/users', {
    headers: {
      Authorization: apiToken,
    },
  })
  .then(( response) => response.json())
  .then((fetchedUsers) => {
    fetchedUsers.forEach((user) => { 
      if (user.following !== false) {
        const followingContainer = document.createElement('div')

        const followingUserNameContainer = document.createElement('div');
        followingUserNameContainer.classList.add('follow-user-container')
        
  
        const followingUserImage = document.createElement('img');
        followingUserImage.src = './img/profile.png';
        followingUserImage.style.width = "35px";
        followingUserImage.style.height = "35px";
        followingUserImage.style.borderRadius = "9999px";
        
  
        const followingUserName = document.createElement('a');
        followingUserName.href = `/users/${user.id}`;
        followingUserName.textContent = `${user.name}`
        followingUserName.innerText = user.name;
        followingUserName.style.color = "#1da1f2";
        followingUserName.style.fontWeight = "bold";
        followingUserName.style.minWidth = "100px"

        const unFollowBtn = document.createElement('button');
        unFollowBtn.innerHTML = "Unfollow";
        unFollowBtn.classList.add('follow-button'); // Исправить в СSS позже

        unFollowBtn.addEventListener('click', () => {
          unFollowBtn.innerHTML = "Unfollowed";
          unFollowBtn.style.background = "red";

          const exploreUrl = `${backendUrl}/users/follow/${user._id}`;
  
          fetch(exploreUrl, {
            method: "POST",
            headers: {
              Authorization: apiToken,
            },
          })
          .then((response) => {
            if (response.ok) {
              user.following = false;
              followingUsers.removeChild(followingContainer);
            } 
          })
          .catch((error) => {
            console.log("error", error);
          });
        });



        followingUserNameContainer.appendChild(followingUserImage);
        followingUserNameContainer.appendChild(followingUserName);
        followingUserNameContainer.appendChild(unFollowBtn);
        followingContainer.appendChild(followingUserNameContainer);
        followingUsers.appendChild(followingContainer);
      }
    })
  })
}

loadUsersAlreadyFollowing();