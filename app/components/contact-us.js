import React from 'react';

import ContactForm from './contact-form';
import ContactInformation from './contact-information';

export default class ContactUs extends React.Component {
  render() {
    return (
      <div id="contact-us-component" className="container contact-container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 contact-title">
            <h1>
              <u>Contact Us</u>
            </h1>
          </div>
          <ContactForm/>
        </div>
        <div className="row">
          <div className="col-md-8 col-md-offset-2 contact-title">
            <h1>
              <u>Company Information</u>
            </h1>
            <ContactInformation/>
          </div>
        </div>
      </div>
    )
  }
}
