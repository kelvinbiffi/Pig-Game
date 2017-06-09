
var language, scoreHit, scores, roundScore, activeplayer, gamePlaying, lastDice, diceRooling = false;


function setLanguage(){
  document.getElementById('score-hit').textContent = 'Insira a pontuação a ser atingida';
  document.querySelector('.pt').classList.toggle('active');
  document.querySelector('.en').classList.toggle('active');
  document.getElementById('start-game').textContent = 'COMEÇAR';
  document.querySelector('.btn-new').innerHTML = '<i class="ion-ios-plus-outline"></i>NOVO JOGO';
  document.querySelector('.btn-roll').innerHTML = '<i class="ion-ios-loop"></i>ROLAR DADOS';
  document.querySelector('.btn-hold').innerHTML = '<i class="ion-ios-download-outline"></i>MANTER';
  document.querySelector('.player-0-panel .player-current-label').textContent = 'atual';
  document.querySelector('.player-1-panel .player-current-label').textContent = 'atual';
}

document.querySelector('#pt').addEventListener('click', function(){
  language = 'pt';
  setLanguage();
  showScorePanel();
});

document.querySelector('#en').addEventListener('click', function(){
  language = 'en';
  showScorePanel();
});

function showScorePanel(){
  document.querySelector('.language-panel').style.display = 'none';
  document.querySelector('.score-panel').style.display = 'block';
}

document.getElementById('score-hit-button').addEventListener('click', function(){
  scoreHit = document.getElementById('score-hit-value').value;
  console.log(scoreHit);
  document.querySelector('.score-panel').style.display = 'none';
  document.querySelector('.rules-panel').style.display = 'block';
});

document.getElementById('start-game').addEventListener('click', function(){
  document.querySelector('.rules-panel').style.display = 'none';
  document.querySelector('.modal').style.display = 'none';
  init();
});

document.querySelector('.btn-roll').addEventListener('click', function(){
  if(gamePlaying){
    var dice = Math.floor(Math.random() * 6) + 1;

    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    if(dice === 6 && lastDice === 6){
      lastDice = 0;
      scores[activeplayer] = 0;
      document.getElementById('score-' + activeplayer).textContent = 0;
      nextPlayer();
      return;
    }else if(dice !== 1){
      roundScore += dice;
      document.querySelector('#current-' + activeplayer).textContent = roundScore;
    }else{
      nextPlayer();
    }
    lastDice = dice;
  }
});


function nextPlayer(){
  document.querySelector('.player-' + activeplayer + '-panel').classList.remove('active');
  activeplayer = activeplayer === 0 ? 1 : 0;
  document.querySelector('.player-' + activeplayer + '-panel').classList.add('active');
  roundScore = 0;
  document.querySelector('#current-0').textContent = roundScore;
  document.querySelector('#current-1').textContent = roundScore;
  // document.querySelector('.dice').style.display = 'none';
}


document.querySelector('.btn-hold').addEventListener('click', function(){
  if(gamePlaying){
    scores[activeplayer] += roundScore;
    document.getElementById('score-' + activeplayer).textContent = scores[activeplayer];
    if(scores[activeplayer] >= scoreHit){
      document.getElementById('name-' + activeplayer).textContent = (language == 'pt' ? 'Ganhador!' : 'Winner!');
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activeplayer + '-panel').classList.remove('active');
      document.querySelector('.player-' + activeplayer + '-panel').classList.add('winner');
      gamePlaying = false;
    }else{
      nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
  scores = [0,0];
  roundScore = 0;
  activeplayer = 0;
  gamePlaying = true;
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');
}
