// This code is not of my authority.
World w;

void setup()
{
  size(800,600);
  this.w = new World(this, 75, 100);
}

void draw()
{
  background(255);
  this.w.run();
  this.w.display();
}
