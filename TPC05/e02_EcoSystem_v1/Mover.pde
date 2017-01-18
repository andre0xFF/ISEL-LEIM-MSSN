// This code is not of my authority.
class Mover
{
  PVector pos, vel, acc;
  color c;
  float radius;
  float mass;

  Mover(PVector pos, color c, float radius, float mass)
  {
    this.pos = pos.copy();
    this.c = c;
    this.radius = radius;
    this.mass = mass;
    vel = new PVector();
    acc = new PVector();
  }

  void applyForce(PVector force)
  {
    acc.add(PVector.div(force, mass));
  }

  void move(float dt)
  {
    vel.add(acc.mult(dt));
    pos.add(PVector.mult(vel,dt));
    acc.mult(0);
    toroidalWorld();
  }

  void toroidalWorld()
  {
    if (pos.x < 0) pos.x = pos.x += width;
    if (pos.x > width) pos.x -= width;
    if (pos.y < 0) pos.y += height;
    if (pos.y > height) pos.y -= height;
  }

  void boxWorld()
  {
    if (pos.x < 0) {pos.x = -pos.x; vel.x *= -1;}
    if (pos.x > width) {pos.x = 2*width-pos.x; vel.x *= -1;}
    if (pos.y < 0) {pos.y = -pos.y; vel.y *= -1;}
    if (pos.y > height) {pos.y = 2*height-pos.y; vel.y *= -1;}
  }

  void display()
  {
    pushStyle();
    fill(c);
    ellipse(pos.x, pos.y, 2*radius, 2*radius);
    popStyle();
  }
}
