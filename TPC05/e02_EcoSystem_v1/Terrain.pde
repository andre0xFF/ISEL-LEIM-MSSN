// This code is not of my authority.
class Terrain
{
  int nrows, ncols;
  Cell[][] cells;
  int count_food = 0;

  Terrain(int nrows, int ncols)
  {
    this.nrows = nrows;
    this.ncols = ncols;
    cells = new Cell[nrows][ncols];
    createCells();
    setNeighbors();
  }

  void createCells()
  {
    int minRT = (int)(REGENERATION_TIME[0] * 1000);
    int maxRT = (int)(REGENERATION_TIME[1] * 1000.);
    for (int i = 0; i < nrows; i++) {
      for (int j = 0; j < ncols; j++) {
        int timeToGrow = (int)random(minRT, maxRT);
        cells[i][j] = new Cell(i, j, width/ncols, height/nrows, timeToGrow);
      }
    }
  }

  void setNeighbors()
  {
    for (int i = 0; i < nrows; i++) {
      for (int j = 0; j < ncols; j++) {
        for (int ii=-1; ii<=1; ii++) {
          for (int jj=-1; jj<=1; jj++) {
            if ((ii!=0) || (jj!=0)) {
              int row = (i + ii) % nrows;
              if (row < 0) row += nrows;
              int col = (j + jj) % ncols;
              if (col < 0) col += ncols;
              cells[i][j].setNeighbors(cells[row][col]);
            }
          }
        }
      }
    }
  }

  void initRandom(float p)
  {
    for (int i = 0; i < nrows; i++) {
      for (int j = 0; j < ncols; j++) {
        if (random(1.) < p) cells[i][j].setFertile();
      }
    }
  }

  void regenerate()
  {
    this.count_food = 0;
    
    for (int i = 0; i < nrows; i++) {
      for (int j = 0; j < ncols; j++) {
        cells[i][j].regenerate();

        if (cells[i][j].state == State.FOOD) {
          this.count_food++;
        }
      }
    }
  }

  void setAnimalLists(ArrayList<Animal> animals)
  {
    for (Animal a : animals) {
      Cell c = getCell((int)a.pos.x, (int)a.pos.y);
      c.animals.add(a);
    }
  }

  void clearAnimalLists()
  {
    for (int i = 0; i < nrows; i++) {
      for (int j = 0; j < ncols; j++) {
        cells[i][j].animals.clear();
      }
    }
  }

  Cell getCell(int x, int y)
  {
    int w = width/ncols;
    int h = height/nrows;
    int row = y/h;
    int col = x/w;
    if (row >= nrows) row = nrows - 1;
    if (col >= ncols) col = ncols - 1;

    return cells[row][col];
  }

  void display()
  {
    for (int i = 0; i < nrows; i++) {
      for (int j = 0; j < ncols; j++) {
        cells[i][j].display();
      }
    }
  }
}
