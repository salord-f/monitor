import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Bandwidth {

    public static void main(String[] args) {

        String exclude = "time,interface,state,rx_dupe,rx_ooo,re-tx,rtt_avg,rcvsize,tx_win,tc_class,tc_mgt,cc_algo,P,C,R,W";
        String[] cmd = {
                "/bin/sh",
                "-c",
                "nettop -k " + exclude + " -P -c -s 1 -d -n -l 2"
        };

        try {
            Process p = Runtime.getRuntime().exec(cmd);
            p.waitFor();

            BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));

            reader.readLine();
            while (!reader.readLine().startsWith("time")) ;

            String line;
            List<String> lines = new ArrayList<>();
            while ((line = reader.readLine()) != null) {
                lines.add(line);
            }

            int bandwidthIn = 1;
            int bandwidthOut = -1;

            for (String s : lines) {
                String[] in = s.split("  +")[1].split(" +");
                String[] out = s.split("  +")[2].split(" +");

                bandwidthIn += Integer.parseInt(in[0]) * BYTES.valueOf(in[1]).value;
                bandwidthOut += Integer.parseInt(out[0]) * BYTES.valueOf(out[1]).value;
            }

            System.out.println(bandwidthIn + ";" + bandwidthOut);
        } catch (Exception e) {
            e.printStackTrace();
        }
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