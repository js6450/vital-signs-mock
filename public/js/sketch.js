let bodypix;
let video;
let segmentation;
let prevPixelData;
let pixelData;

let scene = 1;

let particles = [];
let particlesRefreshed = false;

const camWidth = 160;
const camHeight = 120;

const socket = io();

const options = {
    outputStride: 8, // 8, 16, or 32, default is 16
    segmentationThreshold: 0.5 // 0 - 1, defaults to 0.5
};

function preload(){
    bodypix = ml5.bodyPix(options);
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    video = createCapture(VIDEO);
    video.size(camWidth, camHeight);
    // video.hide();
    bodypix.segment(video, gotResults);
    pixelDensity(1);

    for(let y = 0; y < camHeight; y += 2){
        for(let x = 0; x < camWidth; x += 2){
            let mappedX = map(x, 0, camWidth, width, 0);
            let mappedY = map(y, 0, camHeight, 0, height);

            particles.push(new Particle(mappedX, mappedY));
        }
    }

}

function gotResults(err, result) {
    if (err) {
        console.log(err);
        return;
    }

    if(pixelData){
        prevPixelData = pixelData;
    }

    segmentation = result;
    //image(segmentation.backgroundMask, 0, 0, camWidth, camHeight);
    segmentation.backgroundMask.loadPixels();
    pixelData = segmentation.backgroundMask.pixels;

    bodypix.segment(video, gotResults);

}

function keyPressed(){
    if(key == 1){
        scene = 0;
    }

    if(key == 2){
        scene = 1;
    }

    console.log(key);
}


function draw(){
    background(0, 30);

    if(pixelData != null && prevPixelData != null){

        let packagedData = [];
        packagedData.push(scene);

        for(let i = 0; i < particles.length; i++){
            particles[i].update();
            particles[i].display();
            //
            packagedData.push([
                particles[i].drawParticle,
                particles[i].r,
                particles[i].g,
                particles[i].b
            ]);
        }

        if(frameCount % 10 === 0){
            socket.emit('data', packagedData);
        }
    }


    //sendData();

    fill(255);
    rect(10, 10, 100, 20);
    fill(0);
    text(int(frameRate()), 20, 20);
}