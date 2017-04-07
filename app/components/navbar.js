import React from 'react';
import {Link} from 'react-router';
import ResetDatabase from '../database';

export default class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-fixed-top navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">
                            <span className="glyphicon glyphicon-home"></span>
                        </a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <form className="navbar-form navbar-left" role="search">
                            <div className="input-group">
                                <input type="text" className="form-control bc-search" placeholder="Search Beatcoin"></input>
                                <span className="input-group-btn">
                                    <button type="submit" className="btn btn-default">
                                        <span className="glyphicon glyphicon-search"></span>
                                    </button>
                                </span>
                            </div>
                        </form>
                        <div className="nav navbar-nav navbar-right">
                            <div className="btn-toolbar pull-right" role="toolbar">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default navbar-btn">
                                        <Link to="/redeem">$15</Link>
                                    </button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default navbar-btn">
                                        Upload
                                    </button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default navbar-btn">
                                        Profile
                                    </button>
                                    <div className="btn-group" role="group">
                                        <button type="button" className="btn btn-default dropdown-toggle navbar-btn" data-toggle="dropdown">
                                            <span className="caret"></span>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a href="#">Redeem Beatcoins</a>
                                            </li>
                                            <li>
                                                <a href="#">Contact Us</a>
                                            </li>
                                            <li>
                                                <a href="#">Log out</a>
                                            </li>
                                            <li>
                                                <ResetDatabase></ResetDatabase>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}
