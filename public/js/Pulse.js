class Pulse{
    constructor(){
        this.pointLimit = 7;
        this.points = [];
        this.hue = random(360);

        this.particles = [];

        for(let i = 0; i < 50; i++){
            this.particles.push(new Particle(this.hue));
        }
    }

    changeBoundMode(mode){
        for(let i = 0; i < this.particles.length; i++){
            this.particles[i].boundMode = mode;
        }
    }

    getPoints(){
        this.points = [];

        if(poses.length){
            let pose = poses[0].pose;

            this.ellipse_x = pose.keypoints[0].position.x;
            this.ellipse_y = pose.keypoints[3].position.y;
            this.ellipse_h = abs(pose.keypoints[3].position.x - pose.keypoints[4].position.x) * 1.5;
            this.ellipse_w = abs(pose.keypoints[3].position.x - pose.keypoints[4].position.x) * 1.1;

            this.box_y = pose.keypoints[5].position.y;
            this.box_left = pose.keypoints[5].position.x;
            this.box_right = pose.keypoints[6].position.x;
        }

        for(let i = 0; i < this.particles.length; i++){
            this.particles[i].getBounds(this.ellipse_x, this.ellipse_y, this.ellipse_w, this.ellipse_h, this.box_y, this.box_left, this.box_right);
        }
    }

    display(){
        noStroke();

        for(let i = 0; i < this.particles.length; i++){
            this.particles[i].update();
            this.particles[i].display();
        }

    }
}