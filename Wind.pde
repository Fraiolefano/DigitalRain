class Wind
{
  PVector wind;
  float intensity;
  float max_wind;
  float wind_step;
  PVector center=new PVector(50,50);// o (width/2,height/2) se si preferisce controllarlo dal centro della finestra
  SoundFile windSound;
  float amplitude;

  Wind()
  {
    wind=new PVector(0,0);
    intensity=0;
    max_wind=METRIC_UNIT*10;
    wind_step=max_wind/50;
    
    amplitude=0;
  }
  
  void setup()
  {
    windSound=new SoundFile(rain.this,"wind.wav");
  }
  
  void update()
  {
    wind.x=mouseX;
    wind.y=mouseY;
    wind.sub(center);//creo un vettore che dal cursore punta al centro stabilito
    wind.normalize();//normalizzo il vettore rendendolo un versore
    
    if(intensity>0)
    {
      if(!windSound.isPlaying())
      {
        windSound.play();
      }
      amplitude=(1.0/max_wind)*intensity;
      windSound.amp(amplitude);
    }
    else
    {
      windSound.stop();
    }
  }
  
  void draw()
  {
    strokeWeight(3);
    stroke(255,255,0);
    line(50,50,50+wind.x*(50/max_wind)*intensity,50+wind.y*(50/max_wind)*intensity);
    
    strokeWeight(5);
    point(50,50);
    
    if(intensity>0)
    {
      fill(255,255,0);
      textSize(13);
      text(nf(((intensity/METRIC_UNIT)*3.6),0,1) +" km/h",50,25);
    }
  }
}

void mouseWheel(MouseEvent e)
{
  if (e.getCount()>0)//su
  {
    if(wind.intensity>=wind.wind_step)
       wind.intensity-=wind.wind_step;
    else
      wind.intensity=0;
  }
  else//giù
  {
    if(wind.intensity<wind.max_wind)
      wind.intensity+=wind.wind_step;
  }
  print("\n\n\n\n\n\n\n\n\n\n wind : "+wind.intensity/METRIC_UNIT +" m/s");
}
