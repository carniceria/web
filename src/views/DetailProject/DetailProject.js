import right from './assets/right.png';
import left from './assets/left.png';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Loader } from '../../components/Loader/Loader';
import React, { Component, Fragment } from 'react';
import Img from 'react-image'
import * as contentful from 'contentful';
import Markdown from 'react-markdown';
import ReactPlayer from 'react-player'
import MetaTags from 'react-meta-tags';

const stripchar = require('stripchar').StripChar;
// import {OBJModel} from 'react-3d-viewer';
// import antonOne from './obj/st.obj';

require('./DetailProject.scss');


const client = contentful.createClient({
    space: process.env.REACT_APP_SPACE_CONTENTFUL,
    accessToken: process.env.REACT_APP_TOKEN_CONTENTFUL
})

class DetailProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            project: [],
            showDetailBox: false,
            tabSelected: 1,
            imageArrays: [],
            positionArray: 0,
            showNext: true,
            showLast: true,
            showSlider: false
        }
    }

    componentDidMount() {
        this.fetchPosts().then(this.setProject);
        window.addEventListener('mousedown', this.handleClickOutside);
        window.addEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = (event) => {
        switch(event.keyCode) {
            case 39:
                this.moveSlider('next');
                break;
            case 37:
                this.moveSlider('last');
                break;
            case 27:
                this.showSlider(false);
                break;
            default:
                this.showSlider(true);
        }
    }

    handleClickOutside = (event) => {
        if(this.detailProject) {
            if (!this.detailProject.contains(event.target) && this.detailProject) {
                this.showSlider(false);
            }
        }
    }

    getImageArrays = (item) => {
        if(item[0].fields.galleryImages) {
            const itemArray = item[0].fields.galleryImages.map((image, index) => {
                return(image.fields.file.url);
            });
            return itemArray;
        } else {
            return [];
        }
    }

    fetchPosts = () => client.getEntries()

    setProject = response => {
        const { match } = this.props;
        const currentProject = response.items.filter(item => item.sys.contentType.sys.id === 'project' && stripchar.RSExceptUnsAlpNum(item.fields.title.toLowerCase().replace(/\s/g,''), '_') === match.params.projectId);
        let currentTab = 1;

        if (currentProject[0].fields.memoriaProject !== undefined) {
            currentTab = 1;
        } else if (currentProject[0].fields.proyectoProject !== undefined) {
            currentTab = 2;
        } else if (currentProject[0].fields.creditosProject !== undefined) {
            currentTab = 3;
        }

        this.setState({
            project: currentProject,
            tabSelected: currentTab,
            imageArrays: this.getImageArrays(currentProject)
        })
    }

    changeTabInfo = (tabSelected) => {
        this.setState({
            tabSelected
        })
    }

    showSlider = (showSlider, positionArray = 0) => {
        this.setState({
            showSlider,
            positionArray
        })
    }

    buildDetailProject = () => {
        const { project, tabSelected } = this.state;
        let galleryImages

        if (project.length > 0) {
            if (project[0].fields.galleryImages) {
                galleryImages = project[0].fields.galleryImages.map((image, index) => {
                    return (
                        <div className="container-image" key={index.toString()}>
                            <Img
                                src={image.fields.file.url}
                                alt={image.fields.file.title}
                                onClick={() => this.showSlider(true, index)}
                                loader={
                                    <div className="loader">
                                        <Loader />
                                    </div>
                                }
                            />
                        </div>
                    )
                });
            }

            const showTabs = project[0].fields.memoriaProject === undefined && project[0].fields.proyectoProject === undefined && project[0].fields.creditosProject === undefined;

            return(
                <Fragment>
                    <div className="l-detail-project__first-container">
                    <div className="l-detail-project__first-media">
                            {project[0].fields.videoUrl && <div className="l-detail-project__first-media-video">
                                <ReactPlayer
                                    controls={false}
                                    width="100%"
                                    url={project[0].fields.videoUrl}
                                />
                            </div>}
                            {project[0].fields.soundCloud && <div className="l-detail-project__first-media-video">
                                <ReactPlayer
                                    controls={false}
                                    width="100%"
                                    url={project[0].fields.soundCloud}
                                />
                            </div>}
                            <div className="l-detail-project__first-media-image-container">
                                <Img
                                    className="l-detail-project__first-media-image"
                                    src={project[0].fields.picture.fields.file.url}
                                    alt={project[0].fields.title}
                                    loader={
                                        <div className="loader -top">
                                            <Loader />
                                        </div>
                                    }
                                />
                            </div>
                        </div>
                        <div className="l-detail-project__info-tabs">
                            <h1>{project[0].fields.title}</h1>
                            {!showTabs &&
                                <div className="l-detail-project__info-tabs-container">
                                    <div className="l-detail-project__info-tabs-options">
                                        {project[0].fields.memoriaProject && <div
                                            className={`title-option ${tabSelected === 1 ? '-selected' : ''}`}
                                            onClick={() => this.changeTabInfo(1)}
                                        >Memoria</div>}
                                        {project[0].fields.proyectoProject && <div
                                            className={`title-option ${tabSelected === 2 ? '-selected' : ''}`}
                                            onClick={() => this.changeTabInfo(2)}
                                        >Proyecto</div>}
                                        {project[0].fields.creditosProject && <div
                                            className={`title-option ${tabSelected === 3 ? '-selected' : ''}`}
                                            onClick={() => this.changeTabInfo(3)}
                                        >Créditos</div>}
                                    </div>
                                    <div>
                                        {tabSelected === 1 && project[0].fields.memoriaProject &&
                                            <div className="l-detail-project__info-tabs-text">
                                                <Markdown source={project[0].fields.memoriaProject} />
                                            </div>
                                        }
                                        {tabSelected === 2 && project[0].fields.proyectoProject &&
                                            <div className="l-detail-project__info-tabs-text">
                                                <Markdown source={project[0].fields.proyectoProject} />
                                            </div>
                                        }
                                        {tabSelected === 3 && project[0].fields.creditosProject &&
                                            <div className="l-detail-project__info-tabs-text">
                                                <Markdown source={project[0].fields.creditosProject} />
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="l-detail-project__second-container">
                        {galleryImages}
                    </div>
                </Fragment>
            );
        } else {
            return null
        }
    }

    moveSlider = (d) => {
        const { positionArray, imageArrays } = this.state;

        if(d === 'next' && positionArray < (imageArrays.length - 1)) {
            this.setState({
                positionArray: positionArray + 1,
                showNext: true
            })
        } else if (d === 'last' && positionArray > 0) {
            this.setState({
                positionArray: positionArray - 1,
                showLast: true
            })
        }
    }

    buildMetaTags = () => {
        if(this.state.project.length > 0) {
            return (
                <MetaTags>
                    <title>|carnicería | {this.state.project[0].fields.title}</title>
                </MetaTags>
            )
        }
    }

    render() {
        const { imageArrays, positionArray, showLast, showNext, showSlider } = this.state;
        return (
            <Fragment>
                {this.buildMetaTags()}
                <Header />
                {showSlider && <div className="l-detail-project__slider">
                    <div className="l-detail-project__slider-container" ref={(el) => this.detailProject = el}>
                        {showLast &&<img
                            src={left}
                            alt="left"
                            className="l-detail-project__slider-last-arrow"
                            onClick={(() => this.moveSlider('last'))} />}
                        <img className="slider-image" src={imageArrays[positionArray]} alt="slider"/>
                        {showNext && <img
                            src={right}
                            alt="right"
                            className="l-detail-project__slider-next-arrow"
                            onClick={(() => this.moveSlider('next'))}/>}
                    </div>
                </div>}
                <div className="l-detail-project">
                    <div className="l-detail-project__grid">
                        {this.buildDetailProject()}
                    </div>
                </div>
                <Footer />
            </Fragment>
        );
    }
}

export { DetailProject };
