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
#include <time.h>
#include "sys/alt_irq.h"
#include <altera_avalon_timer_regs.h>

void write_data(char *function);
void read_data(int text);
void display_question();
void display_new_question();
void display_choices();
void press_button();
void removeChar(char *str, char remove);
void generate_question();
static void timer_isr(void *context, alt_u32 id);
void init_timer_interrupt();
void question_countdown();


alt_up_rs232_dev *rs232_dev;
//variable to hold data received from uart
unsigned char data;
//parity bit for reading (not using parity atm, but still need the bit)
unsigned char parity;
char node_start[] = "node.start()";
char dofile[] = "dofile(\"wifi_script.lua\")";
char end = '\n';
char get_question[] = "getQuestion(  )";
char get_question_choices[] = "getQuestionChoices(  )";
char output[512] = "Question 1:";
char choices[512] = "";
char question[512] = "";
int question_count = 1;
int question_grab = 1;
int count = 0;
int current_time = 0;
char display_time[1] = "0";

char current_question[20] = "Question   :";

char *delim = "@";
int used_questions[50] = {-1};
int used_question_index = 0;



alt_u32 write_FIFO_space;
alt_u16 read_FIFO_used;
alt_u8 data_W8;
alt_u8 data_R8;

alt_up_char_buffer_dev* char_buffer;


int main() {
	srand(time(0));
	printf("TESTING\n");
	display_question();
	rs232_dev = alt_up_rs232_open_dev("/dev/WIFI_Serial_Port");

	if(rs232_dev == NULL) {
		printf("Failed to open Wifi device\n");
	} else {
		printf("Opened Wifi device\n");
	}
	init_timer_interrupt();
	alt_irq_disable(TIMER_IRQ);
	alt_up_rs232_enable_read_interrupt(rs232_dev);
	write_data(dofile);
	usleep(15000000);
	read_data(0);
	usleep(5000000);
	for(int k = 0; k < 10; k++) {
		generate_question();
	}
	printf("\nDONE GET\n");

	printf("CHOICES: %s", choices);

	printf("\nFinished\n");


    return 0;
}

void write_data(char *function) {
	alt_up_rs232_disable_read_interrupt(rs232_dev);
	printf("Writing\n");
	for (int i = 0; function[i] != '\0'; i++) {
		data_W8 = function[i];
		alt_up_rs232_write_data(rs232_dev, data_W8);

	}
	data_W8 = '\n';
	alt_up_rs232_write_data(rs232_dev, data_W8);
	alt_up_rs232_enable_read_interrupt(rs232_dev);
}

void read_data(int text) {
	printf("Reading\n");
	read_FIFO_used = alt_up_rs232_get_used_space_in_read_FIFO(rs232_dev);
	int i = 0;
	while(read_FIFO_used > 0){
		alt_up_rs232_read_data(rs232_dev, &data_R8, &parity);
		if(text == 0) {
			output[i] = data_R8;
		} else if(text == 1) {
			question[i] = data_R8;
		} else if(text == 2) {
			printf("%c", data_R8);
			choices[i] = data_R8;
		}

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

	char border = 'X';
	char *kiks = "Just for Kiks";
	char *room_code = "Room Code:";
	alt_up_char_buffer_clear(char_buffer);
	alt_up_char_buffer_draw(char_buffer, border, 0, 0);
	alt_up_char_buffer_draw(char_buffer, border, 0, 59);
	alt_up_char_buffer_draw(char_buffer, border, 79, 0);
	alt_up_char_buffer_draw(char_buffer, border, 79, 59);

	alt_up_char_buffer_string(char_buffer, kiks, 33, 20);
	alt_up_char_buffer_string(char_buffer, room_code, 35, 25);



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

	current_question[10] = (question_count % 10) + '0';
	if(question_count > 9) {
		current_question[9] = (question_count / 10) + '0';
	}

	alt_up_char_buffer_string(char_buffer, current_question, 32, 8);
	alt_up_char_buffer_string(char_buffer, token, width, 15);
	question_count++;
}

void display_choices() {
	char *token = strtok(choices, delim);
	char *choice1 = strtok(NULL, delim);
	removeChar(choice1, '†');
	removeChar(choice1, '…');
	removeChar(choice1, '\n');
	removeChar(choice1, '\r');
	char *choice2 = strtok(NULL, delim);
	removeChar(choice2, '†');
	removeChar(choice2, '…');
	removeChar(choice2, '\n');
	removeChar(choice2, '\r');
	char *choice3 = strtok(NULL, delim);
	removeChar(choice3, '†');
	removeChar(choice3, '…');
	removeChar(choice3, '\n');
	removeChar(choice3, '\r');
	char *choice4 = strtok(NULL, delim);
	removeChar(choice4, '†');
	removeChar(choice4, '…');
	removeChar(choice4, '\n');
	removeChar(choice4, '\r');

	/*printf("%s\n", choice1);
	printf("%s\n", choice2);
	printf("%s\n", choice3);
	printf("%s\n", choice4);*/

	int width = 40 - (strlen(choice1) / 2) - 4;

	alt_up_char_buffer_string(char_buffer, choice1, width, 22);
	alt_up_char_buffer_string(char_buffer, choice2, width, 25);
	if((choice3 != NULL) & (choice4 != NULL)) {
		alt_up_char_buffer_string(char_buffer, choice3, width, 28);
		alt_up_char_buffer_string(char_buffer, choice4, width, 31);
	}
}

void press_button() {
	//int j = 0;
	//while(j == 0) {
		if(IORD_ALTERA_AVALON_PIO_DATA(BUTTON_1_BASE) == 0) {
			printf("Button Pressed\n");
			current_time = -1;
			//write_data(check_wifi);
			//usleep(5000000);
			//read_data(1);
		} else if(IORD_ALTERA_AVALON_PIO_DATA(BUTTON_2_BASE) == 0) {
			printf("Button 2 Pressed\n");
			current_time = -1;
			//write_data(check_wifi);
			//usleep(5000000);
			//read_data(1);
		}
	//}
}

void generate_question() {

	int generate = 1;
	question_grab = (rand() % 10) + 10;
	if(used_questions[0] != -1) {
		while(generate == 1) {
			generate = 0;
			for(int i = 0; used_questions[i] > -1; i++) {
				if(question_grab == used_questions[i]) {
					generate = 1;
					question_grab = (rand() % 10) + 10;
					break;
				}
			}

			if(generate != 1) {
				break;
			}
		}
	}
	used_questions[used_question_index] = question_grab;
	used_question_index++;



	get_question[13] = (question_grab % 10) + '0';
	get_question[12] = (question_grab / 10) + '0';
	get_question_choices[20] = (question_grab % 10) + '0';
	get_question_choices[19] = (question_grab / 10) + '0';

	printf("QUESTIONS\n");
	printf("%s\n", get_question);
	printf("%s\n", get_question_choices);


	write_data(get_question);
	usleep(5000000);
	read_data(1);
	usleep(5000000);
	write_data(get_question_choices);
	usleep(5000000);
	read_data(2);
	usleep(5000000);


	display_new_question();
	display_choices();
	question_countdown();


}

void question_countdown() {
	alt_irq_enable(TIMER_IRQ);
	current_time = 9;
	while(current_time > -1) {
		display_time[0] = current_time + '0';
		alt_up_char_buffer_string(char_buffer, display_time, 40, 40);
	}
	alt_irq_disable(TIMER_IRQ);
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

void init_timer_interrupt() {
	IOWR_ALTERA_AVALON_TIMER_CONTROL(TIMER_BASE,
			ALTERA_AVALON_TIMER_CONTROL_CONT_MSK |
			ALTERA_AVALON_TIMER_CONTROL_START_MSK |
			ALTERA_AVALON_TIMER_CONTROL_ITO_MSK);

	alt_irq_register(TIMER_IRQ, NULL,timer_isr);
}

static void timer_isr(void * context, alt_u32 id) {
	IOWR_ALTERA_AVALON_TIMER_STATUS(TIMER_BASE, 0);
	press_button();
	if(count % 1000 == 0) {
		if(current_time > -1) {
			current_time--;
		}
	}
	count++;

}
