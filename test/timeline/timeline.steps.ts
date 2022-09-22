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

//Posting test
Given(
  /^Alice wants to publish on her timeline a message as shown in the table$/,
  function (table) {
    this.message = table.rowsHash();
  },
);

When(/^Alice posts her message$/, async function () {
  await appService.postingMessageInPersonalTimeline(this.message);
});

Then(/^The message is created as shown in the table$/, function (table) {
  this.lastMessage = timeline[timeline.length - 1];
  this.expectedMessage = table.rowsHash();
  expect(this.lastMessage).to.eql(this.expectedMessage);
});

//Reading test
Given(
  /^Bob should view Alice timeline as shown in the table$/,
  function (table) {
    this.expectedTimeline = table.hashes();
  },
);
When(/^Bob browse Alice timeline$/, async function () {
  this.timeline = await appService.readingMessageInPersonnalTimeline();
});
Then(
  /^All messages appear in the timeline as shown in the first table$/,
  function () {
    expect(this.timeline.length).to.eql(this.expectedTimeline.length);
    expect(this.timeline).to.eql(this.expectedTimeline);
  },
);
