class Cell
{
  int line, col;
  int w, h;
  int state;
  ArrayList<Cell> neighbors;
  color[] colors = {192, 64, color(0,255,0)};

  Cell(int line, int col, int w, int h)
  {
    this.line = line;
    this.col = col;
    this.w = w;
    this.h = h;
    state = 0;
    neighbors = new ArrayList<Cell>();
  }
  
  void setNeighbors(Cell c)
  {
    neighbors.add(c);
  }
    
  void display()
  {
    pushStyle();
    fill(colors[state]);   
    rect(col*w, line*h, w, h);
    popStyle();
  }
}