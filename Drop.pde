class Drop
{
  PVector position,start_position;
  float initial_height,initial_velocity;
  float start_time,elapsed_time;
  float y_acceleration;
  float drop_length;
  float z_index;
  color drop_color;
  Drop()
  {
    init();
  }

  void init()
  {
    initial_velocity=random(400,1000); //da ~(130,830)m di altezza
    initial_height=random(-10,-height);
    position=new PVector(random(-width,2*width),initial_height);
    start_position=this.position.copy();
    start_time=millis();
    elapsed_time=millis();
    z_index=(2.0-((2.0/1000.0)*initial_velocity));
    drop_length=(30.0/1000.0)*initial_velocity;
    drop_color=color(0,random(0,200),random(200,255));
  }
  
  void update()
  {
    elapsed_time=(millis()-start_time)/1000.0;
    y_acceleration=G+(wind.wind.y*wind.intensity);
    position.x=start_position.x+(wind.intensity*elapsed_time*wind.wind.x); // S_x=v_x*t+x_i
    position.y=((y_acceleration/2.0)*(pow(elapsed_time,2.0)))+(initial_velocity*elapsed_time)+initial_height;  // S_y=1/2 gt^2 +v_i*t+h_i 
    
    if(position.y>height)
    {
      if(position.x>-10 && position.x<width+10)
        {splashes.add(new Splash(position,drop_color));}
     init();
    }
  }
  
  void draw()
  {
    strokeWeight(z_index);
    stroke(drop_color);
    line(position.x,position.y,position.x-(wind.wind.x*((10.0/wind.max_wind)*wind.intensity)),position.y-drop_length);
    //Se si desidera una forma più a goccia
    //strokeWeight(5);
    //point(position.x,position.y);
  }
}
