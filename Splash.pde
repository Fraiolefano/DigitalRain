class Splash
{
  boolean live;
  PVector position;
  float radius;
  float speed;
  float expansion;
  float opacity;
  color splash_color;

  Splash(PVector pos,color splashCol)
  {
    live=true;
    position=pos;
    radius=0;
    speed=1;
    expansion=10;
    opacity=255;
    splash_color=splashCol;
  }
 
  void update()
  {
    if(radius<expansion)
    {
      radius+=speed;
      opacity=255.0-((255.0/expansion)*radius);
    }
    else
      live=false;
  }
  
  void draw()
  {
    noStroke();
    fill(splash_color,opacity);
    circle(position.x,height,radius);
  }
}
