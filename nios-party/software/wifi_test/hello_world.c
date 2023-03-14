/*
 * "Hello World" example.
 *
 * This example prints 'Hello from Nios II' to the STDOUT stream. It runs on
 * the Nios II 'standard', 'full_featured', 'fast', and 'low_cost' example
 * designs. It runs with or without the MicroC/OS-II RTOS and requires a STDOUT
 * device in your system's hardware.
 * The memory footprint of this hosted application is ~69 kbytes by default
 * using the standard reference design.
 *
 * For a reduced footprint version of this template, and an explanation of how
 * to reduce the memory footprint for a given application, see the
 * "small_hello_world" template.
 *
 */

#include <stdio.h>
#include <system.h>
#include "altera_up_avalon_rs232.h"
#include "altera_up_avalon_rs232_regs.h"
#include "io.h"
#include "alt_types.h"

// WiFi network information
#define WIFI_SSID "your_SSID_here"
#define WIFI_PASSWORD "your_password_here"

// IP server information
#define SERVER_IP "50.112.215.42"
#define SERVER_PORT 1234

alt_up_rs232_dev *rs232;

void send_to_server(const char *data, int len) {
    alt_32 socket;
    alt_32 status;
    alt_32 tx_len;

    // Open a TCP socket
    socket = lwip_socket(AF_INET, SOCK_STREAM, 0);

    if (socket < 0) {
        printf("Failed to create socket\n");
        return;
    }

    // Connect to the server
    struct sockaddr_in server_addr;
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(SERVER_PORT);
    server_addr.sin_addr.s_addr = inet_addr(SERVER_IP);

    status = lwip_connect(socket, (struct sockaddr *)&server_addr, sizeof(server_addr));

    if (status < 0) {
        printf("Failed to connect to server\n");
        return;
    }

    // Send the data to the server
    tx_len = lwip_write(socket, data, len);

    if (tx_len < 0) {
        printf("Failed to send data to server\n");
    }

    // Close the socket
    lwip_close(socket);
}

int main() {
    char buffer[BUFFER_SIZE];
    int len;

    rs232 = alt_up_rs232_open_dev(WIFI_SERIAL_PORT_NAME);
    if(rs232 == NULL) {
    	printf("Error: Failed to open WiFi module\n");
    } else {
    	printf("Opened WiFi module\n");
    }

    while (1) {
        // Read data from RS232
        len = 0;
        while (len == 0) {
            len = alt_up_rs232_get_used_space_in_read_FIFO(WIFI_SERIAL_PORT_BASE);
        }
        len = len > BUFFER_SIZE ? BUFFER_SIZE : len;
        alt_up_rs232_read_data(WIFI_SERIAL_PORT_BASE, buffer, len);

        // Send data to the server
        send_to_server(buffer, len);
    }

    return 0;
}
