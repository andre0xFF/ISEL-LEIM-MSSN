class Boid extends Mover
{
  PShape shape;
  float maxSpeed = 200.;
  float maxForce = 5000.;
  
  Boid(PVector pos, color c, float radius)
  {
    super(pos, c, radius, 1.);
    shape = setShape();
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
    s.vertex(-radius/2, 0);
    s.endShape(CLOSE);
    return s;
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