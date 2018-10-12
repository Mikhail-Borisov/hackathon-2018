type DataBaseConfig = {
    host: string;
    port: string;
    database: string;
    username: string;
    password: string;
};  

class DbConfig {
    public type!: 'postgres';
    public host!: string;
    public database!: string;
    public username!: string;
    public password!: string;

    constructor(config: DataBaseConfig) {
        const fullConfig = {
            ...this.defaults,
            ...config
        };
        Object.assign(this, fullConfig);
    }

    private get defaults(): Object {
        return {
            type: 'postgres',
            logging: 'all',
            migrations: ['dist/components/db/migrations/*.js'],
            cli: {
                migrationsDir: 'src/migrations'
            }
        };
    }
}

export { DbConfig, DataBaseConfig };