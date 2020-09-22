# vital-signs-mock

## Things that are done:

Generates particles based on background subtracted image from bodypix. Particles are drawn if color is above difference threshold and is not black. Pixel data from client view is packaged and sent to socket server. Server forwards data to broadcast view.

 * **index.js**: Server. Forwards socket data received from client to broadcast view.
 * **views/index.html**: Client view for rendering particles. 
 * **public/js/sketch.js**: generates `Particle` objects based on `camWidth` and `camHeight` upon setup and colors are updated based on data from new frames received from bodypix. `scene` changes are hooked up to key press and emits `packagedData` to server every 10 frames. Data sent are: `drawParticle` (whether particle should be drawn), `r`, `g`, `b` (colors for particle).
 * **public/Particle.js**: `Particle` class. Updates behavior based on what current `scene` is. Color of particle is updated based on boolean value of `this.drawParticle` which is evaluated based on color of previous frame and whether color is black (`rgb(0, 0, 0)`) in current frame.
 * **views/broadcast.html**: View for projection. 
 * **publick/sketch-receive.js**: Receives socket data and parses through to generate particles when connection with new socket id is recieved. When socket is disconnected, deletes particle array.
 * **public/Particle-receive.js**: Draws particles with received values of `drawParticle`, `r`, `g`, `b`.
  
  
## Things to be done:

May need to set up landing page. Need to build a control view / tool to change the scenes and remove scene change functionality from **public/sketch.js**. 

 * **index.js**: Need to check that all socket data are being broadcasted to all instances of broadcast view.
 * **views/index.html**: Need to add WebRTC code for streaming performance
 * **public/js/sketch.js**: Further stylization. Fine tune balance between speed of rendering vs accuracy of visualization.
 * **public/Particle.js**: Fine tune particle behavior.
 * **views/broadcast.html**: Perhaps more styling may be needed for projection. 
 * **publick/sketch-receive.js**: Random placement of recieved array of particles need to be implemented.
 * **public/Particle-receive.js**: If particle behavior is updated in **Particle.js**, it may need to also be implemented here.
