#include <TrinketFakeUsbSerial.h>
#include <TrinketFakeUsbSerialC.h>
#include <cmdline_defs.h>
#include <usbconfig.h>

// Red and green pins are PWM
int redPin = 0;
int greenPin = 1;
// Blue pin is digital because I can't use pin #4 
// in OUTPUT and have USB comm at the same time =(
int bluePin = 2;

int colors[8][3] = { {0,0,LOW},
                     {241,196,LOW}, //Yellow (meh)
                     {255,125,LOW}, // Orange (meh)
                     {255,0,LOW}, // Red
                     {26,188,HIGH}, // Cyan (meh)
                     {0,0,HIGH}, // Blue
                     {0,255,LOW}, // Green
                     {155,89,HIGH} }; // Purple (meh)

void setup()
{
  TFUSerial.begin();
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
}
 
void loop()
{
  TFUSerial.task(); // this should be called at least once every 10 ms
 
  if (TFUSerial.available()) {
    char c = TFUSerial.read();
    
    // Convert to int and check if it is within bounds to prevent serial garbage to
    // f%&$ up this all
    int i = c - '0';
    if(i >= 0 && i <= 7){
      analogWrite(redPin, colors[i][0]);
      analogWrite(greenPin, colors[i][1]);
      digitalWrite(bluePin, colors[i][2]);
    }
  }
}
