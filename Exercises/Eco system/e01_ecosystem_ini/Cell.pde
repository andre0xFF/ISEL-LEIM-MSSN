class Cell
{
  int w, h;
  int line, col;
  int state;
  ArrayList<Cell> neighbors;
  color[] colors = {192, 64};

  Cell(int line, int col, int w, int h)
  {
    this.line = line;
    this.col = col;
    this.w = w;
    this.h = h;
    this.state = 0;
    this.neighbors = new ArrayList<Cell>();
  }

  void setNeighbor(Cell c)
  {
    neighbors.add(c);
  }

  void setAlive()
  {
    this.state = 1;
  }

  void reset()
  {
    this.state = 0;
  }

  void flipState()
  {
    this.state = this.state == 0 ? 1 : 0;
  }

  void display()
  {
    pushStyle();
    fill(this.colors[this.state]);
    //ellipseMode(CORNER);
    //ellipse(col*w, line*h, w, h);
    rect(this.col * this.w, this.line * this.h, this.w, this.h);
    popStyle();
  }
}
