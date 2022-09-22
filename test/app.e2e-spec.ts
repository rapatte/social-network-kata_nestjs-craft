import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (POST)', () => {
    const message = { author: 'Alice', message: 'Hello.' };
    return request(app.getHttpServer())
      .post('/')
      .send(message)
      .expect(201)
      .expect({
        author: 'Alice',
        message: 'Hello.',
      });
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect([
        { author: 'Kevin', message: 'Pouetpouet.' },
        { author: 'Michel', message: "C'est le brésil." },
        { author: 'Laura', message: 'Hello.' },
        { author: 'Alice', message: 'Hello.' },
      ]);
  });
});
