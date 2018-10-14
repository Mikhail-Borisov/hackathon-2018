import axios, { AxiosInstance } from 'axios';
import { JobStrory } from '../models/JobStory';
import { SkillTag } from '../../../modules/course/models/Tag';

const serviceBaseUrl = 'http://localhost:5000';

class TagConverter {
    private http: AxiosInstance;

    constructor(baseUrl: string) {
        this.http = axios.create({
            baseURL: baseUrl
        });
    }

    public async make(jobs: JobStrory[], tags: SkillTag[]): Promise<SkillTag[]> {
        const text = jobs
            .map(job => `${job.position} ${job.duties} ${job.results}`)
            .join(' ');
        const tagList = tags.map(tag => tag.title);
        let result: SkillTag[] = [];
        try {
            console.log(text, tagList);
            const responseData = (await this.http.post<{ tags: string[]; }>('/', {
                text: text,
                tags: tagList
            })).data;

            result = tags
                .filter(tag => responseData.tags.find(tagName => tagName == tag.title));

        } catch (error) {
            result = [];
        }
        return result;
    }
}

export { TagConverter, serviceBaseUrl };