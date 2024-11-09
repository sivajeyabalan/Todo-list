package com.mycompany.fileclient;

import java.net.*;
import java.io.*;

public class FileClient {
    public static void main(String[] args) {
        int port = 13269;  // Ensure this port matches the server
        int bytesRead;
        int current = 0;

        try (Socket socket = new Socket("localhost", port)) {
            System.out.println("Connected to server...");

            // Prepare to receive file
            byte[] mybytearray = new byte[6022386]; // Adjust size based on expected file size
            InputStream is = socket.getInputStream();
            FileOutputStream fos = new FileOutputStream("C:/Users/DELL/Documents/received.pdf");

            BufferedOutputStream bos = new BufferedOutputStream(fos);

            // Read file data from server
            bytesRead = is.read(mybytearray, 0, mybytearray.length);
            current = bytesRead;

            do {
                bytesRead = is.read(mybytearray, current, (mybytearray.length - current));
                if (bytesRead >= 0) current += bytesRead;
            } while (bytesRead > -1);

            bos.write(mybytearray, 0, current);
            bos.flush();
            System.out.println("File received and saved.");
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
