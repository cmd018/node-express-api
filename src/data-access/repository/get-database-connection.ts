import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnection,
  getConnectionManager,
} from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import EntityList from './entities';

interface CancelToken {
  cancel?: Function;
}

const promiseTimeoutErrorWrapper = (
  timeout: number,
  errorMessage: string,
  token: CancelToken,
): Promise<void> => new Promise<void>((resolve, reject) => {
  const timeoutId = setTimeout(
    () => reject(new Error(errorMessage)),
    timeout,
  );

  token.cancel = () => {
    clearTimeout(timeoutId);
    resolve();
  };
});

const timeoutPromise = <PromiseResult extends any>(
  promise: Promise<PromiseResult>,
  milliseconds: number,
  errorMessage: string,
): Promise<PromiseResult> => {
  const cancelToken: CancelToken = {};
  const wrapper = Promise.race<PromiseResult>([
    promise,
    promiseTimeoutErrorWrapper(
      milliseconds,
      errorMessage,
      cancelToken,
    ) as never,
  ]);
  const cancelTimer = () => {
    if (cancelToken.cancel) {
      cancelToken.cancel();
    }
  };
  promise.then(
    () => cancelTimer(),
    () => cancelTimer(),
  );
  return wrapper;
};

export const getDatabaseConnection = async (): Promise<Connection> => {
  let existingConnection: Connection | undefined;
  let dbConnection: Promise<Connection>;

  if (getConnectionManager().has('default')) {
    existingConnection = getConnectionManager().get('default');
  }

  if (existingConnection) {
    if (!existingConnection.isConnected) {
      dbConnection = existingConnection.connect();
    } else {
      return existingConnection;
    }
  } else {
    dbConnection = createConnection({
      type: 'postgres',
      port: 5432,
      database: 'tw',
      schema: 'tw',
      synchronize: false,
      ssl: undefined,
      logging: false, // Toggle this to view enable/disable printing SQL statements to log
      subscribers: ['src/lib/db/subscriber/**/!(*.spec).ts'],
      cli: {
        entitiesDir: 'src/lib/db/entity',
        migrationsDir: 'src/lib/db/migration',
        subscribersDir: 'src/lib/db/subscriber',
      },
      namingStrategy: new SnakeNamingStrategy(),

      // TODO: get DB credential based in ENV
      host: '172.17.0.1',
      username: 'postgres',
      password: 'password',
      migrations: [],
      entities: EntityList,
    } as ConnectionOptions);
  }

  return timeoutPromise(
    dbConnection,
    30000,
    'Timeout waiting for DB connection',
  );
};

// TODO: Close db connection
export const closeDatabaseConnection = async (): Promise<void> => {
  try {
    if (
      getConnectionManager().has('default')
      && getConnectionManager().get('default').isConnected
    ) {
      await getConnection().close();
    }
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
  // eslint-disable-next-line
  return;
};
