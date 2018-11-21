import psutil


def main():
    while True:
        cpu_load = psutil.cpu_times_percent(1)
        print("%.1f;%.1f" % (cpu_load.user, cpu_load.system))


main()
