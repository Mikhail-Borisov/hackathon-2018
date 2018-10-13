export class ReadTimeGenerator {

    private WPM: number;
    private searchTemplate: RegExp;
    private pictureTemplate: RegExp;
    constructor() {
        this.WPM = 275;
        this.searchTemplate = /<[^>]*>|(\s){2}/;
        this.pictureTemplate = /<picture[^>]*>/g;
    }

    public generate(text: string): number {
        const imageTime: number = this.generateImageTime(text);
        const clearText: string = this.clean(text);
        const readTimeText: number = this.generateTextTime(clearText);
        const readTime = (readTimeText < 0.5) ?
            Math.round(readTimeText + 0.5) :
            Math.round(readTimeText);
        return readTime + imageTime;
    }

    private generateTextTime(clearText: string): number {
        try {
            return clearText.split(' ').length / this.WPM;
        } catch (error) {
            return 0;
        }
    }

    private clean(text: string): string {
        return text.replace(this.searchTemplate, '');
    }

    private generateImageTime(text: string): number {
        try {
            const images = text.match(this.pictureTemplate);
            if (!images) {
                return 0;
            }
            return Math.round(images.length * 2 / 60 + 0.5);
        } catch (error) {
            return 0;
        }
    }
}


export const readTimeGenerator = new ReadTimeGenerator(); 