class Cell
{
  int w, h;
  int line, col;
  int state;
  int nAlives;
  ArrayList<Cell> neighbors;
  color[] colors = {192, 64};

  Cell(int line, int col, int w, int h)
  {
    this.line = line;
    this.col = col;
    this.w = w;
    this.h = h;
    state = 0;
    nAlives = 0;
    neighbors = new ArrayList<Cell>();
  }
  
  void setNeighbor(Cell c)
  {
    neighbors.add(c);
  }
  
  void setAlive()
  {
    state = 1;
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
  
  void countAlives()
  {
    nAlives = 0;
    for (Cell c : neighbors) nAlives += c.state;
  }

  void applyRule() 
  {
    if ((state == 0) && (nAlives == 3)) {
      state = 1;
    }
    if ((state == 1) && ((nAlives < 2) || (nAlives > 3))) {
      state = 0;
    }
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