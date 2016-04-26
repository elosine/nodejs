

// Keep track of our socket connection
var socket;

var x, y, w, h, l, r, t, b, c, m, ra;
var dx2, dy2;
var ang = 30.0;

function setup() {
  createCanvas(500, 500);
  background(0);
  
   x=0.0;
  y=0.0;
  w=width-40;
  h=w;
  l=x;
  r=x+w;
  t=y;
  b=y+h;
  c=l+(w/2.0);
  m=t+(h/2.0);
  ra=w/2.0;
  ang = ang-90.0;
  
  
  
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://localhost:8080');
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('mouse',
    // When we receive data
    function(data) {
      console.log("Got: " + data.x + " " + data.y);
      // Draw a blue circle
     // fill(0,0,255);
     // noStroke();
     // ellipse(data.x,data.y,80,80);
    }
  );
}

function draw() {
background(0);
  dx2 = (cos(radians(ang))*ra)+c;
  dy2 = (sin(radians(ang))*ra)+m;
  strokeWeight(2);
  stroke(255, 128, 0);
  line(c, m, dx2, dy2);
  stroke(153,255,0);
  ang = (ang+1)%360;
  sendmouse(dx2,dy2);
}

function mouseDragged() {
  // Draw some white circles
  fill(255);
  noStroke();
  ellipse(mouseX,mouseY,80,80);
  // Send the mouse coordinates
  sendmouse(mouseX,mouseY);
}

// Function for sending to the socket
function sendmouse(xpos, ypos) {
  // We are sending!
  console.log("sendmouse: " + xpos + " " + ypos);
  
  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos
  };

  // Send that object to the socket
  socket.emit('mouse',data);
}