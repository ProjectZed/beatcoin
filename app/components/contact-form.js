import React from 'react';

export default class ContactForm extends React.Component {
    render() {
        return (
            <form role="form" data-toggle="validator">
                <div className="container col-md-8 col-md-offset-2 contact-form">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="inputName" className="control-label">Full Name:</label>
                                <input type="text" className="form-control" id="inputName" required data-error="Failure"></input>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="inputEmail" className="control-label">Email:</label>
                                <input type="email" className="form-control" id="inputEmail" required data-error="Failure"></input>
                                    <div className="help-block with-errors"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="usr">Category:</label>
                                <select className="form-control" id="sel1">
                                    <option defaultValue>General</option>
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
                                <textarea className="form-control" rows="5" id="message" required data-error=""></textarea>
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
