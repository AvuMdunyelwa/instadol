import { hamburger } from "../hamburgerMenu.js";

let currentIndex = 0;
let slideInterval = 5000;
const heroBg = document.querySelector('#hero-banner');
const heroText = document.querySelector('#hero-text p');
const imageSlider = [
    {
        image: "heroSlides/njz3.jpg",
        info: "2 of [NEWJEANS] members are not renewing their contract with ADOR",
    },
    {
        image: "heroSlides/bpGroup.jpg",
        info: "The deadline of [BLACKPINK] world tour ticket sale is extended to january 2026",
    },
    {
        image: "heroSlides/theBoyzJuHaknyeon.jpeg",
        info: "Member 주학년 [Ju Haknyeon] leaves THE BOYZ",
    },
    {
        image: "heroSlides/kpopDemonHunters.jpg",
        info: "kpop Demon hunters album is the second most streamed album on YOUTUBE",
    },
    {
        image: "heroSlides/hybeBuilding.png",
        info: "HYBE expands into Africa with TYLA as the first artist to partner with",
    },
];

//view multiple content in the hero slide
function heroBackground() {
    heroBg.style.backgroundImage = `url(${imageSlider[currentIndex].image})`;
    heroText.innerHTML = imageSlider[currentIndex].info;
}
heroBackground();

function changeImage() { 
    currentIndex++;
    if(currentIndex >= imageSlider.length) {
        currentIndex = 0;
    }
    
    heroBg.style.backgroundImage = `url(${imageSlider[currentIndex].image})`
    heroText.innerHTML = imageSlider[currentIndex].info;
}

// showcase multiple images in the hero section
function autoSlide() {
    setInterval(() => {
                changeImage();
    }, slideInterval);
}
autoSlide()

// news article 
//retrieve multiple articles related to the website content

async function articleData() {
    try {
        const response = await fetch('journals/articles.json');
        const data = await response.json();
        loadData(data);
    }catch(error) {
        return error;
    }
}
articleData();

function loadData(data) {
    data.forEach(element => {
        displayArticleCard(element, data.length);  
    });
}

function displayArticleCard(data, length) {
    const newsBlock = document.querySelector('#news-blocks');
    const article = document.createElement('article')
    const coverWrapper = document.createElement('div');
    coverWrapper.classList.add('article-cover');
    const imgCover = document.createElement('img');
    const articleInfo = document.createElement('div');
    articleInfo.classList.add('text');
    const articleAuthor = document.createElement('h4');
    const articleTitle = document.createElement('h3');
    const articleContent = document.createElement('p');
    const articleLink = document.createElement('a');

    for(let i = 0; i < length; i++) {
        imgCover.src = data.image;
        articleAuthor.innerHTML = 'by ' + data.author;
        articleTitle.innerHTML = data.title;
        articleContent.innerHTML = data.summary;
        articleLink.href = data.link;
        articleLink.target = '_blank';
        articleLink.innerHTML = 'READ ARTICLE';
    }

    coverWrapper.appendChild(imgCover);
    articleInfo.append(articleAuthor,articleTitle,articleContent,articleLink);
    article.append(coverWrapper,articleInfo);
    newsBlock.appendChild(article);
}