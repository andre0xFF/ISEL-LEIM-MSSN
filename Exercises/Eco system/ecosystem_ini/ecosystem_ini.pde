World w;

void setup()
{
  size(800,600);
  w = new World(this, 75, 100);
}

void draw()
{
  background(255);
  w.run();
  w.display();
}