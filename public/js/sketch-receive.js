const socket = io();

const camWidth = 160;
const camHeight = 120;

let socketId = [];
let particleData = [];
let users = [];

let scene = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1);
    noStroke();

    socket.on('broadcast', function(dataReceived){

        particleData = dataReceived;

        if(dataReceived.data.length > 0){
            let socketIndex = socketId.indexOf(dataReceived.id);
            if(socketIndex >= 0){
                if(users[socketIndex]){
                    scene = dataReceived.data[0];

                    let particles = users[socketIndex];
                    for(let i = 0; i < particles.length; i++){
                        let p = dataReceived.data[i + 1];
                        particles[i].updateData(p[0], p[1], p[2], p[3]);
                    }
                }
            }else{
                socketId.push(dataReceived.id);
                let newParticles = [];

                for(let y = 0; y < camHeight; y += 3){
                    for(let x = 0; x < camWidth; x += 3){
                        let mappedX = map(x, 0, camWidth, camWidth * 3, 0);
                        let mappedY = map(y, 0, camHeight, 0, camHeight * 3);

                        newParticles.push(new Particle(mappedX, mappedY));
                    }
                }
                users[socketId.length - 1] = newParticles;
            }
        }

    });

    socket.on('disconnect', function(id){
        let socketIndex = socketId.indexOf(id);

        socketId.splice(socketIndex, 1);
        users.splice(socketIndex, 1);
    });

}

function draw(){
    background(255, 30);

    for(let j = 0; j < users.length; j++){
        let particles = users[j];
        translate(width / 2 * j, 0);
        push();
        for(let i = 0; i < particles.length; i++){
            particles[i].update();
            particles[i].display();
        }
        pop();
    }

}