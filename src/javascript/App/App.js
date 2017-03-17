//@flow
import Tree from '../Components/Tree.js';
import React from 'react';
import ReactDOM from 'react-dom';
import mindmap from '../data.json';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            mindmap: mindmap
        }
    }
    componentDidMount() {

    }
    updateCounter() {

    }
    render() {
        return (
            <div className="board">
        <Tree 
            onPositionChange
            nodes={this.state.mindmap} 
        />
        </div>
        );
    }
}
ReactDOM.render(
    React.createElement(App),
    document.getElementById('app')
);