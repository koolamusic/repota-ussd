'use strict';

var db = require('./../models');

exports.wiredUssd = function(req, res) {

  var message = '';

  var sessionId   = req.body.sessionId;
  var serviceCode = req.body.serviceCode;
  var phoneNumber = req.body.phoneNumber;
  var text 	      = req.body.text;

  console.log(sessionId, serviceCode, phoneNumber, text);

  var length = text.split('*').length;
  var txt = text.split('*');

  // look up - is customer? or Agent - offer 2 parts, agent -?
  if (text === '') {
	message = 'CON Welcome to Athena\n';
	message += '1: Help a Friend\n';
	message += '2: Help Me\n';
  }

  // SEND SOS
  else if (text === '2') {
    // end connection
  	message = 'END Your SOS has been sent';
  }
  // help a friend report an issue
  else if (text === '1') {
    message = 'CON Tell us where this is happening';
  }
  else if (length === 2 && txt[0] === '1') {
    message = 'CON Do you know any names or parties involved ? \n';
    // message += 'SARS';

  }
  // else if (length === 4 && txt[0] === '1') {
  //   message = 'CON Enter Warranty status\n';
  //   message += '1) Yes / 2) No';
  // }
  // else if (length === 5 && txt[0] === '1') {
  //   message = 'CON Enter Insurance status\n';
  //   message += '1). Yes / 2). No';
  // }
  // else if (length === 6 && txt[0] === '1') {
  //   message = 'CON Is device in stock\n';
  //   message += '1). Yes / 2). No';
  // }
  else if (length === 3 && txt[0] === '1') {
    // commit to db
    var options = text.split('*');
    message = `END Thank you so much\n The Issue at ${options[1]} has been reported`;

    db.Device.create({
      imei: options[1],
      color: options[2],
      model: options[1],
      warrant_status: options[1],
      insurance_status: options[1],
      in_stock: options[1]
    }).then(function(device) {
      console.log('Report Added', device);
    });

  }

  // add sales person
  else if (text === '2') {
    // check is user is agent
	message = 'CON Enter sales agent name\n';
  }
  else if (length === 2 && txt[0] === '2') {
	message = 'CON Enter sales agent email';
  }
  else if (length === 3 && txt[0] === '2') {
    message = 'CON Enter Agent sales code';
  }
  else if (length === 4 && txt[0] === '2') {
    message = 'CON Enter agent location\n';
    message += 'eg. Kilimani';
  }
  else if (length === 5 && txt[0] === '2') {
    message = 'END Sales agent added';
    var options = text.split('*');

    db.Agent.create({
      name: options[1],
      primary_email: options[2],
      agent_sales_code: options[3],
      location: options[4],
      phone_number: phoneNumber
    }).then(function(agent) {
      console.log('agent person added', agent);
    });
  }


  else if (text === '3') {
    message = 'CON Enter device IMEI number';
  }
  else if (length === 2 && txt[0] === '3') {
    message = 'CON Enter your ID number';
  }
  else if (length === 3 && txt[0] === '3') {
    // check device authenticity
    var options = text.split('*');

    db.Device.findOne({
      where: { imei: options[1] }
    }).then(function(device) {
      console.log('device found -', device);
      message = 'END You have a genuine device';
    });

    message = 'END You do not have a genuine device';
  }


  else if (text === '4') {
    message = 'CON Enter Sales code';
  }
  else if (length === 2 && txt[0] === '4') {
      message = 'CON Enter Phone IMEI number';
  }
  else if (length === 3 && txt[0] === '4') {
      message = 'CON Enter Buyer ID number';
  }
  else if (length === 4 && txt[0] === '4') {
      message = 'CON Enter Buyer Name';
  }
  else if (length === 5 && txt[0] === '4') {
      message = 'CON Enter Buyer Phone number';
  }
  else if (length === 6 && txt[0] === '4') {
    message = 'END Device sold';
    var options = text.split('*');

    db.Sale.create({
      sales_code: options[1],
      imei: options[2],
      buyer_id: options[3],
      buyer_name: options[4],
      buyer_phone_number: options[5]
    }).then(function(sales) {
      console.log('sales added', sales);
    });

    db.Device.findOne({
      where: { imei: options[1] }
    }).then(function(device) {
      device.update({
        sold: 'true'
      }).then(function(device) {
        console.log('device marked as sold', device);
      });
    });
  }

  else {
	message = 'END Wrong input';
    // reply with menu
  }

  res.contentType('text/plain');
  res.send(message, 200);
};
