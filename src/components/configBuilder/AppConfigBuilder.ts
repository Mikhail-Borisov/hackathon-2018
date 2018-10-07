import { resolve } from "path";
import { requireConfigsByPattern, ConfigFile } from './requireConfigObject';

type FullConfiguration = {
    [key: string]: ConfigFile;
};

/*
 * @class AppConfigBuilder
 * @classdesc Реквайрит содержимое указанной папки,
 * сохраняя в памяти в виде структуры Map
 */
class AppConfigBuilder {
    private configPath: string;
    private fullConfig: Map<string, any>;

    constructor(pathToConfigDir: string) {
        const wildcard = '*';
        this.configPath = resolve(pathToConfigDir, wildcard);
        this.fullConfig = new Map<string, any>();
        this.init();
    }

   /*
    * @param {string} name Название файла из папки конфигов. Без расширения
    */
    public getConfig<T>(name: string): T | never {
        const config = this.fullConfig.get(name);
        if (!config) {
            throw new Error(`Config not found! Name: ${name}`);
        }
        return config as T;
    }

    public getFull(): FullConfiguration {
        const configObject: FullConfiguration = {};
        [...this.fullConfig].forEach(config => {
            configObject[config[0]] = config[1];
        });
        return configObject;
    }

    public print(): void {
        console.log(JSON.stringify(this.getFull(), null, 2));
    }

    private init(): void {
        requireConfigsByPattern([this.configPath])
            .forEach(config => {
                this.fullConfig.set(config.name, config.content);
            });

    }
}

export { AppConfigBuilder };