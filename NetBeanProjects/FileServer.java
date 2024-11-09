package com.mycompany.fileserver;

import java.net.*;
import java.io.*;

public class FileServer {
    public static void main(String[] args) throws IOException {
        int port = 13269; // Ensure the port matches the client
        ServerSocket serverSocket = null;
        Socket clientSocket = null;

        try {
            serverSocket = new ServerSocket(port);
            System.out.println("Server started, waiting for connection...");

            clientSocket = serverSocket.accept();
            System.out.println("Client connected.");

            File file = new File("src/main/java/com/mycompany/fileserver/CNTEST.pdf");

            byte[] byteArray = new byte[(int) file.length()];

            FileInputStream fis = new FileInputStream(file);
            BufferedInputStream bis = new BufferedInputStream(fis);
            bis.read(byteArray, 0, byteArray.length);

            OutputStream os = clientSocket.getOutputStream();
            System.out.println("Sending file...");
            os.write(byteArray, 0, byteArray.length);
            os.flush();

            bis.close();
            clientSocket.close();
            System.out.println("File sent and connection closed.");
        } catch (IOException e) {
            System.out.println("Server error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            if (serverSocket != null) serverSocket.close();
        }
    }
}
