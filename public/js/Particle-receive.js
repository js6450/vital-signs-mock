class Particle{
    constructor(x, y){

        this.x = x;
        this.y = y;
        this.xStart = x;
        this.xRange = random(-60, 60);

        this.size = 0;
        this.maxSize = 35;
        // this.startDecay = false;
        this.lifeSpeed = random(0.2, 1.5);
        this.pulseSpeed = random(0.01, 0.1);
        this.opacity = 100;
       // this.drawParticle = false;
    }

    updateData(drawParticle, r, g, b) {

        this.drawParticle = drawParticle;
        this.r = r;
        this.g = g;
        this.b = b;

    }

    update(drawParticle, r, g, b){


        this.opacity = (sin(frameCount * this.pulseSpeed) * 50) + 50;

        if(scene === 0){
            this.size += this.lifeSpeed;

            if(this.size > this.maxSize || this.size < 0){
                this.lifeSpeed *= -1;
            }

            this.x = this.xStart + sin(frameCount * this.pulseSpeed) * this.xRange
        }
        else if(scene === 1){
            this.size = 10 * sin(frameCount * this.pulseSpeed) + 20;
        }

    }

    display(){
        if(this.drawParticle){
            noStroke();
            fill(this.r, this.g, this.b, this.opacity);
//            ellipse(this.x, this.y, this.size, this.size);
           rect(this.x, this.y, this.size, this.size);

        }
    }
}