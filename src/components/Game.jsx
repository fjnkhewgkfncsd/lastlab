import React, { useState, useEffect } from "react";
import Entity from "./Entity";
import GameOver from "./GameOver";
import Log from "./Log";

// Helper functions
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createLogAttack(isPlayer, damage) {
  return {
    isPlayer,
    isDamage: true,
    text: ` takes ${damage} damage`,
  };
}

function createLogHeal(healing) {
  return {
    isPlayer: true,
    isDamage: false,
    text: ` heals ${healing} HP`,
  };
}

function Game() {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [logs, setLogs] = useState([]);
  const [round, setRound] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState('');

  const canSpecialAttack = round > 0 && round % 3 === 0;
  const isGameOver = playerHealth <= 0 || monsterHealth <= 0 || gameOver;

  useEffect(() => {
    if (playerHealth <= 0 && monsterHealth <= 0) {
      setGameOver(true);
      setResult('Draw Game!');
    } else if (playerHealth <= 0) {
      setGameOver(true);
      setResult('You Lost!');
    } else if (monsterHealth <= 0) {
      setGameOver(true);
      setResult('You Won!');
    }
  }, [playerHealth, monsterHealth]);

  const handleAttack = () => {
    const playerDamage = getRandomValue(5, 12);
    const monsterDamage = getRandomValue(8, 15);
    
    setMonsterHealth(prev => Math.max(0, prev - playerDamage));
    setPlayerHealth(prev => Math.max(0, prev - monsterDamage));
    
    setLogs(prev => [
      ...prev,
      createLogAttack(true, playerDamage),
      createLogAttack(false, monsterDamage),
    ]);
    
    setRound(prev => prev + 1);
  };

  const handleSpecialAttack = () => {
    const playerDamage = getRandomValue(10, 25);
    const monsterDamage = getRandomValue(8, 15);
    
    setMonsterHealth(prev => Math.max(0, prev - playerDamage));
    setPlayerHealth(prev => Math.max(0, prev - monsterDamage));
    
    setLogs(prev => [
      ...prev,
      { 
        isPlayer: true, 
        isDamage: true, 
        text: ` uses special attack dealing ${playerDamage} damage` 
      },
      createLogAttack(false, monsterDamage),
    ]);
    
    setRound(prev => prev + 1);
  };

  const handleHeal = () => {
    const healAmount = getRandomValue(8, 20);
    const monsterDamage = getRandomValue(8, 15);
    
    setPlayerHealth(prev => Math.min(100, prev + healAmount - monsterDamage));
    
    setLogs(prev => [
      ...prev,
      createLogHeal(healAmount),
      createLogAttack(false, monsterDamage),
    ]);
    
    setRound(prev => prev + 1);
  };

  const handleSuicide = () => {
    setPlayerHealth(0);
    setGameOver(true);
    setResult('You gave up!');
    setLogs(prev => [
      ...prev,
      { isPlayer: true, isDamage: true, text: ' gives up!' },
    ]);
  };

  const handleRestart = () => {
    setPlayerHealth(100);
    setMonsterHealth(100);
    setLogs([]);
    setRound(0);
    setGameOver(false);
    setResult('');
  };

  return (
    <div>
      <Entity healthPercentage={playerHealth} name="Player" />
      <Entity healthPercentage={monsterHealth} name="Monster" />
      
      {isGameOver ? (
        <GameOver title={result} onRestart={handleRestart} />
      ) : (
        <div id="controls" className="container">
          <button onClick={handleAttack}>ATTACK</button>
          <button 
            onClick={handleSpecialAttack} 
            disabled={!canSpecialAttack}
          >
            SPECIAL ATTACK
          </button>
          <button onClick={handleHeal}>HEAL</button>
          <button onClick={handleSuicide}>KILL YOURSELF</button>
        </div>
      )}
      
      <Log logs={logs} />
    </div>
  );
}

export default Game;