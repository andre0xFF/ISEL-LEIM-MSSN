class Predator extends Animal
{
  Predator(PVector pos, color c, float radius)
  {
    super(pos, c, radius);
    birthRate = PREDATOR_BIRTH_RATE[0];
    deathRate = PREDATOR_DEATH_RATE;
    type = "Predator";
  }

  Predator reproduce(float dt)
  {
    Predator child = null;
    if (random(1) < birthRate(PREDATOR_BIRTH_RATE[0], PREDATOR_BIRTH_RATE[1], 0.1)*dt) {
      energy /= 2.;
      child = new Predator(pos, c, radius);
      child.deathRate = deathRate;
      child.birthRate = birthRate;
      child.energy = energy;
    }
    return child;
  }

  void eat(Terrain terrain, ArrayList<Animal> animals)
  {
    Cell c = terrain.getCell((int)pos.x, (int)pos.y);
    for (int i=c.animals.size()-1;i>=0;i--) {
      Animal a = c.animals.get(i);
      if (a.type == "Prey") {
        c.animals.remove(a);
        animals.remove(a);
        energy += ENERGY_FROM_PREY;
        break;
      }
    }
  }
}