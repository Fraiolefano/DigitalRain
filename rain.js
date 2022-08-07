//By Fraiolefano

const N_DROPS=900;
const WINDOW_SIZE=Math.min(window.innerWidth,window.innerHeight);
const METRIC_UNIT=WINDOW_SIZE/10;   //la finestra rappresenterà uno spazio di 100m^2
// 1 m = metric_unit px,wind = 36km/h = 10m/s =10*metric_unit px/s
const G=9.8*METRIC_UNIT; 
var wind;
var drops=[];
var splashes=[];

function preload()
{
  rainSound=loadSound("data/rain.mp3");
  windSound=loadSound("data/wind.mp3");
}
function setup()
{
  pixelDensity(1);
  createCanvas(WINDOW_SIZE,WINDOW_SIZE);
  wind=new Wind();
  wind.setup();
  
  for(c=0;c<N_DROPS;c++)
  {
    drops[c]=new Drop();
  }
  //Sui dispositivi mobili non è possibile far partire l'audio in automatico (LIMITAZIONI CONSUMO DATI MOBILI)
  //Necessario l'utilizzo di un pulsante
  createAudioButton();
}

function draw()
{
  background(0);
  wind.update();

  for(c=0;c<N_DROPS;c++)
  {
    drops[c].update();
    drops[c].draw();
  }

  for(c=splashes.length-1;c>0;c--)
  {
      if(splashes[c].live)
      {
        splashes[c].update();
        splashes[c].draw();
      }
      else
        splashes.pop(c);
  }
  wind.draw();
}


function createAudioButton()
{
  buttonForMobile=createButton("clicca qui per attivare l'audio");
  buttonForMobile.style("font-size","23px");
  buttonForMobile.style("margin-top","50px");
  buttonForMobile.style("margin-bottom","50px");
  buttonForMobile.mousePressed(changeAudio);
  buttonForMobile.parent(ms);
  buttonForMobile.value=0;
}
function changeAudio()
{
  if (!rainSound.isPlaying())
  {
    rainSound.loop();
    buttonForMobile.html("clicca qui per disattivare l'audio");
    buttonForMobile.value=1;
  }
  else
  {
    rainSound.stop();
    windSound.stop();
    buttonForMobile.html("clicca qui per attivare l'audio");
    buttonForMobile.value=0;
  }
}
