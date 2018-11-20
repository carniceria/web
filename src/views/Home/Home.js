import React, { Component, Fragment } from 'react';
import * as contentful from 'contentful'
import { CSSTransition } from 'react-transition-group';
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom'
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import BottomScrollListener from 'react-bottom-scroll-listener';
import MetaTags from 'react-meta-tags';
const stripchar = require('stripchar').StripChar;

require('./Home.scss');

const INFINITE = true;

const client = contentful.createClient({
    space: process.env.REACT_APP_SPACE_CONTENTFUL,
    accessToken: process.env.REACT_APP_TOKEN_CONTENTFUL
})

class Home extends Component {
    constructor(props) {
        super(props);

        // sal();

        this.state = {
            posts: [],
            showDetailBox: false,
            detailTop: false,
            postsFirst: []
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.fetchPosts().then(this.setPosts);
    }

    handleScroll = () => {
        this.setState({
            showDetailBox: false,
        });
    }

    shuffleArray = (array) => {
        let currentIndex = array.length;
        let temporaryValue;
        let randomIndex;

        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
    }

    updateContent = () => {
        if(INFINITE) {
            const { posts, postsFirst } = this.state;
            this.setState({
                posts: posts.concat(this.shuffleArray(postsFirst))
            });
        }
    }

    fetchPosts = () => client.getEntries()

    setPosts = response => {
        this.setState({
          postsFirst: this.shuffleArray(response.items.filter(item => item.sys.contentType.sys.id === 'project' )),
          posts: this.shuffleArray(response.items.filter(item => item.sys.contentType.sys.id === 'project' ))
        })
    }

    showInfoBoxGrid = (showDetailBox, index) => {
        // console.log(window.innerHeight / 2);
        // if(showDetailBox)
        // console.log(ReactDOM.findDOMNode(this[`project${index}`]).getBoundingClientRect().y);
        this.setState({
            showDetailBox,
            detailTop: showDetailBox ? ReactDOM.findDOMNode(this[`project${index}`]).getBoundingClientRect().y > (window.innerHeight / 2) : false
        })
    }

    buildGridProjects = () => {
        const { posts, detailTop, showDetailBox } = this.state;
        const gridContent = posts.map((entry, index) => {
            // const urlImage = entry.fields.galleryImages
            // ?
            // entry.fields.galleryImages[Math.floor((Math.random() * (entry.fields.galleryImages.length - 1)) + 0)].fields.file.url
            // :
            // entry.fields.picture.fields.file.url;
            return(
                <Link
                    to={`/project/${stripchar.RSExceptUnsAlpNum(entry.fields.title.toLowerCase().replace(/\s/g,''), '_')}/`}
                    className="l-home__grid-box-aspect-ratio"
                    key={index.toString()}
                    ref={project => {this[`project${index.toString()}`] = project;}}
                >
                    <div
                        className="l-home__grid-box"
                        onMouseOver={() => this.showInfoBoxGrid(true, index.toString())}
                        onMouseLeave={() => this.showInfoBoxGrid(false)}
                    >
                        <div className="l-home__grid-back-image" style={{backgroundImage: `url(${entry.fields.picture.fields.file.url})`}}>
                            {}
                        </div>
                    </div>
                    <span className={`l-home__grid-box-title ${detailTop ? '-top' : ''} ${showDetailBox ? '-big' : ''}`}>
                        {entry.fields.title}
                        <p>{entry.fields.shortDescription}</p>
                    </span>
                </Link>

            )
        })

        return gridContent;
    }

    buildMetaTags = () => {
        return (
            <MetaTags>
                <title>|carnicería</title>
            </MetaTags>
        )
    }

    changeCategory = (value) => {
        const {postsFirst, posts} = this.state;
        if(value) {
            this.setState({
                postsFirst: this.shuffleArray(postsFirst.filter(item => item.sys.contentType.sys.id === 'project' && item.fields.categoria === value)),
                posts: this.shuffleArray(posts.filter(item => item.sys.contentType.sys.id === 'project' && item.fields.categoria === value))
            })
        }
    }

    render() {
        const {showDetailBox} = this.state;

        return (
            <Fragment>
                {this.buildMetaTags()}
                <BottomScrollListener debounce={0} offset={100} onBottom={() => this.updateContent()} />
                <Header />
                <div className="l-home">
                    <CSSTransition
                            in={showDetailBox}
                            timeout={100}
                            classNames="back-detail-animation"
                            unmountOnExit
                        >
                        <div className="l-home__back-detail"></div>
                    </CSSTransition>
                    <div className="l-home__grid">
                        {this.buildGridProjects()}
                    </div>
                </div>
                <Footer changeCategoryHome={this.changeCategory} />
            </Fragment>
        );
    }
}

export { Home };
