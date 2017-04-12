import React from 'react';
import {postUserComment} from '../server';

export default class ContactForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputCatgory: "General"
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(e) {
        this.setState({inputName: e.target.value});
    }

    handleEmailChange(e) {
        this.setState({inputEmail: e.target.value});
    }

    handleMessageChange(e) {
        this.setState({inputMessage: e.target.value});
    }

    handleCategoryChange(e) {
        this.setState({inputCatgory: e.target.value});
    }

    handleSubmit(clickEvent) {
        clickEvent.preventDefault();
        var message = "From: " + this.state.inputName + "\nEmail: " + this.state.inputEmail + "\nCategory: " + this.state.inputCatgory + "\nMessage: " + this.state.inputMessage;
        postUserComment(1, 1, message, (comment) => {});
        this.setState({inputName: "", inputEmail: "", inputMessage: "", inputCatgory: "General"});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} role="form" data-toggle="validator">
                <div className="container col-md-8 col-md-offset-2 contact-form">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="inputName" className="control-label">Full Name:</label>
                                <input type="text" className="form-control" id="inputName" value={this.state.inputName} onChange={(e) => this.handleNameChange(e)} required data-error="Failure"></input>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="inputEmail" className="control-label">Email:</label>
                                <input type="email" className="form-control" id="inputEmail" value={this.state.inputEmail} onChange={(e) => this.handleEmailChange(e)} required data-error="Failure"></input>
                                <div className="help-block with-errors"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="usr">Category:</label>
                                <select className="form-control" id="sel1" value={this.state.inputCatgory} onChange={(e) => this.handleCategoryChange(e)}>
                                    <option>General</option>
                                    <option>Legal</option>
                                    <option>Partnership</option>
                                    <option>Payment</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="usr">Message:</label>
                                <textarea className="form-control" rows="5" id="message" value={this.state.inputMessage} onChange={(e) => this.handleMessageChange(e)} required data-error=""></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <button type="submit" className="form-control btn btn-default contact-submit">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}
