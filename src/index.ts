import express, { Express } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import routes from './routes';

const app: Express = express();
const port = process.env.PORT || 3000;

// body-parser
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Follow Express security best paractice http://expressjs.com/en/advanced/best-practice-security.html#use-helmet
app.use(helmet());

// routes
app.use('/', routes);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
