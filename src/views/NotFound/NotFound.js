import React, { Component, Fragment } from 'react';
import ReactInterval from 'react-interval';
import { Link } from "react-router-dom";

require('./NotFound.scss');

class NotFound extends Component {
    constructor(props) {
        super(props);

        this.state = {
            xP: 0,
            yP: 0,
            one: 'black',
            two: 'black',
            three: 'black',
            four: 'black',
            five: 'black',
            six: 'black',
            seven: 'black',
            eight: 'black',
            nine: 'black',
            ten: 'black',
            eleven: 'black'
        }
    }

    render() {
        const { xP, yP, one, two, three, four, five, six, seven, eight, nine, ten, eleven } = this.state;
        const colorSpan = ['black', 'neon'];
        console.log(Math.floor((Math.random() * 2) + 0));

        return (
            <Fragment>
                <ReactInterval
                    timeout={700}
                    enabled={true}
                    callback={() => this.setState({
                        xP: Math.floor((Math.random() * 90) + 0),
                        yP: Math.floor((Math.random() * 90) + 0),
                        one: colorSpan[Math.floor((Math.random() * 2) + 0)],
                        two: colorSpan[Math.floor((Math.random() * 2) + 0)],
                        three: colorSpan[Math.floor((Math.random() * 2) + 0)],
                        four: colorSpan[Math.floor((Math.random() * 2) + 0)],
                        five: colorSpan[Math.floor((Math.random() * 2) + 0)],
                        six: colorSpan[Math.floor((Math.random() * 2) + 0)],
                        seven: colorSpan[Math.floor((Math.random() * 2) + 0)],
                        eight: colorSpan[Math.floor((Math.random() * 2) + 0)],
                        nine: colorSpan[Math.floor((Math.random() * 2) + 0)],
                        ten: colorSpan[Math.floor((Math.random() * 2) + 0)],
                        eleven: colorSpan[Math.floor((Math.random() * 2) + 0)],
                    })}
            />
                <div className="l-not-found">
                    <div className="l-not-found__box">
                        <Link to="/">proyectos</Link>
                        <Link to="/">quienes somos</Link>
                    </div>
                    <h1 className="l-not-found__text-error" style={{
                        top: `${yP}%`,
                        left: `${xP}%`,
                    }}>
                        <span className={one}>4</span>
                        <span className={two}>0</span>
                        <span className={three}>4</span>
                        <span>{' '}</span>
                        <span className={four}>n</span>
                        <span className={five}>o</span>
                        <span className={six}>t</span>
                        <span>{' '}</span>
                        <span className={seven}>f</span>
                        <span className={eight}>o</span>
                        <span className={nine}>u</span>
                        <span className={ten}>n</span>
                        <span className={eleven}>d</span>
                    </h1>
                </div>
            </Fragment>
        );
    }
}

export { NotFound };