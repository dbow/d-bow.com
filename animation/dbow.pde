// Ball pit animation with user-controlled Bludger.
// author: Danny Bowman
//
// Adapted from Bouncy Balls example written by Casey Reas and Ben Fry:
// http://processing.org/learning/topics/bouncybubbles.html

int numBalls = 35;  // The # of balls in the ball pit
int gameBalls = 15; // The # of balls when playing the game
float spring = 0.4;
float gravity = 0.23;
float friction = 0.96;
int bgColor = #1B1B1B;
int[] ballColors = { #0AB3D1, #FFC600, #8265A2, #339966 };
int numColors = ballColors.length;
Ball[] balls = new Ball[numBalls];
boolean bludgerExists = false;
Bludger bludger = new Bludger(mouseX, mouseY, 100, 250);
PFont din;
int jsId = int(random(10000, 50000));
boolean javascriptSent = false;
boolean playingGame = false;
int counter = 0;
int counterResetAlert = 60*24;
int counterResetTime = 60*30;


interface JavaScript {
  void recordHit(int pId);
  void resetGame(int pId);
  void storeId(int pId);
}

void bindJavascript (JavaScript js) {
  javascript = js;
}

JavaScript javascript;

// Creates the canvas, sets parameters, and creates Ball objects
void setup() {
  
  size(800, 350);
  noStroke();
  smooth();
  din = loadFont("DIN-Regular-32.vlw");
  textFont(din, 32);
  for (int i = 0; i < numBalls - 1; i++) {
    balls[i] = new Ball(random(width),
                        random(height),
                        random(30, 40),
                        i,
                        ballColors[int(random(numColors))],
                        balls);
  }
  balls[numBalls - 1] = new targetBall(random(width),
                                       random(height),
                                       55,
                                       numBalls + 1,
                                       #D53817,
                                       balls);

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

  if (playingGame) {
    for (int i = 0; i < gameBalls; i++) {
      balls[i].collide();
      balls[i].move();
      balls[i].display();  
    }
    balls[numBalls-1].collide();
    balls[numBalls-1].move();
    balls[numBalls-1].display();
  } else {
    for (int i = 0; i < numBalls-1; i++) {
      balls[i].collide();
      balls[i].move();
      balls[i].display();  
    }
  }
  
  if (javascript != null && javascriptSent != true) {
    javascript.storeId(jsId);
    javascriptSent = true;
  }
  
  counter += 1;
  if (counter == counterResetAlert) {
    if (javascript != null) {
      javascript.startCountdown();
    }
  }
  if (counter == counterResetTime) {
    counter = 0;
    for (int i = 0; i < numBalls - 1; i++) {
      balls[i].teleport();
    }
  }
  
}

void startGame() {
  playingGame = true;
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
  
  void teleport() {
    x = random(width);
    y = random(height);
  }

}


class targetBall extends Ball {
  
  int lastVal;
  int currHits = 0;
  
  targetBall(float xIn, float yIn, float dIn, int idIn, int hexIn, Ball[] oIn) {
    super(xIn, yIn, dIn, idIn, hexIn, oIn);
  }
  
  void collide() {
    if (bludgerExists) {
      float[] bludgerInfo = bludger.getInfo();
      float[] col = detectCollision(bludgerInfo[0], bludgerInfo[1], bludgerInfo[2]);
      if (col.length > 0 && col.length != lastVal) {
          if (javascript != null) {
            javascript.recordHit(jsId);
          }
          currHits++;
      }
      lastVal = col.length;
    }
    
    for (int i = id + 1; i < numBalls; i++) {
      float[] a = detectCollision(others[i].x, others[i].y, others[i].diameter);
      if (a.length > 0) {
        others[i].vx += a[0];
        others[i].vy += a[1];
      }
    }
  }
  
  void move() {
    super.move();
    if (y > 322 && currHits != 0) {
        if (javascript != null) {
          javascript.resetGame(jsId);
        }
        currHits = 0;
    }
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
    noStroke();
  }
  
  // Allows the Ball object to know the Bludger's location.
  float[] getInfo() {
    float[] info = { xBL, yBL, diameter };
    return info;
  }
  
}
