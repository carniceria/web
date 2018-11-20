import React, { Component, Fragment } from 'react';
import ReactInterval from 'react-interval';
import { Link } from "react-router-dom";

require('./GalaxyPage.scss');

class GalaxyPage extends Component {
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
                <div className="l-galaxy">
                    <div className="l-galaxy__box">
                        <Link to="/">proyectos</Link>
                        <Link to="/">quienes somos</Link>
                    </div>
                    <h1 className="l-galaxy__text-error" style={{
                        top: `${yP}%`,
                        left: `${xP}%`,
                    }}>
                        <div className="l-galaxy__container-text">
                            <span className={one}>t</span>
                            <span className={two}>h</span>
                            <span className={three}>e</span>
                            <span>{' '}</span>
                            <span className={four}>g</span>
                            <span className={five}>a</span>
                            <span className={six}>l</span>
                            <span className={seven}>a</span>
                            <span className={eight}>x</span>
                            <span className={nine}>y</span>
                            <span>{' '}</span>
                            <span className={ten}>i</span>
                            <span className={eleven}>s</span>
                            <br></br>
                            <span className={six}>b</span>
                            <span className={seven}>e</span>
                            <span className={eight}>i</span>
                            <span className={nine}>n</span>
                            <span className={three}>g</span>
                            <span>{' '}</span>
                            <span className={four}>c</span>
                            <span className={five}>r</span>
                            <span className={six}>e</span>
                            <span className={seven}>a</span>
                            <span className={eight}>t</span>
                            <span className={nine}>e</span>
                            <span className={one}>d</span>
                        </div>
                    </h1>
                </div>
            </Fragment>
        );
    }
}

export { GalaxyPage };