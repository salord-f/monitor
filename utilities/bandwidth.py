import time
import psutil

def main():
    old_send = 0    
    old_recv = 0

    while True:
        new_send = psutil.net_io_counters().bytes_sent
        new_recv = psutil.net_io_counters().bytes_recv

        if old_send or old_recv:
            send_stat(new_send - old_send, new_recv - old_recv)

        old_send = new_send
        old_recv = new_recv

        time.sleep(1)

def convert_to_gbit(value):
    return value#/1024#./1024./1024.*8

def send_stat(send, recv):
    print ("%.0f;%.0f" % (convert_to_gbit(send),convert_to_gbit(recv)))

main()