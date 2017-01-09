class Prey extends Animal
{
  Prey(PVector pos, color c, float radius)
  {
    super(pos, c, radius);
    birthRate = PREY_BIRTH_RATE[0];
    deathRate = PREY_DEATH_RATE;
    type = "Prey";
  }

  Prey reproduce(float dt)
  {
    Prey child = null;
    if (random(1) < birthRate(PREY_BIRTH_RATE[0], PREY_BIRTH_RATE[1], 0.1)*dt) {
      energy /= 2.;
      child = new Prey(pos, c, radius);
      child.deathRate = deathRate;
      child.birthRate = birthRate;
      child.energy = energy;
    }
    return child;
  }
  
  void eat(Terrain terrain, ArrayList<Animal> animals)
  {
    Cell c = terrain.getCell((int)pos.x, (int)pos.y);
    if (c.state == State.FOOD) {
      energy += ENERGY_FROM_PLANT;
      c.setFertile();
    }
  }
}