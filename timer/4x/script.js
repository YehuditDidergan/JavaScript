
function animation() {
    // Set up the canvas
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Load ice cream image
    const iceCreamImage = new Image();
    iceCreamImage.src = "pic2.jpg";

    // Create an array to store the ice cream positions
    let iceCreams = [];

    // Function to generate a random ice cream position
    function generateIceCream() {
        const x = Math.random() * (canvas.width - iceCreamImage.width);
        const y = 0;
        const speed = Math.random() * 2 + 1; // Randomize the falling speed
        iceCreams.push({ x, y, speed });
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
            iceCream.y += iceCream.speed; // Adjust the falling speed
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
animation();