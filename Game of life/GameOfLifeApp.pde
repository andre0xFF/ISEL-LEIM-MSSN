GameOfLife gol;

boolean paused = false;
boolean stepMode = false;

void setup()
{
  size(800,600);
  frameRate(5);
  gol = new GameOfLife(75,100);
  gol.initRandom(.2);
}

void draw()
{
  background(255);
  if (!paused) {
    gol.run();
    if (stepMode) paused = true;
  }
  gol.display();
}

void mousePressed()
{
  gol.getCell(mouseX,mouseY).flipState();
}

void keyPressed()
{
  if (key == 'B' || key == 'b'){
    gol.setBlank();
    paused = true;
    println("PAUSED");
  }
  if (key == 'P' || key == 'p'){
    paused = !paused;
    if (paused) println("PAUSED");
  } 
  if (key == 'S' || key == 's'){
    stepMode = !stepMode;
    if (stepMode) println("STEP MODE");
  }
}