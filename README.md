# Monitor

A simple monitor for mac.  
Currently able to display :

- CPU usage
- CPU temperature


##Requirements :  
Intel Power Gadget : ```brew cask install intel-power-gadget```  
or directly from [Intel website](https://software.intel.com/en-us/articles/intel-power-gadget-20).

##Build

```
cd dirname;
gcc -o c/cpu_temp c/cpu_temp.c -framework IntelPowerGadget;
npm install;
node app.js;
```

Server is launched on ```http://localhost:3000/```