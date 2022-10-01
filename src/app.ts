import path from 'path';
import express, { Express } from 'express';
import userRouter from './routes/user.routes';
import indexRouter from './routes/index.routes'
import { create, ExpressHandlebars } from 'express-handlebars';
import * as helpers from './views/helpers/helpers';
import { createProxyMiddleware } from 'http-proxy-middleware';
import config from './config'

export class App {
  private app: Express;
  private hbs: ExpressHandlebars

  constructor() {
    this.app = express()
    this.hbs = create({
      helpers,
      extname: '.hbs',
      partialsDir: path.join(__dirname, '/views/partials'),
    });


    this.settings()
    this.middlewares()
    this.routes()
  }

  private settings() {
    this.app.locals.globals = config;
    this.app.engine('.hbs', this.hbs.engine);
    this.app.set('view engine', '.hbs');
    this.app.set('views', path.join(__dirname, '/views'));
    this.app.set('PORT', config.server.port)
  }

  private middlewares() {
    this.app.use(express.static(path.resolve(__dirname, './public')));

    this.app.use(
      '/bootstrap',
      express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css/'))
    );
    this.app.use('/icons', express.static(path.join(__dirname, '../node_modules/bootstrap-icons/font/bootstrap-icons.css')))
    this.app.use('/fonts', express.static(path.join(__dirname, '../node_modules/bootstrap-icons/font/fonts')))

    this.app.use(
      '/instastories',
      createProxyMiddleware({
        target: config.services.instastories.api,
        changeOrigin: true,
        pathRewrite: {
          [`/instastories`]: '',
        },
      })
    );

    this.app.use(
      '/proxy',
      createProxyMiddleware({
        target: config.services.instagram.cdn,
        changeOrigin: true,
        pathRewrite: {
          [`/proxy`]: '',
        },
      })
    )
  }

  private routes() {
    this.app.use('/', indexRouter)
    this.app.use('/@', userRouter);
  }


  listen() {
    this.app.listen(this.app.get('PORT'), () => {
      console.log(`Server listening on port: ${this.app.get('PORT')}`)
    })
  }
}