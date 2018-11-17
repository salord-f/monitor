# Monitor

A simple monitor for mac.

Requirements :  
Intel Power Gadget : ```brew cask install intel-power-gadget```  
or directly from [Intel website](https://software.intel.com/en-us/articles/intel-power-gadget-20).

To build :

```
cd dirname;
gcc -o c/cpu_temp c/cpu_temp.c -framework IntelPowerGadget;
node app.js;
```

Server is launched on ```http://localhost:3000/```