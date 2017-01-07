class Grid2D
{
  int nrows, ncols;
  Cell[][] cells;

  Grid2D(int nrows, int ncols)
  {
    this.nrows = nrows;
    this.ncols = ncols;
    cells = new Cell[nrows][ncols];
    createCells();
    setNeighbors();
  }

  void createCells()
  {
    for (int i = 0; i < nrows; i++) {
      for (int j = 0; j < ncols; j++) {
        cells[i][j] = new Cell(i, j, width/ncols, height/nrows);
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
              cells[i][j].setNeighbor(cells[row][col]);
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
        if (random(1.) < p) cells[i][j].setAlive();
      }
    }
  }

  void setBlank()
  {
    for (int i = 0; i < nrows; i++) {
      for (int j = 0; j < ncols; j++) {
        cells[i][j].reset();
      }
    }
  }

  void resetAnimalLists()
  {
    for (int i = 0; i < nrows; i++) {
      for (int j = 0; j < ncols; j++) {
        cells[i][j].resetAnimalList();
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