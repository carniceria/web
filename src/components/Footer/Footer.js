import React, { Component } from 'react';
import { Link } from "react-router-dom";
import facebookLogo from './assets/facebook.svg';
import instagramLogo from './assets/instagram-logo.svg';


require('./Footer.scss');

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openContact: false,
            showFilters: false,
            firstOpen: false
        }
    }

    componentDidMount() {
        window.addEventListener('onmouseover', this.handleOnMouseOutside);
    }

    handleOnMouseOutside = (event) => {
        if(this.footer) {
            if (!this.footer.contains(event.target) && this.footer) {
                this.showFilters(false);
            }
        }
    }

    openContactModal = () => {
        const { openContact } = this.state;

        this.setState({
            openContact: !openContact
        })
    }

    showFilters = (showFilters) => {
        const { firstOpen } = this.state;
        setTimeout(
            function() {
                this.setState({
                    showFilters: showFilters
                })
            }
            .bind(this),
            firstOpen ? 200 : 2000
        );

        if (!this.state.firstOpen) {
            this.setState({
                firstOpen: true
            })
        }
    }

    changeCategory = (value) => {
        const { changeCategoryHome } = this.props
        changeCategoryHome(value);
    }

    render() {
        const { openContact, showFilters } = this.state;

        return (
            <div className="c-footer" ref={(el) => this.footer = el}>
                <div
                    className={`c-footer__box -filters ${showFilters ? '-pink': ''}`}
                    onMouseOver={() => showFilters ? this.showFilters(true) : null}
                    onMouseLeave={() => showFilters ? this.showFilters(false) : null}
                >
                    <div
                        className={`c-footer__box-filter-option ${showFilters ? '-show' : ''}`}
                        onClick={() => this.changeCategory('Arquitectura')}
                    >arquitectura</div>
                    <div
                        className={`c-footer__box-filter-option ${showFilters ? '-show' : ''}`}
                        onClick={() => this.changeCategory('Arte Digital')}
                    >arte digital</div>
                    <div
                        className={`c-footer__box-filter-option ${showFilters ? '-show' : ''}`}
                        onClick={() => this.changeCategory('Cine')}
                    >cine</div>
                    <div
                        className={`c-footer__box-filter-option ${showFilters ? '-show' : ''}`}
                        onClick={() => this.changeCategory('Comunicación')}
                    >comunicación</div>
                    <div
                        className={`c-footer__box-filter-option ${showFilters ? '-show' : ''}`}
                        onClick={() => this.changeCategory('Música')}
                    >música</div>
                </div>
                <div
                    to="/"
                    className="c-footer__box -home-link"
                    onMouseOver={() => this.showFilters(true)}
                    onMouseLeave={() => this.showFilters(false)}
                >
                    <span to="/">proyectos</span>
                </div>
                <div className="c-footer__box">
                    <Link to="/galaxy/">galaxia</Link>
                </div>
                <div className="c-footer__box">
                    {openContact &&
                        <div className="c-footer__box-modal">
                            <div className="c-footer__box-modal-contact-address">
                                <p>Madrid</p>
                                <p>C/ Eduardo Morales, 23</p>
                                <p>28025</p>
                            </div>
                            <div className="c-footer__box-modal-contact-email">
                                <p>espaciocarniceria@gmail.com</p>
                            </div>
                            <div className="c-footer__box-modal-social">
                                <a href="https://www.facebook.com/espaciocarniceria/" rel="noopener noreferrer" target="_blank">
                                    <img src={facebookLogo} alt="facebook logo"/>
                                </a>
                                <a href="https://www.instagram.com/espaciocarniceria/" rel="noopener noreferrer" target="_blank">
                                    <img src={instagramLogo} alt="instagram logo"/>
                                </a>
                            </div>
                        </div>
                    }
                    <span className="c-footer__open-contact" onClick={() => this.openContactModal()}>contacto</span>
                </div>
            </div>
        );
    }
}

export { Footer };
