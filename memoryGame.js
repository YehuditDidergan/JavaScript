let minutesLevel = 1
let shouldStop = false
let allImg = []
let count = 0;
let iceCreamWinner = 1
allImg = document.querySelectorAll("div .what")
allImg.forEach(img => img.addEventListener('click', openCard));
allLevel = []
allLevel = document.querySelectorAll(".level")
console.log(localStorage.getItem("age"))
minutesLevel = localStorage.getItem("age")
if (minutesLevel != 1 && minutesLevel != 2 && minutesLevel != 3)
    minutesLevel = 2;
const arrImg = ["img/pic1.jpg", "img/pic2.jpg", "img/pic3.jpg", "img/pic4.jpg",
    "img/pic5.jpg", "img/pic6.jpg", "img/pic7.jpg", "img/pic8.jpg"];
function img(path, firstPair, secondPair) {
    this.path = path;
    this.firstPair = firstPair;
    this.secondPair = secondPair;
    this.all = function () {
        console.log(this.path + " " + this.firstPair + " " + this.secondPair)
    };
}
/*
המערכים שלנו:
arrCatchCards: מיקומים תפוסים=1
arrImgAndIndex: תמונה+מיקומי הכרטיסים
*/
function checkMe() {
    if (arrImgAndIndex.find(x => x.firstPair == firstIndex || x.secondPair == firstIndex) == (arrImgAndIndex.find(x => x.firstPair == secondIndex || x.secondPair == secondIndex))) {
        iceCreamWinner++;
        // console.log(iceCreamWinner)
        return
    }
    firstEvent.target.setAttribute("src", "img/picWhat.jpg")
    allImg[firstIndex].addEventListener('click', openCard)
    secondEvent.target.setAttribute("src", "img/picWhat.jpg")
    allImg[secondIndex].addEventListener('click', openCard)

}
let arrImgAndIndex = [];
function initGame() {
    // let arrDiv = []
    let arrCatchCards = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // arrDiv = document.querySelectorAll(".cards")
    // console.log(arrDiv)
    for (let i = 0; i < arrImg.length; i++) {
        let rnd1 = Math.floor(Math.random() * (arrCatchCards.length));
        while (arrCatchCards[rnd1] == 1) {
            rnd1 = Math.floor(Math.random() * (arrCatchCards.length));
        }
        arrCatchCards[rnd1] = 1
        let rnd2 = Math.floor(Math.random() * (arrCatchCards.length));
        while (arrCatchCards[rnd2] == 1) {
            rnd2 = Math.floor(Math.random() * (arrCatchCards.length));
        }
        // console.log(rnd1, rnd2)
        arrCatchCards[rnd2] = 1
        arrImgAndIndex[i] = new img(arrImg[i], rnd1, rnd2)
        arrImgAndIndex[i].all()
    }
    timer(minutesLevel);

}
initGame();
function openCard() {

    index = (event.target.id).slice(1) - 1
    count++
    if (iceCreamWinner == 8 && count % 2 == 0) {///////////////נצחון
        // document.getElementsByClass("lineCards").style.display = "none";
        shouldStop = true
        event.target.setAttribute("src", "img/picWhat.jpg")
        document.getElementById("winner").style.display = "flex"
        let arrLine = document.querySelectorAll(".lineCards")
        for (let i = 0; i < arrLine.length; i++) {
            arrLine[i].style.display = "none"
        }
        animation();

        clearInterval(intervalId);

    }
    console.log(iceCreamWinner)

    allImg[index].removeEventListener('click', openCard)
    // console.log(count)
    if (count % 2 == 1 && count != 1)
        checkMe()

    // console.log(event.target.id)
    // console.log(index)
    let now_src = arrImgAndIndex.find(x => x.firstPair == index || x.secondPair == index).path
    event.target.setAttribute("src", now_src)
    if (count % 2 == 1)//ראשון
    {
        firstIndex = index
        firstEvent = event
    }
    else//שני
    {
        secondIndex = index
        secondEvent = event
    }
}
function timer(minutesLevel) {

    let timerDiv = document.createElement("div");
    timerDiv.setAttribute("id", "timer");

    document.querySelector("#placeForTimer").appendChild(timerDiv);

    // Start the timer by calling the updateTimer function every second
    const intervalId = setInterval(updateTimer, 1000);

    // Set the duration of the timer in seconds
    const duration = 60 * minutesLevel;

    // Get the HTML element where the timer will be displayed
    const timerDisplay = document.querySelector('#timer');

    // Initialize the timer value to the duration
    let timer = duration;

    // Function to update the timer value and display it
    function updateTimer() {
        if (shouldStop) {
            return; // Exit the function if shouldStop is true
        }
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;

        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        // Decrement the timer value
        timer--;

        // Stop the timer when it reaches 0
        if (timer < 0) {

            clearInterval(intervalId);
            document.getElementById("over").style.display = "flex"
            let arrLine = document.querySelectorAll(".lineCards")
            for (let i = 0; i < arrLine.length; i++) {
                arrLine[i].style.display = "none"
            }

        }
    }

    // Call the updateTimer function immediately
    updateTimer();

}
function animation() {
    // Set up the canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;
    document.body.appendChild(canvas);
    ///////////////////////////////////המיקום ההתחלתי
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    ///////////////////////////////////
    // Load ice cream image
    const iceCreamImage = new Image();
    iceCreamImage.src = "img/ice-cream-win.png";


    // Create a list to store the ice cream positions
    let iceCreams = [];

    // Function to generate a random ice cream position
    function generateIceCream() {
        const x = Math.random() * (canvas.width - iceCreamImage.width);
        const y = -iceCreamImage.height - canvas.height;
        iceCreams.push({ x, y });
    }

    // Game loop
    function gameLoop() {
        // Generate a new ice cream at a random position
        if (Math.random() < 0.05) {
            generateIceCream();
        }

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update the ice cream positions
        iceCreams.forEach((iceCream, index) => {
            iceCream.y += 5; // Adjust the falling speed
            ctx.drawImage(iceCreamImage, iceCream.x, iceCream.y);

            // Remove ice creams that have fallen off the canvas
            if (iceCream.y > canvas.height) {
                iceCreams.splice(index, 1);
            }
        });

        // Repeat the game loop
        requestAnimationFrame(gameLoop);
    }

    // Start the game loop
    gameLoop();

}
