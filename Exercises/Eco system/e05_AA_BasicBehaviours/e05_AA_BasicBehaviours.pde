int lastTime = 0;
PVector target = new PVector();

Boid b1, b2, b3;

void setup()
{
  size(800,600);
  b1 = new Boid(new PVector(random(width), random(height)), color(255,0,0), 15.);
  b2 = new Boid(new PVector(random(width), random(height)), color(0,255,0), 15.);
  b3 = new Boid(new PVector(random(width), random(height)), color(0,0,255), 15.);
}

void draw()
{
  background(255);
  float dt = millis() - lastTime;
  lastTime = millis();

  PVector f = b1.seek(target);
  b1.applyForce(f);
  
  f = b2.pursuit(b1);
  b2.applyForce(f);
  
  f = b3.wander();
  b3.applyForce(f);
  
  b1.move(dt/1000.);
  b2.move(dt/1000.);
  b3.move(dt/1000.);
  
  b1.display();
  b2.display();
  b3.display();
  ellipse(target.x, target.y, 5, 5);
}

void mousePressed()
{
  target = new PVector(mouseX, mouseY);
}