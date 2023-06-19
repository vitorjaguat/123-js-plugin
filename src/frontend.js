import './frontend.scss';
import React from 'react';
import ReactDOM from 'react-dom';

const divsToUpdate = document.querySelectorAll('.paying-attention-update-me');

divsToUpdate.forEach((div) => {
  ReactDOM.render(<Quiz />, div);
  div.classList.remove('paying-attention-update-me');
});

function Quiz() {
  return <div className='paying-attention-frontend'>Hello from React</div>;
}