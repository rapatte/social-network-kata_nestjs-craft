import { Given, When, Then, Before } from '@cucumber/cucumber';

Before(function () {
  return (this.test = 'test');
});

Given(/^Description$/, function () {
  this.test = 'test';
});

When(/^Description1$/, function () {
  this.test = 'test';
});

Then(/^Description2$/, function () {
  this.test = 'test';
});
