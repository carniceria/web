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

require('./DetailPeople.scss');


const client = contentful.createClient({
    space: process.env.REACT_APP_SPACE_CONTENTFUL,
    accessToken: process.env.REACT_APP_TOKEN_CONTENTFUL
})

class DetailPeople extends Component {
    constructor(props) {
        super(props);

        this.state = {
            people: [],
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
        this.fetchPosts().then(this.setPeople);
    }

    fetchPosts = () => client.getEntries()

    setPeople = response => {
        const { match } = this.props;

        this.setState({
            people: response.items.filter(item => item.sys.contentType.sys.id === 'peopleCarniceria' && stripchar.RSExceptUnsAlpNum(item.fields.name.toLowerCase().replace(/\s/g,''), '_') === match.params.peopletId)
        })
    }

    buildMetaTags = () => {
        if(this.state.people.length > 0) {
            return (
                <MetaTags>
                    <title>|carnicería | {this.state.people[0].fields.name}</title>
                </MetaTags>
            )
        }
    }

    buildDetailPeople = () => {
        const { people } = this.state;
        if (people[0]) {
            return (
                <Fragment>
                    <div className="l-detail-people__first-container">
                        {}
                    </div>

                    <div className="l-detail-people__second-container">
                        <h1>{people[0].fields.name}</h1>
                    </div>
                </Fragment>
            )
        }
    }

    render() {
        return (
            <Fragment>
                {this.buildMetaTags()}
                <Header />
                    <div className="l-detail-people">
                        <div className="l-detail-people__grid">
                            {this.buildDetailPeople()}
                        </div>
                    </div>
                <Footer />
            </Fragment>
        );
    }
}

export { DetailPeople };
