mini-lifx
=========

Hardware specs and software to create a (cheap) mini-lifx at home that connects to the one at http://whitesmith.co/

Installation
-
```
brew install libusb
brew install socat
```

```
pip install --pre pyusb
pip install pyserial
```

Running
-
``` socat PTY,link=tty_trinket PTY,link=tty_terminal ```

``` node client.js ```

``` python TrinketFakeUsbSerialHostSW.py -v -p tty_trinket ```

Plug in your Trinket with `mini_lifx_trinket` (needs libraries) loaded and go.
