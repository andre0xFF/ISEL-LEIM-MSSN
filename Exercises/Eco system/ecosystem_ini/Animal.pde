class Animal
{
  PVector pos, vel;
  PShape shape;
  color c;
  float radius;
  int birth;

  Animal(PVector pos, color c, float radius)
  {
    this.pos = pos.copy();
    this.c = c;
    this.radius = radius;
    vel = new PVector();
    shape = setShape();
    birth = millis();
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
  
  void move(float dt)
  {
    pos.add(PVector.mult(vel, dt));
    if (pos.x < 0) pos.x = pos.x += width;
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