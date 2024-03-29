import React, { Component } from 'react';
import './Card.css';

class Card extends Component {

    render() {
        return (<div className={`card ${this.props.className}`} onClick={this.props.onClick}>
            {this.props.children}
        </div>);
    }
}

export default Card;
