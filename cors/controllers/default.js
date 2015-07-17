exports.install = function() {
	F.route('/time/', cors_time_preflight, ['options']);
	F.route('/time/', cors_time);
};

function cors_time_preflight() {

	var self = this;

	if (!self.cors('*', ['GET'])) {
		self.plain('NOT ALLOWED - OPTIONS - PREFLIGHT');
		return;
	}

	self.empty();
}

function cors_time() {

	var self = this;

	if (!self.cors('*', ['GET'])) {
		self.plain('Not allowed');
		return;
	}

	// OR

	/*
	if (!self.cors(['totaljs.com', 'google.com'], ['GET', 'POST'])) {
		self.plain('Not allowed');
		return;
	}
	*/

	// OR

	/*

	// @allow, [@method], [@header], [@credentials]
	// true == with credentials

	if (!self.cors(['totaljs.com', 'google.com'], true)) {
		self.plain('Not allowed');
		return;
	}
	*/

	self.plain(new Date().toString());
}