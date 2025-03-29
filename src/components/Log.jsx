import React from 'react';

function Log({ logs }) {
  return (
    <section id="log">
      <ul>
        {logs.map((log, index) => {
          let className = '';
          if (log.isPlayer) className += 'log--player';
          else className += 'log--monster';
          
          if (log.isDamage) className += ' log--damage';
          else className += ' log--heal';
          
          return (
            <li key={index} className={className}>
              {log.isPlayer ? 'Player' : 'Monster'}{log.text}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Log;