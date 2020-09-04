let video;
let poseNet;
let poses = [];
let cvs;

let mode = 0;
let sphere;
let pulse;

function setup() {
    cvs = createCanvas(windowWidth, windowHeight);
    cvs.id('overlay');
    video = createCapture(VIDEO);
    video.size(width, height);

    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', function(results) {
        poses = results;
    });
    video.hide();

    document.getElementById('vid-off').addEventListener('click', function(){
        if(document.getElementById('video-stream').style.display == "block"){
            document.getElementById('video-stream').style.display = "none";
            document.getElementById('overlay').style.opacity = 1;
            document.getElementById('vid-off').innerHTML = "Video On";
        }else{
            document.getElementById('video-stream').style.display = "block";
            document.getElementById('overlay').style.opacity = 0.5;
            document.getElementById('vid-off').innerHTML = "Video Off";
        }
    });

    sphere = new Sphere();
    pulse = new Pulse();

    colorMode(HSB, 360, 100, 100, 100);
}

function modelReady() {
    select('#status').html('Model Loaded');
}

function draw() {
    background(0, 0, 100, 3);
    //image(video, 0, 0, width, height);
    if(mode === 0){
        sphere.getPoints();
        sphere.display();
    }else if(mode === 1){
        // start displaying spheres of other users
        sphere.getPoints();
        sphere.update();
        sphere.display();
    }else if(mode == 2){
        pulse.getPoints();
        pulse.display();
    }else if(mode == 3){
        pulse.getPoints();
        pulse.display();
    }
}

function keyPressed(){
    console.log(key);
    if(key == 0){
        mode = 0;
    }
    if(key == 1){
        mode = 1;
    }

    if(key == 2){
        pulse.changeBoundMode(0);
        mode = 2;
    }

    if(key == 3){
        pulse.changeBoundMode(1);
        mode = 3;
    }

    clear();
}