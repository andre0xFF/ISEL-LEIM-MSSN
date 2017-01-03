# Game of life rules:

1. Death: If a cell is alive (state = 1) it will die (state = 0)
   - Overpopulation: If the cell has four or more alive neighbors, it dies
   - Loneliness: If the cell has one or fewer alive neighbors, it dies

2. Birth: If a cell is dead it will come to life if it has exacly three alive neighbors

3. Statis: In all other cases, the cell state does not change
   - Staying alive: If a cell has exacly two or three live neighbors, it stays alive
   - Staying dead: If a cell is dead and has anything other than three live neighbors, it stays dead

## Examples:
![CA death and birth examples](http://natureofcode.com/book/imgs/chapter07/ch07_23.png)
## Static patterns:
![Game of life static patterns](http://natureofcode.com/book/imgs/chapter07/ch07_24.png)
## Oscillating patterns:
![Blinker](https://upload.wikimedia.org/wikipedia/commons/9/95/Game_of_life_blinker.gif)
![Toad](https://upload.wikimedia.org/wikipedia/commons/1/12/Game_of_life_toad.gif)
![Beacon](https://upload.wikimedia.org/wikipedia/commons/1/1c/Game_of_life_beacon.gif)
![Pulsar](https://upload.wikimedia.org/wikipedia/commons/0/07/Game_of_life_pulsar.gif)
![Pentadecathlon](https://upload.wikimedia.org/wikipedia/commons/f/fb/I-Column.gif)
## Moving patterns:
![Game of life static patterns](http://natureofcode.com/book/imgs/chapter07/ch07_26.png)
