//By Fraiolefano

import processing.sound.*;
final int N_DROPS=900;
final int WINDOW_SIZE=600;
final float METRIC_UNIT=WINDOW_SIZE/10;   //la finestra rappresenterà uno spazio di 100m^2
// 1 m = metric_unit px,wind = 36km/h = 10m/s =10*metric_unit px/s
final float G=9.8*METRIC_UNIT; 
Wind wind;
Drop[] drops=new Drop[N_DROPS];
ArrayList<Splash> splashes=new ArrayList<Splash>();
SoundFile rainSound;

void settings()
{
  size(WINDOW_SIZE,WINDOW_SIZE);
}

void setup()
{
  pixelDensity(1);
  
  wind=new Wind();
  wind.setup();
  
  for(int c=0;c<N_DROPS;c++)
  {
    drops[c]=new Drop();
  }
  
  rainSound=new SoundFile(this,"rain.wav");
  rainSound.play();
  rainSound.loop();
}

void draw()
{
  background(0);
  wind.update();
  for(int c=0;c<N_DROPS;c++)
  {
    drops[c].update();
    drops[c].draw();
  }
  
  for (int c=splashes.size()-1;c>0;c--)
  {
      Splash current_splash=splashes.get(c);
      if(current_splash.live)
      {
        current_splash.update();
        current_splash.draw();
      }
      else
        splashes.remove(c);
  }
  wind.draw();
}
