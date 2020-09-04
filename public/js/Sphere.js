class Sphere{
    constructor(){
        this.x = width / 2;
        this.y = height / 2;
        this.numPoints = 40;
        this.noiseAmount = 15;
        this.radiusInit = random(width * 0.15, width * 0.2);
        this.radius = this.radiusInit;
        this.hueInit = int(random(360));
        this.hue = this.hueInit;
    }

    getPoints(){
        if(poses.length) {
            this.x = poses[0].pose.nose.x;
            this.y = poses[0].pose.nose.y;
        }
    }

    update(){
        this.radius = this.radiusInit + sin(frameCount * 2) * this.radiusInit * 0.3;
        this.hue = this.hueInit + sin(frameCount * 2) * 10;
    }

    display(){
        angleMode(DEGREES);
        noStroke();
        fill(this.hue, 100, 60, 20);
        beginShape();
        for (let i = 0; i < this.numPoints; i++) {
            let angle = (360 / this.numPoints) * i;
            let x = cos(angle) * this.radius + this.x;
            let y = sin(angle) * this.radius + this.y;
            let xnoise = (noise(frameCount * 0.02 + i) - 0.5) * this.noiseAmount;
            let ynoise = (noise(frameCount * 0.02 + i) - 0.5) * this.noiseAmount;
            vertex(x + xnoise, y + ynoise);
        }
        endShape(CLOSE);

        fill(this.hue, 100, 80, 20);
        beginShape();
        for (let i = 0; i < this.numPoints; i += 2) {
            let angle = (360 / this.numPoints) * i;
            let x = cos(angle) * this.radius * 0.9 + this.x;
            let y = sin(angle) * this.radius * 0.9 + this.y;
            let xnoise = (noise(frameCount * 0.02 + i) - 0.5) * (this.noiseAmount - 2);
            let ynoise = (noise(frameCount * 0.02 + i) - 0.5) * (this.noiseAmount - 2);
            vertex(x + xnoise, y + ynoise);
        }
        endShape(CLOSE);
    }
}