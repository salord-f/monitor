#Monitor

A simple monitor for mac.

Requirements :

- Intel Power Gadget

To build :

```
cd dirname;
gcc -o c/cpu_temp c/cpu_temp.c -framework IntelPowerGadget
node app.js
```

Server is launched on ```http://localhost:3000/```