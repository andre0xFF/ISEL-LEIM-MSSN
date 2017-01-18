// This code is not of my authority.
class Animal extends Mover
{
  PShape shape;
  int birth;
  float deathRate, birthRate;
  float energy = 0.;
  String type = "";

  Animal(PVector pos, color c, float radius)
  {
    super(pos, c, radius, 1.);
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
    s.vertex(-radius/2, 0);
    s.endShape(CLOSE);
    return s;
  }

  boolean die(float dt)
  {
    if (random(1) < deathRate*dt) return true;
    return false;
  }

  void move(float dt)
  {
    pos.add(PVector.mult(vel, dt));
    energy -= dt;
    boxWorld();
  }

  float birthRate(float min, float max, float r)
  {
    return (max*min/(min+(max-min)*exp(-r*energy)));
  }

  Animal reproduce(float dt)
  {
    return null;
  }

  void eat(Terrain terrain, ArrayList<Animal> animals)
  {
  }

  void display()
  {
    pushMatrix();
    translate(pos.x, pos.y);
    rotate(vel.heading());
    shape(shape);
    //textSize(24);
    //text(nf(energy, 2, 1), 0, 0);
    popMatrix();
  }
}
