import React from 'react';
import Bar from './Bar';
import Line from './Line';
import Toolbar from './Toolbar';
import ListBox from './ListBox';
import '../style.css';

const App = () => {
    return (
        <div style={{ margin: "50px 20px" }}> 
            <Toolbar /> 
            <br /><br />
            <ListBox />
            <br /><br />
            <Bar />
            <br /><br />
            <Line />
        </div>
    );
}

export default App;