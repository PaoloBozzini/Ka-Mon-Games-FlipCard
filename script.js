const cardImages = [
    "https://images.dog.ceo/breeds/terrier-sealyham/n02095889_975.jpg",
    "https://images.dog.ceo/breeds/wolfhound-irish/n02090721_1131.jpg",
    "https://images.dog.ceo/breeds/terrier-westhighland/n02098286_5353.jpg",
    "https://images.dog.ceo/breeds/schnauzer-giant/n02097130_700.jpg",
    "https://images.dog.ceo/breeds/pyrenees/n02111500_7983.jpg",
    "https://images.dog.ceo/breeds/lhasa/n02098413_13083.jpg",
    "https://images.dog.ceo/breeds/collie-border/n02106166_855.jpg",
    "https://images.dog.ceo/breeds/akita/512px-Ainu-Dog.jpg"
]

let firstCard = null;
let secondCard = null;
let canFlip = true;

function startGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    const sortedCardImages = cardImages.concat(cardImages);
    sortedCardImages.sort(() => Math.random() - 0.5);

    for (let i = 0; i < sortedCardImages.length; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = '<div class="card-front"><i class="fas fa-question"></i></div>' +
            '<div class="card-back"><img src="' + sortedCardImages[i] + '"></div>';
        card.onclick = flipCard;
        card.dataset.image = sortedCardImages[i];
        gameBoard.appendChild(card);
    }

    firstCard = null;
    secondCard = null;
    canFlip = true;
}

function flipCard() {
    if (!canFlip) return;
    if (this.classList.contains('flipped')) return;
    if (this.classList.contains('matched')) return;

    this.classList.add('flipped');

    if (firstCard == null) {
        firstCard = this;
    } else {
        secondCard = this;
        canFlip = false;
        checkMatch();
    }
}

function checkMatch() {
    const match = firstCard.dataset.image === secondCard.dataset.image;

    if (match) {
        firstCard.classList.add('flipped');
        secondCard.classList.add('flipped');

        // Wait a bit so the flip animation can be seen
        setTimeout(() => {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');

            // Change question mark to green checkmark
            const firstIcon = firstCard.querySelector('.card-front i');
            const secondIcon = secondCard.querySelector('.card-front i');
            if (firstIcon) {
                firstIcon.className = 'fas fa-check';
                firstIcon.style.color = 'green';
            }
            if (secondIcon) {
                secondIcon.className = 'fas fa-check';
                secondIcon.style.color = 'green';
            }

            resetCards();
        }, 1000);
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetCards();
        }, 1500);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
    canFlip = true;
}

startGame();
