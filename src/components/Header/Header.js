import React, { Component } from 'react';
import { Link } from "react-router-dom";


require('./Header.scss');

class Header extends Component {
    render() {
        const { whiteMenu } = this.props;
        const classNameHeader = whiteMenu ? 'c-header -white' : 'c-header';

        return (
            <div className={classNameHeader}>
                <div className="c-header__logo">
                   <Link to="/"><span className="neon-one-font">|</span>carnicería</Link>
                </div>
                <div className="c-header__about-link">
                    <Link to="/about-us/">about us</Link>
                </div>
            </div>
        );
    }
}

export { Header };
