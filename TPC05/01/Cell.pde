// This code is not of my authority. It was provided to develop the rest of the website
class Cell
{
  int line, col;
  int w, h;
  int state;
  ArrayList<Cell> neighbors;
  color[] colors = {192, 64};
  ArrayList<Animal> animals;

  Cell(int line, int col, int w, int h)
  {
    this.line = line;
    this.col = col;
    this.w = w;
    this.h = h;
    state = 0;
    neighbors = new ArrayList<Cell>();
    animals = new ArrayList<Animal>();
  }

  void setNeighbor(Cell c)
  {
    neighbors.add(c);
  }

  void setAlive()
  {
    state = 1;
  }

  void addAnimal(Animal a)
  {
    animals.add(a);
  }

  void resetAnimalList()
  {
    animals.clear();
  }

  void reset()
  {
    state = 0;
  }

  void flipState()
  {
    if (state == 0) state = 1;
    else state = 0;
  }

  void display()
  {
    pushStyle();
    fill(colors[state]);
    //ellipseMode(CORNER);
    //ellipse(col*w, line*h, w, h);
    rect(col*w, line*h, w, h);
    popStyle();
  }
}
