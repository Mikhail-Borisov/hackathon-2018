import * as Express from 'express';
import { createExpressServer } from 'routing-controllers';
import * as cluster from 'cluster';

type ServerConfig = {
    host: string;
    port: number;
    workers: number;
};

class Application {
    private app: Express.Application;
    private config: ServerConfig;
    public static DEFAULT_CONFIG: ServerConfig = { host: 'localhost', port: 3000, workers: 1 };

    constructor(
        controllers: Function[] | string[],
        middlewares: Function[] | string[],
        config: ServerConfig = Application.DEFAULT_CONFIG
    ) {
        this.config = config;
        this.app = createExpressServer({
            defaultErrorHandler: true,
            controllers,
            middlewares
        });
    }
    
    public run(): void {
        if (this.config.workers === 1) {
            this.launch();
        } else {
            this.clusterLaunch();
        }
    }

    protected launch(): void {
        const { host, port } = this.config;
        this.app.listen({ host, port }, () => {
            console.log(`Server started at http://${host}:${port}`);
        });
    }

    protected clusterLaunch(): void {
        if (cluster.isMaster) {
            const workersCount = this.config.workers;
            console.log(`Starting ${workersCount} workers`);
            for (let i = 0; i < workersCount; i++) {
                cluster.fork();
            }
        } else {
            this.launch();
        }
    }

}

export { Application, ServerConfig };