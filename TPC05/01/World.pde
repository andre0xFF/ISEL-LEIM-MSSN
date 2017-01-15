// This code is not of my authority. It was provided to develop the rest of the website
class World
{
  PApplet p;
  Grid2D terrain;
  Graph graph;
  ArrayList<Animal> animals;
  int lastTime;
  int updateTime = 150;
  int iniPopulation = 50;
  float immigrationFlow = 7.00;   // per second
  float emigrationFlow = 8.00;    // per second
  int emigrated = 0;
  int immigrated = 0;
  int born = 0;
  int died = 0;
  float elapsed_time = 0;
  float average_death_rate = 0;

  World(PApplet p, int nrows, int ncols)
  {
    graph = new Graph(p, new PVector(500, 0), new PVector(200, 100), 150., 0, 3000,
      "Population", "time", "Population");
    graph.setColor(color(0));
    terrain = new Grid2D(nrows, ncols);
    animals = new ArrayList<Animal>();
    lastTime = millis();

    for (int i=0; i<iniPopulation; i++) {
      Animal a = new Animal(new PVector(random(width), random(height)), color(255, 0, 0), 15);
      a.vel = new PVector(50, 0);
      animals.add(a);
    }
  }

  void run()
  {
    if (millis() > lastTime + updateTime) {
      float dt = (millis() - lastTime)/1000.;
      lastTime = millis();
      graph.add(millis()/1000., animals.size());
      update(dt);

      this.elapsed_time += dt;

      if (this.elapsed_time >= 30) {
        this.elapsed_time = 0;
        println(
          ((int)millis()/1000.) +
          ",0.07" + "," +
          this.emigrationFlow + "," +
          this.average_death_rate + "," +
          immigrationFlow + "," +
          this.born + "," +
          this.emigrated + "," +
          this.died + "," +
          this.immigrated + "," +
          animals.size()
          );

          this.born = 0;
          this.emigrated = 0;
          this.died = 0;
          this.immigrated = 0;
      }
    }


  }

  void update(float dt)
  {
    immigration(dt);
    emigration(dt);
    reproduce(dt);
    die(dt);
    move(dt);
    updateDeathRate(terrain);
  }

  void move(float dt)
  {
    for (Animal a : animals) a.move(dt);
  }

  void updateDeathRate(Grid2D terrain)
  {
    for (Animal a : animals) {
      Cell c = terrain.getCell((int) a.pos.x, (int) a.pos.y);
      c.addAnimal(a);
      this.average_death_rate += a.deathRate;
    }

    this.average_death_rate /= this.animals.size();

    for (Animal a : animals) {
      Cell c = terrain.getCell((int) a.pos.x, (int) a.pos.y);
      int num = c.animals.size();
      float val = a.minDeathRate;
      if (num > 1) val = a.maxDeathRate;
      a.deathRate = 0.8*a.deathRate + 0.2*val;
    }
    terrain.resetAnimalLists();
  }

  void die(float dt)
  {
    for (int i=animals.size()-1; i>=0; i--) {
      Animal a = animals.get(i);
      if (a.die(dt)) {
        animals.remove(i);
        this.died++;
      }
    }
  }

  void reproduce(float dt)
  {
    int listSize = animals.size();
    for (int i=0; i<listSize; i++) {
      Animal a = animals.get(i);
      Animal child = a.reproduce(dt);
      if (child != null) {
        child.vel = new PVector(random(-10, 10), random(-10, 10));
        animals.add(child);
        this.born++;
      }
    }
  }

  void emigration(float dt)
  {
    int listSize = animals.size();
    if (listSize == 0) return;

    int n = (int) (emigrationFlow*dt);
    float f = emigrationFlow*dt - n;

    for (int i=0; i<n; i++) {
      int rnd = (int)random(listSize--);
      animals.remove(rnd);
      this.emigrated++;
    }

    if ((listSize > 0) && (random(1) < f))
    {
      int rnd = (int)random(listSize);
      animals.remove(rnd);
      this.emigrated++;
    }
  }

  void immigration(float dt)
  {
    int n = (int) (immigrationFlow*dt);
    float f = immigrationFlow*dt - n;

    for(int i=0;i<n;i++) {
      Animal a = new Animal(new PVector(0, random(height)), color(100, 255, 0), 15);
      a.vel = new PVector(20, 0);
      animals.add(a);
      this.immigrated++;
    }

    if (random(1) < f)
    {
      Animal a = new Animal(new PVector(0, random(height)), color(100, 255, 0), 15);
      a.vel = new PVector(20, 0);
      animals.add(a);
      this.immigrated++;
    }
  }

  void display()
  {
    // terrain.display();
    // for (Animal a : animals) a.display();
    graph.display();
  }
}
