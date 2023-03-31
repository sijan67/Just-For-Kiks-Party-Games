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
void read_data(int text);
void display_question();
void display_new_question();
void display_choices();
void press_button();
void removeChar(char *str, char remove);


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
char get_question[] = "getQuestion()";
char get_question_choices[] = "getQuestionChoices()";
char led[] = "gpio.write(3, gpio.LOW)";
char output[512] = "Question 1:";
char choices[512] = "";
char question[512] = "";

char *delim = "@";


alt_u32 write_FIFO_space;
alt_u16 read_FIFO_used;
alt_u8 data_W8;
alt_u8 data_R8;

alt_up_char_buffer_dev* char_buffer;


int main() {
	printf("TESTING\n");
	//display_question();
	rs232_dev = alt_up_rs232_open_dev("/dev/WIFI_Serial_Port");

	if(rs232_dev == NULL) {
		printf("Failed to open Wifi device\n");
	} else {
		printf("Opened Wifi device\n");
	}

	alt_up_rs232_enable_read_interrupt(rs232_dev);

	//write_data("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
	//read_data();
	write_data(dofile);
	usleep(15000000);
	read_data(0);
	usleep(5000000);
	//write_data(get_question);
	//usleep(5000000);
	//read_data(1);
	//usleep(5000000);
	write_data(get_question_choices);
	usleep(5000000);
	read_data(2);
	//usleep(5000000);
	printf("\nDONE GET\n");

	printf("\noutput: \n");
	printf("%s", choices);

	//display_new_question();
	display_choices();
	printf("\nFinished\n");


    return 0;
}

void write_data(char *function) {
	alt_up_rs232_disable_read_interrupt(rs232_dev);
	printf("Writing\n");
	for (int i = 0; function[i] != '\0'; i++) {
		data_W8 = function[i];
		if(alt_up_rs232_write_data(rs232_dev, data_W8) == 0) {
			//printf("Write %d", i);
		}
	}
	data_W8 = '\n';
	alt_up_rs232_write_data(rs232_dev, data_W8);

	//printf("%d", stat);
	//printf("Write %c\n", data_W8);
	alt_up_rs232_enable_read_interrupt(rs232_dev);
}

void read_data(int text) {
	printf("Reading\n");
	read_FIFO_used = alt_up_rs232_get_used_space_in_read_FIFO(rs232_dev);
	int i = 0;
	while(read_FIFO_used > 0){
		int record = 0;

		alt_up_rs232_read_data(rs232_dev, &data_R8, &parity);
		//char str[2];
		//sprintf(str, "%c", data_R8);
		if(text == 0) {
			output[i] = data_R8;
		} else if(text == 1) {
			question[i] = data_R8;
		} else if(text == 2) {
			choices[i] = data_R8;
		}



		printf("%c", data_R8);
		i++;
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
	char questions[20] = "Question 1:";

	char border = 'X';
	alt_up_char_buffer_clear(char_buffer);
	alt_up_char_buffer_draw(char_buffer, border, 0, 0);
	alt_up_char_buffer_draw(char_buffer, border, 0, 59);
	alt_up_char_buffer_draw(char_buffer, border, 79, 0);
	alt_up_char_buffer_draw(char_buffer, border, 79, 59);
	alt_up_char_buffer_string(char_buffer, questions, 30, 30);
	for(int i = 0; i < 10; i++) {
		questions[9] = i + '0';
		alt_up_char_buffer_string(char_buffer, questions, 30, 30);
		//usleep(1000000);
	}

	printf("Displayed questioned\n");
}

void display_new_question() {
	alt_up_char_buffer_clear(char_buffer);
	char *token = strtok(question,delim);
	token = strtok(NULL, delim);

	removeChar(token, '†');
	removeChar(token, '…');
	removeChar(token, '\n');
	removeChar(token, '\r');
	int len = strlen(token);
	int width = 40 - (len / 2);

	for(int i = 0; i < strlen(token); i++) {
		printf("Character %d: %d\n", i, token[i]);
	}

	alt_up_char_buffer_string(char_buffer, token, width, 10);
}

void display_choices() {
	char *token = strtok(choices,'\n');
	char *choice1 = strtok(NULL, '\n');
	removeChar(choice1, '\n');
	char *choice2 = strtok(NULL, '\n');
	removeChar(choice2, '\n');
	char *choice3 = strtok(NULL, '\n');
	removeChar(choice3, '\n');
	char *choice4 = strtok(NULL, '\n');
	removeChar(choice4, '\n');

	printf("%s\n", choice1);
	printf("%s\n", choice2);
	printf("%s\n", choice3);
	printf("%s\n", choice4);

}

void press_button() {
	int j = 0;
	while(j == 0) {
		if(IORD_ALTERA_AVALON_PIO_DATA(BUTTON_1_BASE) == 0) {
			printf("Button Pressed\n");
			j = 1;
			write_data(check_wifi);
			usleep(5000000);
			read_data(1);
		} else if(IORD_ALTERA_AVALON_PIO_DATA(BUTTON_2_BASE) == 0) {
			printf("Button 2 Pressed\n");
			j = 1;
			write_data(check_wifi);
			usleep(5000000);
			read_data(1);
		}
	}
}

void removeChar(char *str, char remove) {
	int i, j;
	int len = strlen(str);
	for(i = 0; i < len; i++) {
		if(str[i] == remove) {
			for(j = i; j < len; j++) {
				str[j] = str[j+1];
			}
			len--;
			i--;
		}
	}
}
