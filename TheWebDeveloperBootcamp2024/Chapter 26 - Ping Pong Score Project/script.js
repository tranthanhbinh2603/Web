let btnPlusOne = document.getElementsByClassName('btnPlusOne')[0];
let btnPlusTwo = document.getElementsByClassName('btnPlusTwo')[0];
let btnReset = document.querySelector('.btnReset');

btnPlusOne.addEventListener('click', () => {
    let score1 = document.querySelector('.score1');
    let score2 = document.querySelector('.score2');
    score1.textContent = Number(score1.textContent) + 1;
    if (Number(score1.textContent) == document.querySelector('.form-select').value) {
        score1.classList += " win";
        score2.classList += " lose";
        document.querySelector('.btn-success').disabled = true;
        document.querySelector('.btn-primary').disabled = true;
    }
});

btnPlusTwo.addEventListener('click', () => {
    let score1 = document.querySelector('.score1');
    let score2 = document.querySelector('.score2');
    score2.textContent = Number(score2.textContent) + 1;
    if (Number(score2.textContent) == document.querySelector('.form-select').value) {
        score1.classList += " lose";
        score2.classList += " win";
        document.querySelector('.btn-success').disabled = true;
        document.querySelector('.btn-primary').disabled = true;
    }
});

btnReset.addEventListener('click', () => {
    let score1 = document.querySelector('.score1');
    score1.textContent = "0";
    if (score1.classList.contains('win')){
        score1.classList.toggle("win");
    }
    else if (score1.classList.contains('lose')){
        score1.classList.toggle("lose");
    }
    let score2 = document.querySelector('.score2');
    score2.textContent = "0";
    if (score2.classList.contains('win')){
        score2.classList.toggle("win");
    }
    else if (score2.classList.contains('lose')){
        score2.classList.toggle("lose");
    }
    document.querySelector('.btn-success').disabled = false;
    document.querySelector('.btn-primary').disabled = false;
})