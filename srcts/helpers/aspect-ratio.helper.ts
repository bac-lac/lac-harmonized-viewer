export class AspectRatio {

    width: number;
    height: number;
    cssClass: string;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.cssClass = `${this.width}-${this.height}`;
    }

    ratio(): number {
        return this.width / this.height;
    }

    static landscape(): AspectRatio[] {
        return [
            new AspectRatio(1, 1),
            new AspectRatio(5, 4),
            new AspectRatio(4, 3),
            new AspectRatio(3, 2),
            new AspectRatio(16, 9),
            new AspectRatio(3, 1)
        ].sort();
    }

    static portrait(): AspectRatio[] {
        return this.landscape()
            .map(i => new AspectRatio(i.height, i.width))
            .sort();
    }

    static closest(aspectRatio: number): AspectRatio {
        const ratios = (aspectRatio < 1) ? this.portrait() : this.landscape();
        return ratios.sort(i => Math.abs(i.ratio() - aspectRatio))[0];
    }

}