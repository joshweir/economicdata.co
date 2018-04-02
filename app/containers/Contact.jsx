import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="text-center g-color-gray-dark-v5 g-py-70">
      <div className="container g-max-width-770">
        <div className="u-heading-v8-2 g-mb-85">
          <h2 className="h1 text-uppercase u-heading-v8__title g-font-weight-700 g-font-size-26 g-color-gray-dark-v1 g-mb-25">Contact us</h2>
        </div>

        <form>
          <div className="row">
            <div className="col-md-6 form-group g-color-gray-dark-v5 g-mb-30">
              <input id="inputGroup1_1" className="form-control g-font-size-default g-placeholder-inherit g-bg-white g-bg-white--focus g-theme-brd-gray-light-v1 g-rounded-20 g-px-10 g-py-13" type="text" placeholder="Your name" />
            </div>

            <div className="col-md-6 form-group g-color-gray-dark-v5 g-mb-30">
              <input id="inputGroup1_2" className="form-control g-font-size-default g-placeholder-inherit g-bg-white g-bg-white--focus g-theme-brd-gray-light-v1 g-rounded-20 g-px-10 g-py-13" type="email" placeholder="Your email" />
            </div>

            <div className="col-md-12 form-group g-color-gray-dark-v5 g-mb-30">
              <input id="inputGroup1_3" className="form-control g-font-size-default g-placeholder-inherit g-bg-white g-bg-white--focus g-theme-brd-gray-light-v1 g-rounded-20 g-px-10 g-py-13" type="text" placeholder="Subject" />
            </div>

            <div className="col-md-12 form-group g-color-gray-dark-v5 g-mb-30">
              <textarea id="inputGroup1_4" className="form-control g-resize-none g-font-size-default g-placeholder-inherit g-bg-white g-bg-white--focus g-theme-brd-gray-light-v1 g-rounded-20 g-px-10 g-py-13" rows="6" placeholder="Message" />
            </div>
          </div>

          <div className="text-center">
            <button className="btn u-btn-primary btn-md text-uppercase g-font-weight-700 g-font-size-12 g-rounded-30 g-px-40 g-py-15 mb-0" type="submit" role="button">Send message</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
