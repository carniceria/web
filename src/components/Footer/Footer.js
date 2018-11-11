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

    render() {
        const { openContact, showFilters } = this.state;

        return (
            <div className="c-footer">
                <div
                    className={`c-footer__box -filters ${showFilters ? '-pink': ''}`}
                    onMouseOver={() => showFilters ? this.showFilters(true) : null}
                    onMouseLeave={() => showFilters ? this.showFilters(false) : null}
                >
                    <div
                        className={`c-footer__box-filter-option ${showFilters ? '-show' : ''}`}
                    >arte digital</div>
                    <div
                        className={`c-footer__box-filter-option ${showFilters ? '-show' : ''}`}
                    >comunicación</div>
                    <div
                        className={`c-footer__box-filter-option ${showFilters ? '-show' : ''}`}
                    >música</div>
                    <div
                        className={`c-footer__box-filter-option ${showFilters ? '-show' : ''}`}
                    >cine</div>
                    <div
                        className={`c-footer__box-filter-option ${showFilters ? '-show' : ''}`}
                    >arquitectura</div>
                </div>
                <div
                    to="/"
                    className="c-footer__box -home-link"
                    onMouseOver={() => this.showFilters(true)}
                    onMouseLeave={() => this.showFilters(false)}
                >
                    <span to="/">proyectos</span>
                </div>
                <div className="c-footer__box">galaxia</div>
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
