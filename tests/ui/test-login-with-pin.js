var helpers = require('../helpers');


helpers.startCasper('/mozpay/', function(){
  helpers.fakePinData({pin: true});
});

casper.test.begin('Login test has pin', {
  test: function(test) {

    helpers.doLogin();

    casper.waitForUrl(helpers.url('enter-pin'), function() {
      test.assertVisible('.pinbox', 'Pin entry widget should be displayed');
      test.assertExists('.forgot-pin', 'Forgot-pin should be shown for when you enter your pin.');
    });

    casper.run(function() {
      test.done();
    });
  },
});
