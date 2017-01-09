// Terrain
final float DENSITY = 0.4;
final float[] REGENERATION_TIME = {2., 4.};    // seconds

// Global Population
final float IMMIGRATION_FLOW = 0.1;
final float EMIGRATION_FLOW = 0.;

// Prey Population
final color PREY_COLOR = color(255,255,0);
final int INI_PREY_POPULATION = 150;
final float ENERGY_FROM_PLANT = 20.;
// all rates are per second
final float PREY_DEATH_RATE = 0.0;
final float[] PREY_BIRTH_RATE = {0.001, 0.02};

// Predator Population
final color PREDATOR_COLOR = color(255);
final int INI_PREDATOR_POPULATION = 10;
final float ENERGY_FROM_PREY = 20.;
// all rates are per second
final float PREDATOR_DEATH_RATE = 0.04;
final float[] PREDATOR_BIRTH_RATE = {0.01, 0.2};

World w;

void setup()
{
  size(800,600);
  w = new World(this, 18, 25);
}

void draw()
{
  background(255);
  w.run();
  w.display();
}