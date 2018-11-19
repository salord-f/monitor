cpu_temp: cpu_temp.c
	gcc -o cpu_temp cpu_temp.c -framework IntelPowerGadget

all:
	$(cpu_temp)
	javac Bandwidth.java

clean:
	rm cpu_temp
	rm *.class