var doing = false;
var spin = [new Audio("src/sounds/spin.mp3"),new Audio("src/sounds/spin.mp3"),new Audio("src/sounds/spin.mp3"),new Audio("src/sounds/spin.mp3"),new Audio("src/sounds/spin.mp3"),new Audio("src/sounds/spin.mp3"),new Audio("src/sounds/spin.mp3")];
var coin = [new Audio("src/sounds/coin.mp3"),new Audio("src/sounds/coin.mp3"),new Audio("src/sounds/coin.mp3")]
var win = new Audio("src/sounds/win.mp3");
var lose = new Audio("src/sounds/lose.mp3");
var audio = false;
let status = document.getElementById("status")
let text = document.getElementById("text")
let confe = document.querySelector("#my-canvas");
var wins_element = document.getElementById("wins")
var score_element = document.getElementById("score")
var userName = document.getElementById("userName").textContent
var blinkId = 0;
var blink = false
var score = 0
var wins = 0
var id = 0

const firebaseConfig = {
	apiKey: "AIzaSyDrx_IMLOUSSRAKHSh3nT7HABzjPtv0bI4",
	authDomain: "slot-game-8aed2.firebaseapp.com",
	projectId: "slot-game-8aed2",
	storageBucket: "slot-game-8aed2.appspot.com",
	messagingSenderId: "1003739740685",
	appId: "1:1003739740685:web:26755aeb50afdce1cc3344"
  };
  
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user=>{
	if(user){
	  login = true;
	  id = firebase.auth().currentUser.uid;
	  userName = user.displayName
	  console.log(userName)
	  updateWins()
	}
	else{
	  login = false;
	  score_element.innerHTML = "Score: 0"
	  wins_element.innerHTML = "Wins: 0"
	}
})

function doSlot(){
	if(blinkId != 0){
		clearInterval(blinkId);
	}
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
	text.style = "visibility: visible"
	text.innerHTML = "SPINNING..."
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

	if (((slot1 == slot2 && slot2 == slot3) ||
		(slot1 == slot2 && slot3 == "a7") ||
		(slot1 == slot3 && slot2 == "a7") ||
		(slot2 == slot3 && slot1 == "a7") ||
		(slot1 == slot2 && slot1 == "a7") ||
		(slot1 == slot3 && slot1 == "a7") ||
		(slot2 == slot3 && slot2 == "a7") )){
		if((slot1 == slot2 && slot2 == slot3)&&(slot1!="a7" && slot2!="a7" && slot3!="a7")){
			text.innerHTML = "BIG WIN!";
			addWin(500)
		}
		else if((slot1=="a7" && slot2=="a7" && slot3=="a7")){
			text.innerHTML = "JACKPOT!";
			addWin(1000)
		}
		else{
			text.innerHTML = "YOU WIN!";
			addWin(100)
		}
        status.style.background = "#3e962aa9";
        document.getElementById("body").style.background="#162511";
		confeti()
		win.play();
		blinkId = setInterval(blinkText, 500);
	}else{
		text.innerHTML = "YOU LOSE!"
        status.style.background = "#962a2aa9"
        document.getElementById("body").style.background="#251111";
		lose.play();
	}
	doing = false;
}

function main()
{
	toggleAudio()
	leaderboardScores()
}

function toggleAudio(){
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
	if (login == true){
    firebase.database().ref('Users/' + id + '/data/wins').once('value',(snap)=>{
		if (snap.val() != null){
			wins =parseInt(snap.val())
			wins_element.innerHTML = "Wins: " + wins.toString()
		}
		else{
			wins = 0
			firebase.database().ref('Users/' + id + '/data').set({score:0, wins:0});
		}
	});
	firebase.database().ref('Users/' + id + '/data/score').once('value',(snap)=>{
		if (snap.val() != null){
			score =parseInt(snap.val())
			score_element.innerHTML = "Score: " + score.toString()
		}else{
			score = 0
			firebase.database().ref('Users/' + id + '/data').set({score:0, wins:0});
			firebase.database().ref('scores/' + userName + '-' + id).set({score: 0});
		}
		
	});
	}
}

function addWin(addScore){
	if (login == true){
		firebase.database().ref('Users/' + id + '/data').set({score:score+addScore, wins:wins+1});
		firebase.database().ref('scores/' + userName + '-' + id).set({score: score+addScore});
		updateWins()
	}
}

function confeti(){
	var confettiSettings = { target: 'my-canvas' };
	var confetti = new ConfettiGenerator(confettiSettings);
	confetti.render();
	confe.classList.add("active")
}

function blinkText(){
	if(blink){
		text.style = "visibility: hidden"
	}
	else{
		text.style = "visibility: visible"
	}
	blink = !blink
}

function leaderboardScores(){
	var query = firebase.database().ref('/scores').orderByChild('score').limitToLast(10)
	var leader_scores = new Array();
	query.once('value', function (snapshot) {
		snapshot.forEach(function (childSnapshot) {
			var name = childSnapshot.key.split("-")[0]
			leader_scores.push([name, childSnapshot.val()["score"]])
		});

		var leaderLines = []
		leader_scores = leader_scores.reverse()
		for(var i=0; i<10; i++){
			leaderLines[i] = document.getElementById("score"+(i+1).toString())
			leaderLines[i].innerText = leader_scores[i][0] + ": " + leader_scores[i][1]
		}
	});
}