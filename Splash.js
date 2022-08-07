class Splash
{
  live;
  position;
  radius;
  speed;
  expansion;
  opacity;
  splash_color;

  constructor(pos,splashCol)
  {
    this.live=true;
    this.position=pos;
    this.radius=0;
    this.speed=1;
    this.expansion=10;
    this.opacity=255;
    this.splash_color=splashCol;
  }
 
  update()
  {
    if(this.radius<this.expansion)
    {
      this.radius+=this.speed;
      this.opacity=255.0-((255.0/this.expansion)*this.radius);
    }
    else
    this.live=false;
  }
  
  draw()
  {
    noStroke();
    fill(color(this.splash_color._getRed(),this.splash_color._getGreen(),this.splash_color._getBlue(),this.opacity));
    circle(this.position.x,height,this.radius);
  }
}
