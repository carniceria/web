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
            tabSelected: 1
        }
    }

    componentDidMount() {
        this.fetchPosts().then(this.setProject);
    }

    fetchPosts = () => client.getEntries()

    setProject = response => {
        const { match } = this.props;

        this.setState({
            project: response.items.filter(item => item.sys.contentType.sys.id === 'project' && stripchar.RSExceptUnsAlpNum(item.fields.title.toLowerCase().replace(/\s/g,''), '_') === match.params.projectId)
        })
    }

    changeTabInfo = (tabSelected) => {
        this.setState({
            tabSelected
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

            return(
                <Fragment>
                    <div className="l-detail-project__first-container">
                        <div className="l-detail-project__info-tabs">
                            <h1>{project[0].fields.title}</h1>
                            <div className="l-detail-project__info-tabs-container">
                                <div className="l-detail-project__info-tabs-options">
                                    <div
                                        className={`title-option ${tabSelected === 1 ? '-selected' : ''}`}
                                        onClick={() => this.changeTabInfo(1)}
                                    >Memoria</div>
                                    <div
                                        className={`title-option ${tabSelected === 2 ? '-selected' : ''}`}
                                        onClick={() => this.changeTabInfo(2)}
                                    >Proyecto</div>
                                    <div
                                        className={`title-option ${tabSelected === 3 ? '-selected' : ''}`}
                                        onClick={() => this.changeTabInfo(3)}
                                    >Créditos</div>
                                </div>
                                <div>
                                    {tabSelected === 1 &&
                                        <div className="l-detail-project__info-tabs-text">
                                            <Markdown source={project[0].fields.memoriaProject} />
                                        </div>
                                    }
                                    {tabSelected === 2 &&
                                        <div className="l-detail-project__info-tabs-text">
                                            <Markdown source={project[0].fields.proyectoProject} />
                                        </div>
                                    }
                                    {tabSelected === 3 &&
                                        <div className="l-detail-project__info-tabs-text">
                                            <Markdown source={project[0].fields.creditosProject} />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
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
        return (
            <Fragment>
                {this.buildMetaTags()}
                <Header />
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
