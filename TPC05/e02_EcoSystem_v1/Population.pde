// This code is not of my authority.
class Population
{
  ArrayList<Animal> animals;
  int numberOfPreys = 0;
  int numberOfPredators = 0;

  Population()
  {
    animals = new ArrayList<Animal>();
    for (int i=0; i<INI_PREY_POPULATION; i++) {
      Prey p = new Prey(new PVector(random(width), random(height)), PREY_COLOR, 15);
      p.vel = new PVector(random(20,60), 0);
      p.energy = 40.;
      animals.add(p);
    }
    for (int i=0; i<INI_PREDATOR_POPULATION; i++) {
      Predator p = new Predator(new PVector(random(width), random(height)), PREDATOR_COLOR, 15);
      p.vel = new PVector(random(20,60), 0);
      p.energy = 40.;
      animals.add(p);
    }
  }

  void update(float dt, Terrain terrain)
  {
    countAnimals();
    immigration(dt);
    emigration(dt);
    reproduce(dt);
    die(dt);
    move(dt);
    terrain.setAnimalLists(animals);
    eat(terrain, animals);
    terrain.clearAnimalLists();
  }

  void move(float dt)
  {
    for (Animal a : animals) a.move(dt);
  }

  void eat(Terrain terrain, ArrayList<Animal> animals)
  {
    for (int i=animals.size()-1;i>=0;i--) {
      Animal a = animals.get(i);
      a.eat(terrain, animals);
    }
  }

  void die(float dt)
  {
    for (int i=animals.size()-1; i>=0; i--) {
      Animal a = animals.get(i);
      if (a.die(dt)) animals.remove(i);
    }
  }

  void reproduce(float dt)
  {
    int listSize = animals.size();
    for (int i=0; i<listSize; i++) {
      Animal a = animals.get(i);
      Animal child = a.reproduce(dt);
      if (child != null) {
        child.vel = new PVector(random(-20, 20), random(-20, 20));
        animals.add(child);
      }
    }
  }

  void emigration(float dt)
  {
    int listSize = animals.size();
    if (listSize == 0) return;

    int n = (int) (EMIGRATION_FLOW*dt);
    float f = EMIGRATION_FLOW*dt - n;

    for (int i=0; i<n; i++) {
      int rnd = (int)random(listSize--);
      animals.remove(rnd);
    }

    if ((listSize > 0) && (random(1) < f))
    {
      int rnd = (int)random(listSize);
      animals.remove(rnd);
    }
  }

  void immigration(float dt)
  {
    int n = (int) (IMMIGRATION_FLOW*dt);
    float f = IMMIGRATION_FLOW*dt-n;

    for (int i=0; i<n; i++) {
      Animal a = getRandomBreed(0.5);
      animals.add(a);
    }

    if (random(1) < f)
    {
      Animal a = getRandomBreed(0.5);
      animals.add(a);
    }
  }

  Animal getRandomBreed(float p)
  {
    Animal a;
    if (random(1) < p) a = new Prey(new PVector(0, random(height)), color(255, 255, 0), 15);
    else a = new Predator(new PVector(0, random(height)), color(255, 255, 255), 15);
    a.vel = new PVector(20, 0);
    a.energy = 40;
    return a;
  }

  void countAnimals()
  {
    numberOfPreys = 0;
    numberOfPredators = 0;
    for (Animal a : animals) {
      if (a.type == "Prey") numberOfPreys++;
      else numberOfPredators++;
    }
  }

  void display()
  {
    for (Animal a : animals) a.display();
  }
}
