"use strict";

/* ==========================================
   MOON JOURNEY v3
========================================== */

/* =========================
DOM ELEMENTS
========================= */

const intro = document.getElementById("intro");
const journey = document.getElementById("journey");
const slider = document.getElementById("slider");

const beginButton = document.getElementById("beginButton");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");

const progress = document.getElementById("progress");

const backgroundMusic =
document.getElementById("backgroundMusic");

const musicButton =
document.getElementById("musicButton");

const loadingScreen =
document.getElementById("loadingScreen");

const finalSection =
document.getElementById("finalSection");

const blessingTitle =
document.getElementById("blessingTitle");

const blessingVerse =
document.getElementById("blessingVerse");

const blessingReference =
document.getElementById("blessingReference");

const letterSection =
document.getElementById("letterSection");

const letterText =
document.getElementById("letterText");

const replayButton =
document.getElementById("replayButton");

const lastMessageButton =
document.getElementById("lastMessageButton");


/* =========================
APP STATE
========================= */

let currentSlide = 0;

let musicPlaying = false;

let journeyStarted = false;


/* =========================
HELPERS
========================= */

function pad(number){

    return String(number).padStart(2,"0");

}

function updateProgress(){

    progress.textContent =
    `${pad(currentSlide+1)} / 18`;

}


/* =========================
FINAL BLESSING
========================= */

const finalBlessing={

title:"A Blessing For Your Journey",

verse:"May He give you the desire of your heart and make all your plans succeed.",

reference:"Psalm 20:4"

};
/* =========================
JOURNEY DATA
========================= */

const journeyData = [

{
    year:2009,
    date:"03 August",
    image:"2009.png",
    phase:"Full Moon",
    illumination:"100%",
    title:"The Beginning",
    wish:"Every beautiful story begins with a single moment. On this day, God gifted the world with a precious life."
},

{
    year:2010,
    date:"03 August",
    image:"2010.png",
    phase:"Waning Gibbous",
    illumination:"95%",
    title:"A Little Light",
    wish:"Another year, another beautiful chapter. May every small moment become a treasured memory."
},

{
    year:2011,
    date:"03 August",
    image:"2011.png",
    phase:"Last Quarter",
    illumination:"50%",
    title:"Growing Every Day",
    wish:"With every passing year, your story became richer with love, learning, and hope."
},

{
    year:2012,
    date:"03 August",
    image:"2012.png",
    phase:"Waxing Crescent",
    illumination:"24%",
    title:"Grace",
    wish:"May every step you take continue to be guided by grace, wisdom, and quiet strength."
},

{
    year:2013,
    date:"03 August",
    image:"2013.png",
    phase:"New Moon",
    illumination:"2%",
    title:"Hope",
    wish:"Even when the sky is darkest, hope patiently waits to shine again."
},
{
    year:2014,
    date:"03 August",
    image:"2014.png",
    phase:"Waxing Crescent",
    illumination:"44%",
    title:"Wonder",
    wish:"May you always keep a heart that is kind, a mind that continues to learn, and a spirit that never stops believing."
},

{
    year:2015,
    date:"03 August",
    image:"2015.png",
    phase:"Waning Gibbous",
    illumination:"88%",
    title:"Small Moments",
    wish:"Some of life's greatest blessings arrive quietly. May you always recognize them and treasure them."
},

{
    year:2016,
    date:"03 August",
    image:"2016.png",
    phase:"New Moon",
    illumination:"1%",
    title:"New Beginnings",
    wish:"Every ending gently prepares us for a new beginning. May every season lead you closer to God's purpose."
},

{
    year:2017,
    date:"03 August",
    image:"2017.png",
    phase:"Waxing Gibbous",
    illumination:"82%",
    title:"Quiet Strength",
    wish:"True strength is often found in patience, faith, and the courage to keep moving forward."
},

{
    year:2018,
    date:"03 August",
    image:"2018.png",
    phase:"Waning Gibbous",
    illumination:"91%",
    title:"A Beautiful Story",
    wish:"Every year has added another meaningful page to your story. May the chapters ahead be filled with peace and joy."
},
{
    year:2019,
    date:"03 August",
    image:"2019.png",
    phase:"Waxing Crescent",
    illumination:"5%",
    title:"Becoming",
    wish:"Growth is often so quiet that we hardly notice it. Yet every season has shaped you into someone wiser, kinder, and stronger."
},

{
    year:2020,
    date:"03 August",
    image:"2020.png",
    phase:"Full Moon",
    illumination:"100%",
    title:"Light Through Every Season",
    wish:"Even during uncertain moments, hope continues to shine. May your heart always find peace, even in the darkest nights."
},

{
    year:2021,
    date:"03 August",
    image:"2021.png",
    phase:"Waning Crescent",
    illumination:"32%",
    title:"Faith Over Fear",
    wish:"May every challenge become a lesson, every unanswered prayer become hope, and every tomorrow remind you that God walks beside you."
},

{
    year:2022,
    date:"03 August",
    image:"2022.png",
    phase:"Waxing Crescent",
    illumination:"30%",
    title:"Walking Forward",
    wish:"The future is filled with endless possibilities. Walk into it with faith, courage, and a heart that never stops believing."
},

{
    year:2023,
    date:"03 August",
    image:"2023.png",
    phase:"Waning Gibbous",
    illumination:"95%",
    title:"A Gentle Presence",
    wish:"May your kindness continue to brighten every life you touch, just as the moon gently brightens the night sky."
},
{
    year:2024,
    date:"03 August",
    image:"2024.png",
    phase:"Waning Crescent",
    illumination:"14%",
    title:"A New Horizon",
    wish:"May every new day bring fresh hope, quiet joy, and the courage to become the person God created you to be."
},

{
    year:2025,
    date:"03 August",
    image:"2025.png",
    phase:"Waxing Gibbous",
    illumination:"82%",
    title:"Grace In Every Step",
    wish:"You have already come so far. May your journey ahead be guided by wisdom, surrounded by love, and strengthened by God's grace."
},

{
    year:2026,
    date:"03 August",
    image:"2026.png",
    phase:"Waning Gibbous",
    illumination:"75%",
    title:"Seventeen Years Under This Sky",
    wish:"Seventeen years have become a beautiful story of faith, hope, growth, and countless memories. As another chapter begins, may your heart remain peaceful, your dreams stay alive, and may God continue to guide every step of your journey."
}

];

const TOTAL_SLIDES = journeyData.length;
/* =========================
CREATE JOURNEY
========================= */

function createJourney(){

    slider.innerHTML="";

    journeyData.forEach((item)=>{

        const slide=document.createElement("section");

        slide.className="slide";

        slide.innerHTML=`

        <div class="slide-content">

            <p class="chapter">

                CHAPTER

            </p>

            <p class="date">

                ${item.date}

            </p>

            <h1 class="year">

                ${item.year}

            </h1>

            <img

            src="${item.image}"

            class="moon-image"

            alt="${item.year}">

            <p class="phase">

                ${item.phase}

            </p>

            <p class="illumination">

                ${item.illumination} illuminated

            </p>

            <h2 class="slide-title">

                ${item.title}

            </h2>

            <p class="wish">

                ${item.wish}

            </p>

            <p class="swipe">

                Swipe • Tap Next →

            </p>

        </div>

        `;

        slider.appendChild(slide);

    });

    updateProgress();

}
/* =========================
BEGIN JOURNEY
========================= */

beginButton.addEventListener("click",()=>{

    intro.style.display="none";

    journey.classList.add("active");

    journey.style.display="block";

    currentSlide=0;

    createJourney();

    slider.scrollTo({
        left:0,
        behavior:"auto"
    });

    updateProgress();

    journeyStarted=true;

    backgroundMusic.play().catch(()=>{});

    musicPlaying=true;

    musicButton.textContent="❚❚";

});


/* =========================
PREVIOUS
========================= */

previousButton.addEventListener("click",()=>{

    if(currentSlide===0) return;

    currentSlide--;

    slider.scrollTo({

        left:slider.clientWidth*currentSlide,

        behavior:"smooth"

    });

    updateProgress();

});


/* =========================
NEXT
========================= */

nextButton.addEventListener("click",()=>{

    if(currentSlide<TOTAL_SLIDES-1){

        currentSlide++;

        slider.scrollTo({

            left:slider.clientWidth*currentSlide,

            behavior:"smooth"

        });

        updateProgress();

        if(currentSlide===TOTAL_SLIDES-1){

            setTimeout(showFinalBlessing,1500);

        }

    }

});
/* =========================
MUSIC BUTTON
========================= */

musicButton.addEventListener("click",()=>{

    if(musicPlaying){

        backgroundMusic.pause();

        musicPlaying=false;

        musicButton.textContent="♫";

    }

    else{

        backgroundMusic.play().catch(()=>{});

        musicPlaying=true;

        musicButton.textContent="❚❚";

    }

});


/* =========================
SLIDER SCROLL
========================= */

slider.addEventListener("scroll",()=>{

    const index=Math.round(

        slider.scrollLeft/

        slider.clientWidth

    );

    if(index!==currentSlide){

        currentSlide=index;

        updateProgress();

    }

});


/* =========================
LOADING SCREEN
========================= */
window.addEventListener("load", async () => {

    const video = document.getElementById("backgroundVideo");

    try{

        video.muted = true;

        video.loop = true;

        video.playsInline = true;

        await video.play();

    }catch(e){

        console.log(e);

    }

    loadingScreen.style.opacity = "0";

    loadingScreen.style.pointerEvents = "none";

    setTimeout(()=>{

        loadingScreen.style.display="none";

    },700);

});


/* =========================
IMAGE PRELOAD
========================= */

journeyData.forEach((item)=>{

    const image=new Image();

    image.src=item.image;

});
/* =========================
FINAL BLESSING
========================= */

function showFinalBlessing(){

    journey.style.display="none";

    finalSection.style.display="flex";

    blessingTitle.textContent=
    finalBlessing.title;

    blessingVerse.textContent=
    `"${finalBlessing.verse}"`;

    blessingReference.textContent=
    finalBlessing.reference;

}


/* =========================
ONE LAST MESSAGE
========================= */

lastMessageButton.addEventListener("click",()=>{

    showLetter();

});


/* =========================
FINAL LETTER
========================= */

function showLetter(){

    finalSection.style.display="none";

    letterSection.style.display="flex";

    letterText.textContent=`Happy Birthday. 🤍

As you look back at every moon that has watched over your journey, remember that every season has shaped you into who you are today.

May God continue to guide your path, strengthen your heart, and fill your future with peace, wisdom, and joy.

May every dream He has placed within you bloom in His perfect time.

May your smile never fade.
May your faith never weaken.
May your heart always remain peaceful.

Happy 17th Birthday.

God bless you always. 🌙🤍`;

}


/* =========================
REPLAY
========================= */

replayButton.addEventListener("click",()=>{

    letterSection.style.display="none";

    finalSection.style.display="none";

    intro.style.display="flex";

    journey.style.display="none";

    journey.classList.remove("active");

    currentSlide=0;

    slider.scrollTo({

        left:0,

        behavior:"auto"

    });

    backgroundMusic.pause();

    backgroundMusic.currentTime=0;

    musicPlaying=false;

    musicButton.textContent="♫";

    updateProgress();

});
/* =========================
INITIALIZE
========================= */

updateProgress();

journey.classList.remove("active");

journey.style.display="none";

intro.style.display="flex";

finalSection.style.display="none";

letterSection.style.display="none";

musicButton.textContent="♫";


/* =========================
BACKGROUND VIDEO
========================= */

const backgroundVideo =
document.getElementById("backgroundVideo");

if(backgroundVideo){

    backgroundVideo.muted=true;

    backgroundVideo.play().catch(()=>{

        console.log("Background video autoplay blocked.");

    });

}


/* =========================
CONSOLE
========================= */

console.log("🌙 Moon Journey v3 Loaded Successfully");

console.log("Total Slides :",TOTAL_SLIDES);

console.log("Journey Ready ✅");
