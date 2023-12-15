const followBtns = document.querySelectorAll('.follow-btn');
const allContent = document.querySelectorAll('.display-content')

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