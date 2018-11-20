import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

import React, { Component, Fragment } from 'react';
import * as contentful from 'contentful';
import { CSSTransition } from 'react-transition-group';
import MetaTags from 'react-meta-tags';
import { Link } from "react-router-dom";
const stripchar = require('stripchar').StripChar;
// import {OBJModel} from 'react-3d-viewer';

// import antonOne from './obj/st.obj';

require('./AboutUs.scss');


const client = contentful.createClient({
    space: process.env.REACT_APP_SPACE_CONTENTFUL,
    accessToken: process.env.REACT_APP_TOKEN_CONTENTFUL
})

class AboutUs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            people: [],
            showDetailBox: false
        }
    }

    componentDidMount() {
        this.fetchPosts().then(this.setPeople);
    }

    fetchPosts = () => client.getEntries()

    setPeople = response => {
        this.setState({
            people: response.items.filter(item => item.sys.contentType.sys.id === 'peopleCarniceria' )
        })
    }

    showInfoBoxGrid = (showDetailBox) => {
        // this.setState({
        //     showDetailBox
        // })
    }

    buildPeopleGrid = () => {
        const { people } = this.state;
        const gridContent = people.map(entry => {
            return(
                <Link
                    // data-sal="slide-up"
                    to={`/people/${stripchar.RSExceptUnsAlpNum(entry.fields.name.toLowerCase().replace(/\s/g,''), '_')}/`}
                    className="l-about-us__grid-box-aspect-ratio"
                    onMouseOver={() => this.showInfoBoxGrid(true)}
                    onMouseLeave={() => this.showInfoBoxGrid(false)}
                >
                    <div className="l-about-us__grid-box">
                        <div className="l-about-us__grid-back-image" style={{backgroundImage: `url(${entry.fields.picture.fields.file.url})`}}>
                            {}
                        </div>
                        <div className="l-about-us__grid-box-name">
                            <p>{entry.fields.name}</p>
                        </div>
                    </div>
                </Link>

            )
        })

        return gridContent;
    }

    buildMetaTags = () => {
        return (
            <MetaTags>
                <title>|carnicería | About</title>
            </MetaTags>
        )
    }

    render() {
        const {showDetailBox} = this.state;
        const {location} = this.props;

        return (
            <Fragment>
                {this.buildMetaTags()}
                <Header whiteMenu={location.pathname === '/about-us/'} />
                <CSSTransition
                        in={showDetailBox}
                        timeout={100}
                        classNames="back-detail-animation"
                        unmountOnExit
                    >
                    <div className="l-about-us__back-detail"></div>
                </CSSTransition>
                <div className="l-about-us">
                    <div className="l-about-us__grid">
                        {this.buildPeopleGrid()}
                        {/* <div className="obj">
                            <OBJModel
                                src={antonOne}
                            />
                        </div> */}
                    </div>
                </div>
                <Footer />
            </Fragment>
        );
    }
}

export { AboutUs };
