import React, { Component } from 'react';


require('./Loader.scss');

class Loader extends Component {
    render() {
        return (
            <span className="c-loader">
                <span className="loader-inner">{}</span>
            </span>
        );
    }
}

export { Loader };