// This code is not of my authority.
enum State {DESERT, FERTILE, FOOD}

class Cell
{
  int line, col;
  int w, h;
  State state;
  ArrayList<Cell> neighbors;
  color[] colors = {192, 64, color(0,255,0)};
  int eatenTime;
  int timeToGrow;
  ArrayList<Animal> animals;

  Cell(int line, int col, int w, int h, int timeToGrow)
  {
    this.line = line;
    this.col = col;
    this.w = w;
    this.h = h;
    this.timeToGrow = timeToGrow;
    state = State.DESERT;
    neighbors = new ArrayList<Cell>();
    animals = new ArrayList<Animal>();
  }

  void setNeighbors(Cell c)
  {
    neighbors.add(c);
  }

  void setFertile()
  {
    state = State.FERTILE;
    eatenTime = millis();
  }

  void regenerate()
  {
    if ((state == State.FERTILE) && (millis() > eatenTime + timeToGrow)) {
      state = State.FOOD;
    }
  }

  void display()
  {
    pushStyle();
    fill(colors[state.ordinal()]);
    rect(col*w, line*h, w, h);
    popStyle();
  }
}
