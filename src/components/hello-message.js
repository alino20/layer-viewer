import React from 'react';

class HelloMessage extends React.Component {
    render() {
        return <div>
            <div className="container">
                <h1>Hello {this.props.name}</h1>
            </div>
        </div>
    }
}

module.exports = HelloMessage;