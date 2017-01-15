// This code is not of my authority. It was provided to develop the rest of the website
class Animal
{
  PVector pos, vel;
  PShape shape;
  color c;
  float radius;
  int birth;
  float birthRate = 0.07;     // per second
  float deathRate;            // per second
  float minDeathRate = 0.01;  // per second
  float maxDeathRate = 0.2;   // per second

  Animal(PVector pos, color c, float radius)
  {
    this.pos = pos.copy();
    this.c = c;
    this.radius = radius;
    vel = new PVector();
    shape = setShape();
    birth = millis();
    deathRate = minDeathRate;
  }

  PShape setShape()
  {
    PShape s = createShape();
    s.beginShape();
    s.fill(c);
    s.noStroke();
    s.vertex(-radius, radius/2);
    s.vertex(radius, 0);
    s.vertex(-radius, -radius/2);
    s.vertex(-radius/2,0);
    s.endShape(CLOSE);
    return s;
  }

  boolean die(float dt)
  {
    if (random(1) < deathRate*dt) return true;
    return false;
  }

  Animal reproduce(float dt)
  {
    Animal child = null;
    float r = random(1);
    if(r < birthRate*dt) {
      child = this.copy();
    }
    return child;
  }

  Animal copy()
  {
    Animal a = new Animal(this.pos, this.c, this.radius);
    a.deathRate = this.deathRate;
    a.birthRate = this.birthRate;
    return a;
  }

  void move(float dt)
  {
    pos.add(PVector.mult(vel, dt)); //<>//
    if (pos.x < 0) pos.x += width;
    if (pos.x > width) pos.x -= width;
    if (pos.y < 0) pos.y += height;
    if (pos.y > height) pos.y -= height;
  }

  void display()
  {
    pushMatrix();
    translate(pos.x, pos.y);
    rotate(vel.heading());
    shape(shape);
    popMatrix();
  }
}
