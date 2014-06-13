var helpers = require('../helpers');

helpers.startCasper({
  setUp: function(){
    helpers.fakeVerification({statusCode: 403});
  },
});

casper.test.begin('Denied verification should only have cancel option.', {

  test: function(test) {

    helpers.doLogin();

    casper.waitForSelector('.full-error', function() {
      helpers.assertErrorCode('VERIFY_DENIED');
      test.assertElementCount('.full-error .button', 1, 'Should only be one button for cancelling the flow');
      casper.click('.full-error .button');
    });

    casper.waitUntilVisible('.throbber', function() {
      test.assertSelectorHasText('.msg', 'Payment cancelled', 'Check cancelled throbber is displayed');
    });

    casper.run(function() {
      test.done();
    });

  },
});
