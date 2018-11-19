import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Bandwidth {

    public static void main(String[] args) {

        //System.out.println("Interface not yet implemented");
        String exclude = "time,interface,state,rx_dupe,rx_ooo,re-tx,rtt_avg,rcvsize,tx_win,tc_class,tc_mgt,cc_algo,P,C,R,W";
        String[] cmd = {
                "/bin/sh",
                "-c",
                "nettop -k " + exclude + " -d -c -s 1 -l 2 | grep -v -e udp -e tcp"
        };

        StringBuilder output = new StringBuilder();

        Process p;
        try {
            p = Runtime.getRuntime().exec(cmd);
            p.waitFor();
            BufferedReader reader =
                    new BufferedReader(new InputStreamReader(p.getInputStream()));

            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        int bandwidthIn = 0;
        int bandwidthOut = 0;

        String[] lines = output.toString().split("time")[2].split("\n");

        for (int i = 1; i < lines.length; i++) {
            String[] in = lines[i].split("  +")[1].split(" +");
            String[] out = lines[i].split("  +")[2].split(" +");

            bandwidthIn += Integer.parseInt(in[0]) * BYTES.valueOf(in[1]).value;
            bandwidthOut += Integer.parseInt(out[0]) * BYTES.valueOf(out[1]).value;
        }

        System.out.println(bandwidthIn + ";" + bandwidthOut);
    }

    private enum BYTES {
        B(1),
        KiB(1000),
        MiB(1000000),
        GiB(1000000000);

        int value;

        BYTES(int value) {
            this.value = value;
        }
    }
}