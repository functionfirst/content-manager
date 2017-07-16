var nodemailer 	= require('nodemailer');

var smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'alan@functionfirst.co.uk',
      pass: '######'
  }
});

module.exports = smtpTransport;