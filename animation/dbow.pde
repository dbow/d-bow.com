// Ball pit animation with user-controlled Bludger.
// author: Danny Bowman
//
// Adapted from Bouncy Balls example written by Casey Reas and Ben Fry:
// http://processing.org/learning/topics/bouncybubbles.html

int numBalls = 40;  // The # of balls in the ball pit
float spring = 0.4;
float gravity = 0.23;
float friction = 0.96;
int bgColor = #1B1B1B;
int[] ballColors = { #0AB3D1, #FFC600, #D53817, #8265A2, #339966 };
int[] bludgerColors = { #A7D267, #9A9A9A, #FF6699 };
int numColors = ballColors.length;
int prevFillNum;
Ball[] balls = new Ball[numBalls];
boolean bludgerExists = false;
Bludger bludger = new Bludger(mouseX, mouseY, 100, 255);
PFont din;

// Creates the canvas, sets parameters, and creates Ball objects
void setup() {
  
  size(800, 350);
  noStroke();
  smooth();
  din = loadFont("DIN-Regular-32.vlw");
  textFont(din, 32);
  for (int i = 0; i < numBalls; i++) {
    balls[i] = new Ball(random(width),
                        random(height),
                        random(30, 40),
                        i,
                        ballColors[int(random(numColors))],
                        balls);
  }

}

// Checks for collisions, moves all Balls and the Bludger and redraws
void draw() {
  
  background(bgColor);
  
  // The bludger is not drawn until the user moves their mouse over the canvas. 
  if (bludgerExists) {
    bludger.update();
  } else if (mouseX > 0) {
    bludgerExists = true;
  }

  for (int i = 0; i < numBalls; i++) {
    balls[i].collide();
    balls[i].move();
    balls[i].display();  
  }
  
}

// If user clicks, the Bludger's color is updated
void mouseClicked() {
  int fillNum = int(random(bludgerColors.length));
  while(fillNum == prevFillNum) {  // Ensures the color always changes
    fillNum = int(random(bludgerColors.length));
  }
  bludger.updateColor(bludgerColors[fillNum]);
  prevFillNum = fillNum;
}

// A ball in the ball pit
class Ball {
  float x, y;
  float diameter;
  int fillHex;
  float vx = 0;
  float vy = 0;
  int id;
  Ball[] others;
 
  Ball(float xIn, float yIn, float dIn, int idIn, int hexIn, Ball[] oIn) {
    x = xIn;
    y = yIn;
    diameter = dIn;
    fillHex = hexIn;
    id = idIn;
    others = oIn;
  }
  
  // Checks for a collision between two balls and,
  // if there is one, returns the new x and y coordinates.
  float[] detectCollision(float xD, float yD, float dD) {
      
      float[] results = new float[2];
      float dx = xD - x;
      float dy = yD - y;
      float distance = sqrt(dx*dx + dy*dy);
      float minDist = dD/2 + diameter/2;
      if (distance < minDist) {
        float angle = atan2(dy, dx);
        float targetX = x + cos(angle) * minDist;
        float targetY = y + sin(angle) * minDist;
        float ax = (targetX - xD) * spring * friction;
        float ay = (targetY - yD) * spring * friction;
        vx -= ax;
        vy -= ay;
        results[0] = ax;
        results[1] = ay;
      } else {
        results = new float[0];
      }
      return results;
  }
  
  // Checks if the bludger has collided with any balls and then checks
  // if any of the balls have collided with each other.
  // If so, each collided ball's target x and y coordinates are updated.
  void collide() {
    if (bludgerExists) {
      float[] bludgerInfo = bludger.getInfo();
      detectCollision(bludgerInfo[0], bludgerInfo[1], bludgerInfo[2]);
    }
    
    for (int i = id + 1; i < numBalls; i++) {
      float[] a = detectCollision(others[i].x, others[i].y, others[i].diameter);
      if (a.length > 0) {
        others[i].vx += a[0];
        others[i].vy += a[1];
      }
    }   
  }
  
  // Updates the ball's x and y coordinates, accounting for
  // collisions, gravity, and friction.
  void move() {
    vy += gravity;
    x += vx;
    y += vy;
    boolean applyFriction = false;
    if (x + diameter/2 > width) {
      x = width - diameter/2;
      vx *= -0.9;
      applyFriction = true;
    }
    else if (x - diameter/2 < 0) {
      x = diameter/2;
      vx *= -0.9;
      applyFriction = true;
    }
    if (y + diameter/2 > height) {
      y = height - diameter/2;
      vy *= -0.9;
      applyFriction = true;
    } 
    else if (y - diameter/2 < 0) {
      y = diameter/2;
      vy *= -0.9;
      applyFriction = true;
    }
    if (applyFriction) {
      vx *= friction;
      vy *= friction;
    }
  }
  
  // Draws the Ball with the current x, y, fillHex, and diameter values.
  void display() {
    fill(fillHex);
    ellipse(x, y, diameter, diameter);
  }
}


// The user-controlled large ball in the canvas.
class Bludger {
  float xBL, yBL;
  float diameter;
  int fillHex;
  
  Bludger(float xin, float yin, float din, int fillhexin) {
    xBL = xin;
    yBL = yin;
    diameter = din;
    fillHex = fillhexin;
  }
  
  // Moves the bludger to the current mouse location,
  // checking for collisions with the outer walls. 
  void update() {
    fill(fillHex);
    xBL = mouseX;
    yBL = mouseY;
    
    if (xBL + diameter / 2 > width) {
      xBL = width - diameter/2;
    }
    else if (xBL - diameter/2 < 0) {
      xBL = diameter/2;
    }
    if (yBL + diameter/2 > height) {
      yBL = height - diameter/2;
    } 
    else if (yBL - diameter/2 < 0) {
      yBL = diameter/2;
    }
    ellipse(xBL, yBL, diameter, diameter);
    if (fillHex == 255) {
      fill(#1B1B1B);
    } else {
      fill(255);
    }
    text("Hello!", xBL-42, yBL+10, 3);
    noStroke();
  }
  
  // Allows the Ball object to know the Bludger's location.
  float[] getInfo() {
    float[] info = { xBL, yBL, diameter };
    return info;
  }
  
  // Changes the Bludger's color to the provided value.
  void updateColor(int updateFillHex) {
    fillHex = updateFillHex;
  }
}
