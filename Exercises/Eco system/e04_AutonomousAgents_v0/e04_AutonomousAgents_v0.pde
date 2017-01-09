int lastTime = 0;
PVector target = new PVector();

Boid b;

void setup()
{
  size(800,600);
  b = new Boid(new PVector(random(width), random(height)), color(255,0,0), 15.);
}

void draw()
{
  background(255);
  float dt = millis() - lastTime;
  lastTime = millis();
  
  b.display();
  ellipse(target.x, target.y, 5, 5);
}

void mousePressed()
{
  target = new PVector(mouseX, mouseY);
}