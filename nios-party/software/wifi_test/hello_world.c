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
#include <stdlib.h>
#include "altera_up_avalon_rs232.h"
#include "altera_up_avalon_rs232_regs.h"
#include "io.h"
#include "alt_types.h"

void write_data(char *function);
void read_data();



alt_up_rs232_dev *rs232_dev;
//variable to hold data received from uart
unsigned char data;
//parity bit for reading (not using parity atm, but still need the bit)
unsigned char parity;
char node_start[] = "node.start()\n";
char dofile[] = "dofile(\"wifi_script.lua\")\n";
char check_wifi[] = "check_wifi()\n";

alt_u32 write_FIFO_space;
alt_u16 read_FIFO_used;
alt_u8 data_W8;
alt_u8 data_R8;


void send_to_server(const char *data, int len) {

}

int main() {
	printf("TESTING\n");
	rs232_dev = alt_up_rs232_open_dev(WIFI_SERIAL_PORT_NAME);

	if(rs232_dev == NULL) {
		printf("Failed to open Wifi device\n");
	} else {
		printf("Opened Wifi device\n");
	}

	alt_up_rs232_enable_read_interrupt(rs232_dev);

	write_data(node_start);
	write_data(dofile);
	write_data(check_wifi);

	printf("%x", write_FIFO_space);

	read_FIFO_used = alt_up_rs232_get_used_space_in_read_FIFO(rs232_dev);
	if(read_FIFO_used > 0) {
		printf("Reading\n");
		alt_up_rs232_read_data(rs232_dev, &data_R8, &parity);
		printf("Read %c\n", data_R8);
	}

	printf("Finished\n");

    return 0;
}

void write_data(char *function) {
	alt_up_rs232_disable_read_interrupt(rs232_dev);
	for (int i = 0; function[i] != 0; i++) {
		data_W8 = function[i];
		write_FIFO_space = alt_up_rs232_get_available_space_in_write_FIFO(rs232_dev);
		printf("%x\n", write_FIFO_space);
		if(write_FIFO_space >= 0x80) {
			printf("Writing\n");
			if(alt_up_rs232_write_data(rs232_dev, data_W8) == 0) {
				printf("Write %c\n", data_W8);
			}

		}
	}
	alt_up_rs232_enable_read_interrupt(rs232_dev);
}

void read_data() {
	read_FIFO_used = alt_up_rs232_get_used_space_in_read_FIFO(rs232_dev);
	while(read_FIFO_used > 0){
		alt_up_rs232_read_data(rs232_dev, &data, &parity);
		printf("read %x from RS232 UART\n", data);
	}
}
