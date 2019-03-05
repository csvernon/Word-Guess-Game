var heros = {
    'HULK':'assets/images/hulk.jpeg',
    'THOR':'assets/images/thor.png',
    'THANOS':'assets/images/thanos.jpg',
    'GAMORA':'assets/images/gamora.jpg',
    'IRONMAN':'assets/images/ironman.jpg',
    'STARLORD':'assets/images/starlord.png',
    'SPIDERMAN':'assets/images/spiderman.jpg',
    'BLACKWIDOW':'assets/images/blackwidow.jpg',
    'BLACKPANTHER':'assets/images/blackpanther.jpg',
    'CAPTAINAMERICA':'assets/images/captainamerica.jpg'};

var heroBank = [];
var count = 0;
var wins = 0;
var guessedLetters = [];
var guesses;
var loses =0;
var currentHero;
var blanks = document.querySelector('.blanks');
var hero = document.getElementById('hero');
var images = document.getElementById('images');
var audio = document.querySelector('audio');
var winsDiv = document.querySelector('.wins');
document.querySelector('img');


    function restart(){
        heroBank = [];
        count = 0;
        wins = 0;
        loses = 0;
        winsDiv.innerHTML = "Wins: " + wins;
        reset();
    }
    function start(event){
        var input = event.key.toUpperCase();
        if  (input.match(/[A-Z]{1,1}/) && input.length<2){
            if(currentHero.indexOf(input)==-1){
                if(guessedLetters.indexOf(input)==-1){
                    if (guesses<1){
                        loses++
                        alert("Unlucky, you lost this round.");
                        reset();
                        
                    }                        
                    else {
                        guesses--;
                        document.querySelector('.guesses').innerHTML= "Guesses Left: " + guesses;
                        guessedLetters.push(input);
                        document.querySelector('.letters').innerHTML= "Letters Already Guessed: " + guessedLetters;
                    };
                    
                };
            }
        else {
            var blankArray = [];
            str = blanks.innerHTML.trim().split(" ");
            for (i=0;i<currentHero.length;i++){
                if (input === currentHero[i]){
                    blankArray.push(i);
                }
            }
            for (i=0;i<blankArray.length;i++){
                var index = blankArray[i];
                str[index] = input;
            };
            var combined = str.join(" ",",");
            blanks.innerHTML = combined;
            var compare = blanks.innerHTML.replace(/\s/g,"");
            if (currentHero===compare){
                wins++;
                winsDiv.innerHTML = "Wins: " + wins;
                images.innerHTML = '<img src="'+ heros[currentHero]+'" alt="busted"/>';
                hero.innerHTML = currentHero;
                themeSong();
                reset();
                winning();
                gameover();
                };
            };
        
        };
    };
    function reset(){
        guessedLetters=[];
        document.querySelector('.letters').innerHTML= "Letters Already Guessed: " + guessedLetters;
        guesses = 12;
        document.querySelector('.guesses').innerHTML= "Guesses Left: " + guesses;
        for (var key in heros)
            heroBank.push(key);
            currentHero = heroBank[count];
            count++;
            blanks.innerHTML = "";
            for (i=0;i<currentHero.length;i++){
                blanks.innerHTML+=" _"
            };
            var str = "";
        };
    function themeSong(){
        audio.play()
    };
    function gameover(){
        var games = wins + loses;
        if (games === 10 && wins != 10){
        alert("You gave it your all, better luck next time.")
        restart();
        }
    }
    function winning(){
        if (wins === 10){
        alert("Congratulations! You have beaten Marvel Hangman!")
        restart();
    }}
reset()

document.addEventListener('keyup', start);