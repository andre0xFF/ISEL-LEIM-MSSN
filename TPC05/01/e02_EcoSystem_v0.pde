// This code is not of my authority. It was provided to develop the rest of the website
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
