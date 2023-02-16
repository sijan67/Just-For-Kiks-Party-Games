/*********************************************************
 * Example
 *****************************************************/

#include <stdio.h>
#include <math.h>
#include <stdbool.h>
#include <system.h>
#include <sys/alt_irq.h>
#include <altera_avalon_timer_regs.h>
#include <altera_avalon_pio_regs.h>

// Function Declaration
void init_timer_interrupt( void );
static void timer_isr( void * context, alt_u32 id );
void init_hex_display(void);
alt_up_pixel_buffer_dma_dev* pixel_buffer;
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


int main( void )
{
	printf("Hello from NIOS II!\n");
	printf("This is an interrupt example\n");

	// Enable the timer
	init_timer_interrupt();
	init_hex_display();
	pixel_buffer = alt_up_pixel_buffer_dma_open_dev(VGA_SUBSYSTEM_VGA_PIXEL_DMA_NAME);
	if(pixel_buffer == NULL) {
		printf("Error: could not open pixel buffer device");
	} else {
		printf("Opened pixel buffer device");
	}

	alt_up_pixel_buffer_dma_clear_screen(pixel_buffer, 0);

	while(1){
		if(countdown == 0) {
			if(IORD_ALTERA_AVALON_PIO_DATA(KEY_3_BASE)){
				IOWR_ALTERA_AVALON_PIO_DATA(RED_LEDS_BASE, 240);
				alt_up_pixel_buffer_dma_draw_box(pixel_buffer, 20, 20, 620, 460, 0xF800); // Display Red box
				countdown = 5;
			} else if(IORD_ALTERA_AVALON_PIO_DATA(KEY_2_BASE)) {
				IOWR_ALTERA_AVALON_PIO_DATA(RED_LEDS_BASE, 15);
				alt_up_pixel_buffer_dma_draw_box(pixel_buffer, 20, 20, 620, 460, 0x07E0); // Display Green Box
				countdown = 5;
			}
		}
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
	static int count = 0;
	static int countdown = 0;
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

