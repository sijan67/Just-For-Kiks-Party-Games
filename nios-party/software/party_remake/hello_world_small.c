/*
 * "Small Hello World" example.
 *
 * This example prints 'Hello from Nios II' to the STDOUT stream. It runs on
 * the Nios II 'standard', 'full_featured', 'fast', and 'low_cost' example
 * designs. It requires a STDOUT  device in your system's hardware.
 *
 * The purpose of this example is to demonstrate the smallest possible Hello
 * World application, using the Nios II HAL library.  The memory footprint
 * of this hosted application is ~332 bytes by default using the standard
 * reference design.  For a more fully featured Hello World application
 * example, see the example titled "Hello World".
 *
 * The memory footprint of this example has been reduced by making the
 * following changes to the normal "Hello World" example.
 * Check in the Nios II Software Developers Manual for a more complete
 * description.
 *
 * In the SW Application project (small_hello_world):
 *
 *  - In the C/C++ Build page
 *
 *    - Set the Optimization Level to -Os
 *
 * In System Library project (small_hello_world_syslib):
 *  - In the C/C++ Build page
 *
 *    - Set the Optimization Level to -Os
 *
 *    - Define the preprocessor option ALT_NO_INSTRUCTION_EMULATION
 *      This removes software exception handling, which means that you cannot
 *      run code compiled for Nios II cpu with a hardware multiplier on a core
 *      without a the multiply unit. Check the Nios II Software Developers
 *      Manual for more details.
 *
 *  - In the System Library page:
 *    - Set Periodic system timer and Timestamp timer to none
 *      This prevents the automatic inclusion of the timer driver.
 *
 *    - Set Max file descriptors to 4
 *      This reduces the size of the file handle pool.
 *
 *    - Check Main function does not exit
 *    - Uncheck Clean exit (flush buffers)
 *      This removes the unneeded call to exit when main returns, since it
 *      won't.
 *
 *    - Check Don't use C++
 *      This builds without the C++ support code.
 *
 *    - Check Small C library
 *      This uses a reduced functionality C library, which lacks
 *      support for buffering, file IO, floating point and getch(), etc.
 *      Check the Nios II Software Developers Manual for a complete list.
 *
 *    - Check Reduced device drivers
 *      This uses reduced functionality drivers if they're available. For the
 *      standard design this means you get polled UART and JTAG UART drivers,
 *      no support for the LCD driver and you lose the ability to program
 *      CFI compliant flash devices.
 *
 *    - Check Access device drivers directly
 *      This bypasses the device file system to access device drivers directly.
 *      This eliminates the space required for the device file system services.
 *      It also provides a HAL version of libc services that access the drivers
 *      directly, further reducing space. Only a limited number of libc
 *      functions are available in this configuration.
 *
 *    - Use ALT versions of stdio routines:
 *
 *           Function                  Description
 *        ===============  =====================================
 *        alt_printf       Only supports %s, %x, and %c ( < 1 Kbyte)
 *        alt_putstr       Smaller overhead than puts with direct drivers
 *                         Note this function doesn't add a newline.
 *        alt_putchar      Smaller overhead than putchar with direct drivers
 *        alt_getchar      Smaller overhead than getchar with direct drivers
 *
 */

#include <stdio.h>
#include <math.h>
#include <stdbool.h>
#include <system.h>
#include <sys/alt_irq.h>
#include <sys/alt_stdio.h>
#include <altera_avalon_timer_regs.h>
#include <altera_avalon_pio_regs.h>
#include "altera_up_avalon_video_pixel_buffer_dma.h"
#include "altera_up_avalon_video_character_buffer_with_dma.h"

void init_room_setup();
void init_question_gameplay();
void button_trigger();
//void init_timer_interrupt( void );
//static void timer_isr( void * context, alt_u32 id );

alt_up_pixel_buffer_dma_dev* pixel_buffer;
alt_up_char_buffer_dev* char_buffer;
int team_one_score = 0;
int team_two_score = 0;
bool game_state = true;
char player_list[4][10];
int global_count = 0;
int current_count = 0;

#define BLACK   0x0000
#define BLUE    0x001F
#define RED     0xF800
#define GREEN   0x07E0
#define CYAN    0x07FF
#define MAGENTA 0xF81F
#define YELLOW  0xFFE0
#define WHITE   0xFFFF

int main() {
    //init_timer_interrupt();
    init_room_setup();
    init_question_gameplay();

    return 0;
}

void init_room_setup() {
    alt_putstr("Hello from Nios II!\n");

    pixel_buffer = alt_up_pixel_buffer_dma_open_dev("/dev/Pixel_Buffer");
    if(pixel_buffer == NULL) {
        alt_putstr("Error: could not open pixel buffer device\n");
    } else {
        alt_putstr("Opened pixel buffer device\n");
    }



    //alt_up_pixel_buffer_dma_clear_screen(pixel_buffer, 0);
    //usleep(1000000);
/*
    alt_up_char_buffer_clear(char_buffer);
    usleep(1000000);
    */
    alt_putstr("Displaying Colour\n");
    alt_up_pixel_buffer_dma_draw_box (pixel_buffer, 150, 100, 199, 149, RED, 0);

    char_buffer = alt_up_char_buffer_open_dev("/dev/Char_Buffer");

    if(char_buffer == NULL) {
        alt_putstr("Error: could not open char buffer device\n");
    } else {
        alt_putstr("Opened Char buffer device\n");
    }

    char text = 'X';
    char text_top_row[40] = "TriviaSoC:\0";
    char text_bottom_row[40] = "Please enter the Room Code:\0";
    /* output text message near the middle of the VGA monitor */
    while(alt_up_char_buffer_clear(char_buffer));
    alt_up_char_buffer_draw(char_buffer, text, 0, 0);
    alt_up_char_buffer_draw(char_buffer, text, 0, 59);
    alt_up_char_buffer_draw(char_buffer, text, 79, 0);
    alt_up_char_buffer_draw(char_buffer, text, 79, 59);
    alt_up_char_buffer_string(char_buffer, text_top_row, 20,20);
    alt_up_char_buffer_string(char_buffer, text_bottom_row, 40,40);

    bool game_start = false;
    int i = 0;
    while(!game_start) {
        if(i < 4) { // & API call from backend to grab name
            //player_list[i] = ""; // Name pulled from backend
            i++;
        }
    }

    // Add players into teams (backend should do this)
    // end program message
    printf ("Setup Complete \n");
}

void init_question_gameplay() {
    while(team_one_score < 1000 || team_two_score < 1000) {
        // Grab Question from API call
        //char text_top_row[40] = '';
        //alt_up_char_buffer_string(char_buffer, text_top_row, 20,20); // Display question
        button_trigger();

        // Enable Audio Reading
        // Send Audio to backend


    }
}
/*
 * int button_pressed = 0;
    // Add timer
    current_count = global_count;
    while(button_pressed != 0 || current_count + 10 > global_count) {
        if(IORD_ALTERA_AVALON_PIO_DATA(BUTTON_1_BASE)){
            //IOWR_ALTERA_AVALON_PIO_DATA(RED_LEDS_BASE, 240);
            //alt_up_pixel_buffer_dma_draw_box(pixel_buffer, 20, 20, 640, 480, 0xF800,0); // Display Red box
            button_pressed = 1;
        } else if(IORD_ALTERA_AVALON_PIO_DATA(BUTTON_2_BASE)) {
            //IOWR_ALTERA_AVALON_PIO_DATA(RED_LEDS_BASE, 15);
            //alt_up_pixel_buffer_dma_draw_box(pixel_buffer, 20, 20, 640, 480, 0x07E0,0); // Display Green Box
            button_pressed = 2;
        }
    }

    if(button_pressed != 0) {
        // Display timing end
    }
 */

void button_trigger() {
    int button_pressed = 0;

    current_count = global_count;
    while(button_pressed != 0 || current_count + 10 > global_count) {
    	if(IORD_ALTERA_AVALON_PIO_DATA(BUTTON_1_BASE)) {
    		button_pressed = 1;
    	}
    }

}

/*void init_timer_interrupt( void )
{
    // Register the ISR with HAL
	alt_ic_isr_register(TIMER_IRQ_INTERRUPT_CONTROLLER_ID, TIMER_IRQ, (void *)timer_isr, NULL, 0x0);
    // Start the timer
    IOWR_ALTERA_AVALON_TIMER_CONTROL(TIMER_0_BASE,
            ALTERA_AVALON_TIMER_CONTROL_CONT_MSK |
            ALTERA_AVALON_TIMER_CONTROL_START_MSK |
            ALTERA_AVALON_TIMER_CONTROL_ITO_MSK);
}

static void timer_isr(void * context, alt_u32 id) {
    IOWR_ALTERA_AVALON_TIMER_STATUS(TIMER_0_BASE, 0);
    global_count++;
}
*/
