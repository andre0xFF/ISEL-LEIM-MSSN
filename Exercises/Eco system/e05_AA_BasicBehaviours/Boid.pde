class Boid extends Mover
{
  PShape shape;
  float maxSpeed = 50.;
  float maxForce = 200.;
  float theta = random(2*PI);
  
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
  
  void applyForce(PVector f)
  {
    f.limit(maxForce);
    super.applyForce(f);
  }
  
  PVector seek(PVector target)
  {
    PVector vd = PVector.sub(target, pos);
    vd.normalize().mult(maxSpeed);
    return PVector.sub(vd, vel);
  }
  
  PVector flee(PVector target)
  {
    PVector f = seek(target);
    return f.mult(-1);
  }
  
  PVector arrive(PVector target)
  {
    float R = 50.;
    PVector r = PVector.sub(target, pos);
    float d = r.mag();
    float speed = maxSpeed;
    if (d < R) speed *= pow((d/R),2.);
    PVector vd = r.normalize().mult(speed);
    return PVector.sub(vd,vel);
  }
  
  PVector pursuit(Boid b)
  {
    float deltaT = 0.8;
    PVector t = PVector.add(b.pos, PVector.mult(b.vel,deltaT));
    return seek(t);
  }
  
  PVector wander()
  {
    float deltaT = .4;
    float R = 100.;
    PVector c = PVector.add(pos, PVector.mult(vel,deltaT));
    theta += random(-PI/10,PI/10);
    PVector t = PVector.add(c, new PVector(R*cos(theta),R*sin(theta)));
    return seek(t);
  }
  
  PVector evade(Boid b)
  {
    PVector f = pursuit(b);
    return f.mult(-1);
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