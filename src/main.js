import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '@Components';

document.body.style.backgroundColor = 'whitesmoke';
document.body.style.color = '#555';

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(<App />, root);