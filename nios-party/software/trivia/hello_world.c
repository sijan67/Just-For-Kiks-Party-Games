/*********************************************************
 * Example
 *****************************************************/

#include <stdio.h>
#include <math.h>
#include <stdbool.h>
#include <system.h>
#include <sys/alt_irq.h>
#include <priv/alt_file.h>
#include <altera_avalon_timer_regs.h>
#include <altera_avalon_pio_regs.h>
#include "altera_up_avalon_video_pixel_buffer_dma.h"
#include "altera_up_avalon_video_character_buffer_with_dma.h"
#include "altera_up_avalon_video_character_buffer_with_dma_regs.h"

// Function Declaration
void init_timer_interrupt( void );
static void timer_isr( void * context, alt_u32 id );
void init_hex_display(void);
alt_up_char_buffer_dev* init_char_buffer(alt_up_char_buffer_dev* char_buffer);
alt_up_pixel_buffer_dma_dev* pixel_buffer;
alt_up_char_buffer_dev* char_buffer;
int count = 0;
int countdown = 0;
int numbers[] = {
			0b1000000,
			0b1111001,
			0b0100100,
			0b0110000,
			0b0011001,
			0b0010010,
			0b0000010,
			0b1111000,
			0b0000000,
			0b0010000
	};

char questions[20][100];


int main( void )
{
	printf("Hello from NIOS II!\n");
	printf("This is an interrupt example\n");

	// Enable the timer
	init_timer_interrupt();
	init_hex_display();
	pixel_buffer = alt_up_pixel_buffer_dma_open_dev(SUBSYSTEM_0_VGA_PIXEL_DMA_NAME);
	if(pixel_buffer == NULL) {
		printf("Error: could not open pixel buffer device");
	} else {
		printf("Opened pixel buffer device");
	}

	alt_up_pixel_buffer_dma_clear_screen(pixel_buffer, 0);
	char_buffer = init_char_buffer(char_buffer);	

	// Generate room code

	while(1){
		//Display question
		// Trigger button presses
		if(countdown == 0) {
			if(IORD_ALTERA_AVALON_PIO_DATA(BUTTONS_BASE + 3)){
				IOWR_ALTERA_AVALON_PIO_DATA(RED_LEDS_BASE, 240);
				alt_up_pixel_buffer_dma_draw_box(pixel_buffer, 20, 20, 640, 480, 0xF800,0); // Display Red box
				countdown = 5;
			} else if(IORD_ALTERA_AVALON_PIO_DATA(BUTTONS_BASE + 2)) {
				IOWR_ALTERA_AVALON_PIO_DATA(RED_LEDS_BASE, 15);
				alt_up_pixel_buffer_dma_draw_box(pixel_buffer, 20, 20, 640, 480, 0x07E0,0); // Display Green Box
				countdown = 5;
			}
		}

		// Listen for audio input
		// Display whether correct or incorrect
		// Loop to next question
	}

	return 0;
}

void init_timer_interrupt( void )
{
	// Register the ISR with HAL
	alt_ic_isr_register(TIMER_IRQ_INTERRUPT_CONTROLLER_ID, TIMER_IRQ, (void *)timer_isr, NULL, 0x0);

	// Start the timer
	IOWR_ALTERA_AVALON_TIMER_CONTROL(TIMER_BASE,
			ALTERA_AVALON_TIMER_CONTROL_CONT_MSK |
			ALTERA_AVALON_TIMER_CONTROL_START_MSK |
			ALTERA_AVALON_TIMER_CONTROL_ITO_MSK);
}

static void timer_isr(void * context, alt_u32 id) {
	IOWR_ALTERA_AVALON_TIMER_STATUS(TIMER_BASE, 0);

	count++;
	if(countdown > 0) {
		if(count == 1000) {
			countdown--;
			count = 0;
			IOWR_ALTERA_AVALON_PIO_DATA(SEVEN_SEG_0_BASE,numbers[countdown]);
		}
	} else {
		IOWR_ALTERA_AVALON_PIO_DATA(RED_LEDS_BASE, 0);
	}


}

void init_hex_display(void) {
	IOWR_ALTERA_AVALON_PIO_DATA(SEVEN_SEG_0_BASE,numbers[0]);
	IOWR_ALTERA_AVALON_PIO_DATA(SEVEN_SEG_1_BASE,numbers[0]);
	IOWR_ALTERA_AVALON_PIO_DATA(SEVEN_SEG_2_BASE,numbers[0]);
	IOWR_ALTERA_AVALON_PIO_DATA(SEVEN_SEG_3_BASE,numbers[0]);
	IOWR_ALTERA_AVALON_PIO_DATA(SEVEN_SEG_4_BASE,numbers[0]);
	IOWR_ALTERA_AVALON_PIO_DATA(SEVEN_SEG_5_BASE,numbers[0]);

}


alt_up_char_buffer_dev* init_char_buffer(alt_up_char_buffer_dev* char_buffer) {
	alt_up_char_buffer_init(char_buffer);
	char_buffer = alt_up_char_buffer_open_dev(SUBSYSTEM_0_VGA_CHAR_BUFFER_AVALON_CHAR_BUFFER_SLAVE_NAME);

	return char_buffer;
}
