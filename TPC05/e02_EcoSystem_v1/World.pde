// This code is not of my authority.
class World
{
  PApplet p;
  Terrain terrain;
  Population population;
  Graph graph;

  int lastTime;
  int updateTime = 150;
  float elapsed_time = 0;

  World(PApplet p, int nrows, int ncols)
  {
    graph = new Graph(2, p, new PVector(500, 0), new PVector(200, 100), 150., 0, 80,
      "Population", "time", "Population");
    graph.setColor(0, color(0));
    graph.setColor(1, color(255,0,0));

    terrain = new Terrain(nrows, ncols);
    terrain.initRandom(DENSITY);

    population = new Population();
    lastTime = millis();
  }

  void run()
  {
    if (millis() > lastTime + updateTime) {
      float dt = (millis() - lastTime)/1000.;
      lastTime = millis();
      graph.add(0, millis()/1000., population.numberOfPreys);
      graph.add(1, millis()/1000., population.numberOfPredators);
      update(dt);

      this.elapsed_time += dt;
      if (this.elapsed_time >= 8) {
        this.elapsed_time = 0;
        println(millis()/1000. + "," + population.numberOfPreys + "," + population.numberOfPredators + "," + this.terrain.count_food);
      }
    }
  }

  void update(float dt)
  {
    terrain.regenerate();
    population.update(dt, terrain);
  }

  void display()
  {
    terrain.display();
    population.display();
    graph.display();
  }
}
