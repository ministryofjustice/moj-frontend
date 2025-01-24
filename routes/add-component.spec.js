global.setImmediate = (callback) => setTimeout(callback, 0);

const expressNunjucks = require('express-nunjucks').default;
const nunjucks = require('nunjucks');
const request = require('supertest');
const express = require('express');
const router = require('./add-component');
const path = require('path');
const session = require('express-session');

const currentDirectory = __dirname;
const parentDirectory = path.resolve(currentDirectory, '..');

const app = express();

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 },
  })
);

app.set('views', [
  path.join(parentDirectory, 'views/common'),
  path.join(parentDirectory, 'views/community/pages'),
  path.join(parentDirectory, 'node_modules/govuk-frontend/dist'),
  path.join(parentDirectory, 'node_modules/@ministryofjustice/frontend'),
]);
app.set('view engine', 'njk');
expressNunjucks(app, {
  loader: nunjucks.FileSystemLoader,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(parentDirectory, 'public')));
app.use(express.json());
app.use('/assets', express.static(path.join(parentDirectory, 'public')));

app.use('/get-involved/add-new-component', router);

beforeAll(() => {
  global.console.log = jest.fn();
  global.console.error = jest.fn();
});

afterAll(() => {
  global.console.log.mockRestore();
  global.console.error.mockRestore();
});

describe('Component Details Form Tests', () => {
  describe('GET /get-involved/add-new-component/component-details', () => {
    it('should render the form page successfully', async () => {
      const response = await request(app).get('/get-involved/add-new-component/component-details');

      expect(response.status).toBe(200);
      expect(response.text).toContain('<form method="post" action="/get-involved/add-new-component/component-details">');
      expect(response.text).toContain('What is the name of the component?');
      expect(response.text).toContain('Add a brief description about the component');
      expect(response.text).toContain('Why do you think the component is needed?');
    });
  });

  describe('POST /get-involved/add-new-component/component-details', () => {
    it('should return errors if required fields are missing', async () => {
      const response = await request(app)
        .post('/get-involved/add-new-component/component-details')
        .send({});

      expect(response.status).toBe(400);
      expect(response.text).toContain('govuk-error-summary');
      expect(response.text).toContain('There is a problem');
      expect(response.text).toContain('&quot;Component Name&quot; is required');
      expect(response.text).toContain('&quot;Brief Description&quot; is required');
      expect(response.text).toContain('&quot;Why Needed&quot; is required');
    });

    it('should redirect to the next page if all fields are valid', async () => {
      const response = await request(app)
        .post('/get-involved/add-new-component/component-details')
        .send({
          componentName: 'Test Component',
          briefDescription: 'A brief description',
          whyNeeded: 'It is needed for testing',
        });

      expect(response.status).toBe(302);
      expect(response.header.location).toBe('/get-involved/add-new-component/component-image');
    });
  });
});
