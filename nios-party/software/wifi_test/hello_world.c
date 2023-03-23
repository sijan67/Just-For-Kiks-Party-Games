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
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include "altera_avalon_pio_regs.h"
#include "altera_up_avalon_rs232.h"
#include "altera_up_avalon_rs232_regs.h"
#include "io.h"
#include "alt_types.h"
#include "altera_up_avalon_video_character_buffer_with_dma.h"

void write_data(char *function);
void read_data();
void display_question();
void press_button();


alt_up_rs232_dev *rs232_dev;
//variable to hold data received from uart
unsigned char data;
//parity bit for reading (not using parity atm, but still need the bit)
unsigned char parity;
char node_start[] = "node.start()";
char dofile[] = "dofile(\"wifi_script.lua\")";
char end = '\n';
char check_wifi_get[] = "check_wifi_get()";
char check_wifi[] = "check_wifi()";
char led[] = "gpio.write(3, gpio.LOW)";
char output[512] = "Question 1:";


alt_u32 write_FIFO_space;
alt_u16 read_FIFO_used;
alt_u8 data_W8;
alt_u8 data_R8;

alt_up_char_buffer_dev* char_buffer;


int main() {
	printf("TESTING\n");
	display_question();
	rs232_dev = alt_up_rs232_open_dev("/dev/WIFI_Serial_Port");

	if(rs232_dev == NULL) {
		printf("Failed to open Wifi device\n");
	} else {
		printf("Opened Wifi device\n");
	}

	alt_up_rs232_enable_read_interrupt(rs232_dev);

	//write_data(node_start);
	write_data(dofile);
	usleep(10000000);
	//read_data();
	write_data(check_wifi_get);
	//write_data(led);
	usleep(5000000);
	read_data();
	//usleep(5000000);
	printf("\nDONE GET\n");
	press_button();

	printf("\noutput: \n");
	printf("%s", output);
	//display_question();
	printf("\nFinished\n");



    return 0;
}

void write_data(char *function) {
	alt_up_rs232_disable_read_interrupt(rs232_dev);
	printf("Writing\n");
	for (int i = 0; function[i] != '\0'; i++) {
		data_W8 = function[i];
		if(alt_up_rs232_write_data(rs232_dev, data_W8) == 0) {
			printf("Write %c\n", data_W8);
		}
	}
	data_W8 = '\n';
	alt_up_rs232_write_data(rs232_dev, data_W8);

	//printf("%d", stat);
	//printf("Write %c\n", data_W8);
	alt_up_rs232_enable_read_interrupt(rs232_dev);
}

void read_data() {
	printf("Reading\n");
	read_FIFO_used = alt_up_rs232_get_used_space_in_read_FIFO(rs232_dev);
	while(read_FIFO_used > 0){
		int record = 0;
		int i = 0;
		alt_up_rs232_read_data(rs232_dev, &data_R8, &parity);
		char str[2];
		sprintf(str, "%c", data_R8);
		if(strcmp(str, "@") == 0) {
			record = 1;
			printf("RECORD\n");
		} else if(record == 1) {
			//sprintf(output, "%s%c", output, data_R8);
			output[i] = data_R8;
		}

		printf("%c", data_R8);
		//printf("%d\n", read_FIFO_used);
		read_FIFO_used = alt_up_rs232_get_used_space_in_read_FIFO(rs232_dev);

	}
}

void display_question() {
	char_buffer = alt_up_char_buffer_open_dev("/dev/Char_Buffer");
	if(char_buffer == NULL) {
		printf("Failed to open Char buffer\n");
	} else {
		printf("Opened Char Buffer\n");
	}
	char question[20] = "Question 1:";

	char border = 'X';
	alt_up_char_buffer_clear(char_buffer);
	alt_up_char_buffer_draw(char_buffer, border, 0, 0);
	alt_up_char_buffer_draw(char_buffer, border, 0, 59);
	alt_up_char_buffer_draw(char_buffer, border, 79, 0);
	alt_up_char_buffer_draw(char_buffer, border, 79, 59);
	alt_up_char_buffer_string(char_buffer, question, 30, 30);
	for(int i = 0; i < 10; i++) {
		question[9] = i + '0';
		alt_up_char_buffer_string(char_buffer, question, 30, 30);
		//usleep(1000000);
	}


	printf("Displayed questioned\n");
}

void press_button() {
	int j = 0;
	while(j == 0) {
		if(IORD_ALTERA_AVALON_PIO_DATA(BUTTON_1_BASE) == 0) {
			printf("Button Pressed\n");
			j = 1;
			write_data(check_wifi);
			usleep(5000000);
			read_data();
		}
	}
}
