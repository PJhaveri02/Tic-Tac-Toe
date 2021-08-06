import React from 'react';

export class ClassComponent extends React.Component {
    render() {
        return (
            <h2>Class Component</h2>
        );
    }
}

export class ClassTwo extends React.Component {
    render() {
        return (
            <p> I just created a second component!!</p>
        );
    }
}

export class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.handleButtonClicks = this.handleButtonClicks.bind(this);

        this.state = {
            counter: 0, 
        }
    }

    handleButtonClicks() {
        let counter = this.state.counter;
        counter++;
        this.setState({counter: counter});
        console.log("Num Clicks: " + counter);
    }

    render() {
        return (
            <button onClick={this.handleButtonClicks}>{this.props.hello}, Click me: {this.state.counter}</button>
        );
    }
}
