const sliderEl = document.querySelector('.slider')
const dotsContainerEl = document.querySelector('.dots-container')

async function fetchListOfImages() {
  try {
    const response = await fetch('https://picsum.photos/v2/list?page=1&limit=10', {
      method :'GET'
    })

    const imagesList = await response.json();
    if(imagesList && imagesList.length > 0) displayImages(imagesList)
    console.log(imagesList)
       
  } catch (error) {
    console.log(error)
  }
}

function displayImages(getImagesList) {
  
  sliderEl.innerHTML = getImagesList.map((item) => `
    <div class='slide'>
     <img src= ${item.download_url} alt=${item.id} />
    </div>
    `
  ).join('');

  dotsContainerEl.innerHTML = getImagesList.map((item, index) => `
  <span class="dot ${index === 0 ? 'active' : ''} "  data-slide=${index}></span>
  `
).join('');
}

fetchListOfImages()

// slider functionality begins 

setTimeout(() =>{
  const slidesEl = document.querySelectorAll('.slide')
  const prevBtn = document.querySelector('.prev')
  const nextBtn = document.querySelector('.next')

  let currentSlide = 0;

  function activeDot(slide) {
    document.querySelectorAll('.dot').forEach(dotItem=> dotItem.classList.remove('active'))
    document.querySelector(`.dot[data-slide='${slide}']`).classList.add('active')
 }

 function changeCurrentSlide(currentSlide) {
    slidesEl.forEach(
      (slideItem, index)=> (slideItem.style.transform = `translateX(${100* (index -currentSlide)}%)`)
    );
 }

 changeCurrentSlide(currentSlide)

 nextBtn.addEventListener('click', ()=>{
   currentSlide++

   if(slidesEl.length -1 < currentSlide) {
     currentSlide = 0
   }

   changeCurrentSlide(currentSlide)
   activeDot(currentSlide)
 });

 prevBtn.addEventListener('click', ()=>{
    currentSlide--

    if(0 > currentSlide) {
     currentSlide = slidesEl.length -1;
    }

    changeCurrentSlide(currentSlide)
    activeDot(currentSlide)
 });

 dotsContainerEl.addEventListener('click', (event)=>{
   console.log(event.target.classList, event.target.dataset);

   if(event.target.classList.contains('dot')){
    const currentSlide = event.target.dataset.slide
    changeCurrentSlide(currentSlide)
    activeDot(currentSlide)
   }
 });

},1000);

