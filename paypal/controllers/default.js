// $ npm install paypal-express-checkout
var paypal = require('paypal-express-checkout');

exports.install = function() {
	F.route('/');
	F.route('/pay/', redirect_payment);
	F.route('/paypal/ok/', view_payment);
};

function redirect_payment() {
	var self = this;
	var payment = paypal.init(CONFIG('paypal-user'), CONFIG('paypal-password'), CONFIG('paypal-signature'), CONFIG('paypal-return'), CONFIG('paypal-cancel'), DEBUG);

	var orderNumber = 100;
	var price = 12.23;

	payment.pay(orderNumber, price, 'support', 'EUR', function(err, url) {
		if (err)
			self.throw500(err);
		else
			self.redirect(url);
	});
};

function view_payment() {
	var self = this;
	var payment = paypal.init(CONFIG('paypal-user'), CONFIG('paypal-password'), CONFIG('paypal-signature'), CONFIG('paypal-return'), CONFIG('paypal-cancel'), DEBUG);

	payment.detail(self, function(err, data) {

		if (err) {
			self.throw500(err);
			return;
		}

		/*
		{
		  "TOKEN": "EC-2CM91608R1120253F",
		  "TIMESTAMP": "2013-01-27T10:18:20Z",
		  "CORRELATIONID": "d5b0e56e2875b",
		  "ACK": "Success",
		  "VERSION": "52.0",
		  "BUILD": "4181146",
		  "TRANSACTIONID": "5BG30034J7311192A",
		  "TRANSACTIONTYPE": "expresscheckout",
		  "PAYMENTTYPE": "instant",
		  "ORDERTIME": "2013-01-27T10:18:19Z",
		  "AMT": "12.23",
		  "TAXAMT": "0.00",
		  "CURRENCYCODE": "EUR",
		  "PAYMENTSTATUS": "Pending",
		  "PENDINGREASON": "multicurrency",
		  "REASONCODE": "None"
		}
		*/

  		if (data.ACK === 'Success')
  			console.log('OK');

		self.json(data);
	});
};