var doing = false;
var spin = [new Audio("src/sounds/spin.mp3"),new Audio("src/sounds/spin.mp3"),new Audio("src/sounds/spin.mp3"),new Audio("src/sounds/spin.mp3"),new Audio("src/sounds/spin.mp3"),new Audio("src/sounds/spin.mp3"),new Audio("src/sounds/spin.mp3")];
var coin = [new Audio("src/sounds/coin.mp3"),new Audio("src/sounds/coin.mp3"),new Audio("src/sounds/coin.mp3")]
var win = new Audio("src/sounds/win.mp3");
var lose = new Audio("src/sounds/lose.mp3");
var audio = false;
let status = document.getElementById("status")
var info = true;
var wins = parseInt(localStorage.getItem("wins"));
let confe = document.querySelector("#my-canvas");

function doSlot(){
	confe.classList.remove("active")
	if (doing){return null;}
	doing = true;
	var numChanges = randomInt(1,4)*7
	var numeberSlot1 = numChanges+randomInt(1,7)
	var numeberSlot2 = numChanges+2*7+randomInt(1,7)
	var numeberSlot3 = numChanges+4*7+randomInt(1,7)

	var i1 = 0;
	var i2 = 0;
	var i3 = 0;
	var sound = 0
	status.innerHTML = "SPINNING..."
    status.style.background = "#606060"
    document.getElementById("body").style.background="#0f0f0f";
	slot1 = setInterval(spin1, 50);
	slot2 = setInterval(spin2, 50);
	slot3 = setInterval(spin3, 50);
	function spin1(){
		i1++;
		if (i1>=numeberSlot1){
			coin[0].play()
			clearInterval(slot1);
			return null;
		}
		slotTile = document.getElementById("slot1");
		if (slotTile.className=="a7"){
			slotTile.className = "a0";
		}
		slotTile.className = "a"+(parseInt(slotTile.className.substring(1))+1)
	}
	function spin2(){
		i2++;
		if (i2>=numeberSlot2){
			coin[1].play()
			clearInterval(slot2);
			return null;
		}
		slotTile = document.getElementById("slot2");
		if (slotTile.className=="a7"){
			slotTile.className = "a0";
		}
		slotTile.className = "a"+(parseInt(slotTile.className.substring(1))+1)
	}
	function spin3(){
		i3++;
		if (i3>=numeberSlot3){
			coin[2].play()
			clearInterval(slot3);
			testWin();
			return null;
		}
		slotTile = document.getElementById("slot3");
		if (slotTile.className=="a7"){
			slotTile.className = "a0";
		}
		sound++;
		if (sound==spin.length){
			sound=0;
		}
		spin[sound].play();
		slotTile.className = "a"+(parseInt(slotTile.className.substring(1))+1)
	}
}

function testWin(){
	var slot1 = document.getElementById("slot1").className
	var slot2 = document.getElementById("slot2").className
	var slot3 = document.getElementById("slot3").className
    var wins_element = document.getElementById("wins")

	if (((slot1 == slot2 && slot2 == slot3) ||
		(slot1 == slot2 && slot3 == "a7") ||
		(slot1 == slot3 && slot2 == "a7") ||
		(slot2 == slot3 && slot1 == "a7") ||
		(slot1 == slot2 && slot1 == "a7") ||
		(slot1 == slot3 && slot1 == "a7") ||
		(slot2 == slot3 && slot2 == "a7") ) && !(slot1 == slot2 && slot2 == slot3 && slot1=="a7")){
		status.innerHTML = "BIG WIN!";
        status.style.background = "#3e962aa9"
        document.getElementById("body").style.background="#162511";
        addWin()
		confeti()
		win.play();
	}else{
		status.innerHTML = "YOU LOSE!"
        status.style.background = "#962a2aa9"
        document.getElementById("body").style.background="#251111";
		lose.play();
	}
	doing = false;
}

function toggleAudio(){
    updateWins()
	if (!audio){
		audio = !audio;
		for (var x of spin){
			x.volume = 0.5;
		}
		for (var x of coin){
			x.volume = 0.5;
		}
		win.volume = 1.0;
		lose.volume = 1.0;
	}else{
		audio = !audio;
		for (var x of spin){
			x.volume = 0;
		}
		for (var x of coin){
			x.volume = 0;
		}
		win.volume = 0;
		lose.volume = 0;
	}
	document.getElementById("audio").src = "src/icons/audio"+(audio?"On":"Off")+".png";
}

function randomInt(min, max){
	return Math.floor((Math.random() * (max-min+1)) + min);
}

function updateWins(){
    var wins_element = document.getElementById("wins")
    if (isNaN(wins)){
        wins = 0
        localStorage.setItem("wins", wins);
    }
    wins_element.innerHTML = "Wins: " + wins
}

function addWin(){
    var wins_element = document.getElementById("wins")
    wins+=1
    localStorage.setItem("wins", wins);
    wins_element.innerHTML = "Wins: " + wins
}

function confeti(){
	var confettiSettings = { target: 'my-canvas' };
	var confetti = new ConfettiGenerator(confettiSettings);
	confetti.render();
	confe.classList.add("active")
}
