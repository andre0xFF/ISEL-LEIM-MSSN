// This code is not of my authority.
import grafica.*;

class Graph
{
  GPlot plot;
  GPointsArray points;
  color colour;
  float init_tmax, tmax;
  float ymin, ymax;

  Graph(PApplet p, PVector pos, PVector dim, float tmax,
        float ymin, float ymax, String title, String xlabel, String ylabel)
  {
    plot = new GPlot(p);
    points = new GPointsArray();

    setColor(color(random(255), random(255), random(255)));

    this.init_tmax = tmax;
    this.tmax = tmax;
    this.ymin = ymin;
    this.ymax = ymax;
    plot.setPos(pos.x, pos.y);
    plot.setDim(dim.x, dim.y);
    plot.setXLim(0, tmax);
    plot.setYLim(ymin, ymax);
    plot.getTitle().setText(title);
    plot.getXAxis().getAxisLabel().setText(xlabel);
    plot.getYAxis().getAxisLabel().setText(ylabel);
    plot.setVerticalAxesNTicks(2);
  }

  void setColor(color c)
  {
    colour = c;
  }

  void add(float t, float y)
  {
    points.add(t,y);

    if (y > ymax) {
      float aux = ymax;
      ymax += ymax-ymin;
      ymin = aux;
      plot.setYLim(ymin, ymax);
    }

    if (t > tmax)
      {
        float[] xlim = new float[2];
        xlim[0] = tmax;
        xlim[1] = tmax + init_tmax;
        tmax += init_tmax;
        plot.setXLim(xlim);
      }
  }

  void display()
  {
    plot.beginDraw();
    plot.drawBackground();
    plot.drawBox();
    plot.drawXAxis();
    plot.drawYAxis();
    plot.drawTitle();
    plot.setPoints(points);
    plot.setLineColor(colour);
    plot.drawLines();
    plot.endDraw();
  }
}
