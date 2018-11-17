#include <IntelPowerGadget/EnergyLib.h>

int main(int argc, char* argv[]) {
	IntelEnergyLibInitialize();
	ReadSample();
	int nData;
	double data[3];
	GetPowerData(0, 3, data, &nData);
	return (int)data[0];
}