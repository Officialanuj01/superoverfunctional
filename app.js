
const strickButton = document.getElementById("strike");
const resetButton = document.getElementById("reset");
const $team1Score = document.getElementById("score-team1");
const $team1Wickets = document.getElementById("wickets-team1");
const $team2Score = document.getElementById("score-team2");
const $team2Wickets = document.getElementById("wickets-team2");

const strickAudio = new Audio("http://bit.ly/so-ball-hit")
const gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer")

var team1Score = 0;
var team1Wickets = 0;
var team2Score  = 0;
var team2Wickets = 0;
var team1BallsFaced = 0;
var team2BallsFaced = 0;
var turn = 1;

const possibleOutComes = [0,1,2,3,4,6,"w"];

function gameover(){
    gameOverAudio.play();
    if(team1Score>team2Score) alert("IND wins");
    if(team2Score>team1Score) alert("PAK win");
    if(team2Score=== team1Score) alert("It is another superover!");
}

function updateScore(){
    $team1Score.textContent = team1Score;
    $team1Wickets.textContent = team1Wickets;
    $team2Score.textContent = team2Score;
    $team2Wickets.textContent = team2Wickets;
}
resetButton.onclick = () => {
    window.location.reload();
};
strickButton.onclick = () => {
    strickAudio.pause();
    strickAudio.currentTime = 0;
    strickAudio.play();

    const randomElement =possibleOutComes[Math.floor(Math.random()*possibleOutComes.length)];
    console.log(randomElement)
    if(turn===2){
        team2BallsFaced++;
        document.querySelector(
            `#team2-superover div:nth-child(${team2BallsFaced})`
        ).textContent = randomElement;
        if(randomElement==="w"){
            team2Wickets++;    
        }
        else{
            team2Score += randomElement;
        }
        if(
            team2BallsFaced === 6 ||
            team2Wickets === 2 ||
            team2Score>team1Score
        ){
            turn = 3;
            gameover();
        }
    }

    if(turn===1){
        team1BallsFaced++
        document.querySelector(
            `#team1-superover div:nth-child(${team1BallsFaced})`
        ).textContent = randomElement;
        if(randomElement==="w"){
            team1Wickets++;
        } else{
            team1Score += randomElement
        }
        if(team1BallsFaced===6 || team1Wickets===2) turn=2;
    }
    updateScore();
};
