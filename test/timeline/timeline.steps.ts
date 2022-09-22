import { Given, When, Then, Before } from '@cucumber/cucumber';
import { expect } from 'chai';
import { TestingModule, Test } from '@nestjs/testing';
import { AppService } from '../../src/app.service';
import { Timeline } from '../../types/Timeline';
import { TimelineMocked } from '../../src/app.repository';

let appService: AppService;
let timeline: Timeline;

Before(async function () {
  const app: TestingModule = await Test.createTestingModule({
    providers: [AppService],
  }).compile();

  appService = app.get<AppService>(AppService);
  timeline = TimelineMocked;
});

Given(
  /^Alice wants to publish on her timeline a message as shown in the table$/,
  function (table) {
    this.message = table.rowsHash();
  },
);

When(/^Alice posts her message$/, function () {
  appService.postingMessageInPersonalTimeline(this.message);
  console.log(timeline);
});

Then(/^The message is created as shown in the table$/, function (table) {
  this.lastMessage = timeline[timeline.length - 1];
  this.expectedMessage = table.rowsHash();
  expect(this.lastMessage).to.eql(this.expectedMessage);
});
