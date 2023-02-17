/*
 * system.h - SOPC Builder system and BSP software package information
 *
 * Machine generated for CPU 'NIOSII' in SOPC Builder design 'System'
 * SOPC Builder design path: ../../System.sopcinfo
 *
 * Generated: Thu Feb 16 09:30:43 PST 2023
 */

/*
 * DO NOT MODIFY THIS FILE
 *
 * Changing this file will have subtle consequences
 * which will almost certainly lead to a nonfunctioning
 * system. If you do modify this file, be aware that your
 * changes will be overwritten and lost when this file
 * is generated again.
 *
 * DO NOT MODIFY THIS FILE
 */

/*
 * License Agreement
 *
 * Copyright (c) 2008
 * Altera Corporation, San Jose, California, USA.
 * All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * This agreement shall be governed in all respects by the laws of the State
 * of California and by the laws of the United States of America.
 */

#ifndef __SYSTEM_H_
#define __SYSTEM_H_

/* Include definitions from linker script generator */
#include "linker.h"


/*
 * CPU configuration
 *
 */

#define ALT_CPU_ARCHITECTURE "altera_nios2_gen2"
#define ALT_CPU_BIG_ENDIAN 0
#define ALT_CPU_BREAK_ADDR 0x00040820
#define ALT_CPU_CPU_ARCH_NIOS2_R1
#define ALT_CPU_CPU_FREQ 50000000u
#define ALT_CPU_CPU_ID_SIZE 1
#define ALT_CPU_CPU_ID_VALUE 0x00000000
#define ALT_CPU_CPU_IMPLEMENTATION "fast"
#define ALT_CPU_DATA_ADDR_WIDTH 0x13
#define ALT_CPU_DCACHE_BYPASS_MASK 0x80000000
#define ALT_CPU_DCACHE_LINE_SIZE 32
#define ALT_CPU_DCACHE_LINE_SIZE_LOG2 5
#define ALT_CPU_DCACHE_SIZE 2048
#define ALT_CPU_EXCEPTION_ADDR 0x00020020
#define ALT_CPU_FLASH_ACCELERATOR_LINES 0
#define ALT_CPU_FLASH_ACCELERATOR_LINE_SIZE 0
#define ALT_CPU_FLUSHDA_SUPPORTED
#define ALT_CPU_FREQ 50000000
#define ALT_CPU_HARDWARE_DIVIDE_PRESENT 0
#define ALT_CPU_HARDWARE_MULTIPLY_PRESENT 1
#define ALT_CPU_HARDWARE_MULX_PRESENT 0
#define ALT_CPU_HAS_DEBUG_CORE 1
#define ALT_CPU_HAS_DEBUG_STUB
#define ALT_CPU_HAS_EXTRA_EXCEPTION_INFO
#define ALT_CPU_HAS_ILLEGAL_INSTRUCTION_EXCEPTION
#define ALT_CPU_HAS_JMPI_INSTRUCTION
#define ALT_CPU_ICACHE_LINE_SIZE 32
#define ALT_CPU_ICACHE_LINE_SIZE_LOG2 5
#define ALT_CPU_ICACHE_SIZE 4096
#define ALT_CPU_INITDA_SUPPORTED
#define ALT_CPU_INST_ADDR_WIDTH 0x13
#define ALT_CPU_NAME "NIOSII"
#define ALT_CPU_NUM_OF_SHADOW_REG_SETS 0
#define ALT_CPU_OCI_VERSION 1
#define ALT_CPU_RESET_ADDR 0x00020000


/*
 * CPU configuration (with legacy prefix - don't use these anymore)
 *
 */

#define NIOS2_BIG_ENDIAN 0
#define NIOS2_BREAK_ADDR 0x00040820
#define NIOS2_CPU_ARCH_NIOS2_R1
#define NIOS2_CPU_FREQ 50000000u
#define NIOS2_CPU_ID_SIZE 1
#define NIOS2_CPU_ID_VALUE 0x00000000
#define NIOS2_CPU_IMPLEMENTATION "fast"
#define NIOS2_DATA_ADDR_WIDTH 0x13
#define NIOS2_DCACHE_BYPASS_MASK 0x80000000
#define NIOS2_DCACHE_LINE_SIZE 32
#define NIOS2_DCACHE_LINE_SIZE_LOG2 5
#define NIOS2_DCACHE_SIZE 2048
#define NIOS2_EXCEPTION_ADDR 0x00020020
#define NIOS2_FLASH_ACCELERATOR_LINES 0
#define NIOS2_FLASH_ACCELERATOR_LINE_SIZE 0
#define NIOS2_FLUSHDA_SUPPORTED
#define NIOS2_HARDWARE_DIVIDE_PRESENT 0
#define NIOS2_HARDWARE_MULTIPLY_PRESENT 1
#define NIOS2_HARDWARE_MULX_PRESENT 0
#define NIOS2_HAS_DEBUG_CORE 1
#define NIOS2_HAS_DEBUG_STUB
#define NIOS2_HAS_EXTRA_EXCEPTION_INFO
#define NIOS2_HAS_ILLEGAL_INSTRUCTION_EXCEPTION
#define NIOS2_HAS_JMPI_INSTRUCTION
#define NIOS2_ICACHE_LINE_SIZE 32
#define NIOS2_ICACHE_LINE_SIZE_LOG2 5
#define NIOS2_ICACHE_SIZE 4096
#define NIOS2_INITDA_SUPPORTED
#define NIOS2_INST_ADDR_WIDTH 0x13
#define NIOS2_NUM_OF_SHADOW_REG_SETS 0
#define NIOS2_OCI_VERSION 1
#define NIOS2_RESET_ADDR 0x00020000


/*
 * Define for each module class mastered by the CPU
 *
 */

#define __ALTERA_AVALON_JTAG_UART
#define __ALTERA_AVALON_ONCHIP_MEMORY2
#define __ALTERA_AVALON_PIO
#define __ALTERA_AVALON_TIMER
#define __ALTERA_NIOS2_GEN2


/*
 * JTAG configuration
 *
 */

#define ALT_MODULE_CLASS_JTAG altera_avalon_jtag_uart
#define JTAG_BASE 0x410e0
#define JTAG_IRQ 0
#define JTAG_IRQ_INTERRUPT_CONTROLLER_ID 0
#define JTAG_NAME "/dev/JTAG"
#define JTAG_READ_DEPTH 64
#define JTAG_READ_THRESHOLD 8
#define JTAG_SPAN 8
#define JTAG_TYPE "altera_avalon_jtag_uart"
#define JTAG_WRITE_DEPTH 64
#define JTAG_WRITE_THRESHOLD 8


/*
 * SDRAM configuration
 *
 */

#define ALT_MODULE_CLASS_SDRAM altera_avalon_onchip_memory2
#define SDRAM_ALLOW_IN_SYSTEM_MEMORY_CONTENT_EDITOR 0
#define SDRAM_ALLOW_MRAM_SIM_CONTENTS_ONLY_FILE 0
#define SDRAM_BASE 0x20000
#define SDRAM_CONTENTS_INFO ""
#define SDRAM_DUAL_PORT 0
#define SDRAM_GUI_RAM_BLOCK_TYPE "AUTO"
#define SDRAM_INIT_CONTENTS_FILE "System_SDRAM"
#define SDRAM_INIT_MEM_CONTENT 1
#define SDRAM_INSTANCE_ID "NONE"
#define SDRAM_IRQ -1
#define SDRAM_IRQ_INTERRUPT_CONTROLLER_ID -1
#define SDRAM_NAME "/dev/SDRAM"
#define SDRAM_NON_DEFAULT_INIT_FILE_ENABLED 0
#define SDRAM_RAM_BLOCK_TYPE "AUTO"
#define SDRAM_READ_DURING_WRITE_MODE "DONT_CARE"
#define SDRAM_SINGLE_CLOCK_OP 0
#define SDRAM_SIZE_MULTIPLE 1
#define SDRAM_SIZE_VALUE 81920
#define SDRAM_SPAN 81920
#define SDRAM_TYPE "altera_avalon_onchip_memory2"
#define SDRAM_WRITABLE 1


/*
 * System configuration
 *
 */

#define ALT_DEVICE_FAMILY "Cyclone V"
#define ALT_ENHANCED_INTERRUPT_API_PRESENT
#define ALT_IRQ_BASE NULL
#define ALT_LOG_PORT "/dev/null"
#define ALT_LOG_PORT_BASE 0x0
#define ALT_LOG_PORT_DEV null
#define ALT_LOG_PORT_TYPE ""
#define ALT_NUM_EXTERNAL_INTERRUPT_CONTROLLERS 0
#define ALT_NUM_INTERNAL_INTERRUPT_CONTROLLERS 1
#define ALT_NUM_INTERRUPT_CONTROLLERS 1
#define ALT_STDERR "/dev/JTAG"
#define ALT_STDERR_BASE 0x410e0
#define ALT_STDERR_DEV JTAG
#define ALT_STDERR_IS_JTAG_UART
#define ALT_STDERR_PRESENT
#define ALT_STDERR_TYPE "altera_avalon_jtag_uart"
#define ALT_STDIN "/dev/JTAG"
#define ALT_STDIN_BASE 0x410e0
#define ALT_STDIN_DEV JTAG
#define ALT_STDIN_IS_JTAG_UART
#define ALT_STDIN_PRESENT
#define ALT_STDIN_TYPE "altera_avalon_jtag_uart"
#define ALT_STDOUT "/dev/JTAG"
#define ALT_STDOUT_BASE 0x410e0
#define ALT_STDOUT_DEV JTAG
#define ALT_STDOUT_IS_JTAG_UART
#define ALT_STDOUT_PRESENT
#define ALT_STDOUT_TYPE "altera_avalon_jtag_uart"
#define ALT_SYSTEM_NAME "System"


/*
 * Timer configuration
 *
 */

#define ALT_MODULE_CLASS_Timer altera_avalon_timer
#define TIMER_ALWAYS_RUN 0
#define TIMER_BASE 0x41000
#define TIMER_COUNTER_SIZE 32
#define TIMER_FIXED_PERIOD 0
#define TIMER_FREQ 50000000
#define TIMER_IRQ 2
#define TIMER_IRQ_INTERRUPT_CONTROLLER_ID 0
#define TIMER_LOAD_VALUE 49999
#define TIMER_MULT 0.001
#define TIMER_NAME "/dev/Timer"
#define TIMER_PERIOD 1
#define TIMER_PERIOD_UNITS "ms"
#define TIMER_RESET_OUTPUT 0
#define TIMER_SNAPSHOT 1
#define TIMER_SPAN 32
#define TIMER_TICKS_PER_SEC 1000
#define TIMER_TIMEOUT_PULSE_OUTPUT 0
#define TIMER_TYPE "altera_avalon_timer"


/*
 * hal configuration
 *
 */

#define ALT_INCLUDE_INSTRUCTION_RELATED_EXCEPTION_API
#define ALT_MAX_FD 32
#define ALT_SYS_CLK TIMER
#define ALT_TIMESTAMP_CLK none


/*
 * key_0 configuration
 *
 */

#define ALT_MODULE_CLASS_key_0 altera_avalon_pio
#define KEY_0_BASE 0x410b0
#define KEY_0_BIT_CLEARING_EDGE_REGISTER 0
#define KEY_0_BIT_MODIFYING_OUTPUT_REGISTER 0
#define KEY_0_CAPTURE 1
#define KEY_0_DATA_WIDTH 1
#define KEY_0_DO_TEST_BENCH_WIRING 0
#define KEY_0_DRIVEN_SIM_VALUE 0
#define KEY_0_EDGE_TYPE "FALLING"
#define KEY_0_FREQ 50000000
#define KEY_0_HAS_IN 1
#define KEY_0_HAS_OUT 0
#define KEY_0_HAS_TRI 0
#define KEY_0_IRQ 1
#define KEY_0_IRQ_INTERRUPT_CONTROLLER_ID 0
#define KEY_0_IRQ_TYPE "LEVEL"
#define KEY_0_NAME "/dev/key_0"
#define KEY_0_RESET_VALUE 0
#define KEY_0_SPAN 16
#define KEY_0_TYPE "altera_avalon_pio"


/*
 * key_1 configuration
 *
 */

#define ALT_MODULE_CLASS_key_1 altera_avalon_pio
#define KEY_1_BASE 0x41040
#define KEY_1_BIT_CLEARING_EDGE_REGISTER 0
#define KEY_1_BIT_MODIFYING_OUTPUT_REGISTER 0
#define KEY_1_CAPTURE 1
#define KEY_1_DATA_WIDTH 1
#define KEY_1_DO_TEST_BENCH_WIRING 0
#define KEY_1_DRIVEN_SIM_VALUE 0
#define KEY_1_EDGE_TYPE "FALLING"
#define KEY_1_FREQ 50000000
#define KEY_1_HAS_IN 1
#define KEY_1_HAS_OUT 0
#define KEY_1_HAS_TRI 0
#define KEY_1_IRQ 3
#define KEY_1_IRQ_INTERRUPT_CONTROLLER_ID 0
#define KEY_1_IRQ_TYPE "LEVEL"
#define KEY_1_NAME "/dev/key_1"
#define KEY_1_RESET_VALUE 0
#define KEY_1_SPAN 16
#define KEY_1_TYPE "altera_avalon_pio"


/*
 * key_2 configuration
 *
 */

#define ALT_MODULE_CLASS_key_2 altera_avalon_pio
#define KEY_2_BASE 0x41030
#define KEY_2_BIT_CLEARING_EDGE_REGISTER 0
#define KEY_2_BIT_MODIFYING_OUTPUT_REGISTER 0
#define KEY_2_CAPTURE 1
#define KEY_2_DATA_WIDTH 1
#define KEY_2_DO_TEST_BENCH_WIRING 0
#define KEY_2_DRIVEN_SIM_VALUE 0
#define KEY_2_EDGE_TYPE "FALLING"
#define KEY_2_FREQ 50000000
#define KEY_2_HAS_IN 1
#define KEY_2_HAS_OUT 0
#define KEY_2_HAS_TRI 0
#define KEY_2_IRQ 4
#define KEY_2_IRQ_INTERRUPT_CONTROLLER_ID 0
#define KEY_2_IRQ_TYPE "LEVEL"
#define KEY_2_NAME "/dev/key_2"
#define KEY_2_RESET_VALUE 0
#define KEY_2_SPAN 16
#define KEY_2_TYPE "altera_avalon_pio"


/*
 * key_3 configuration
 *
 */

#define ALT_MODULE_CLASS_key_3 altera_avalon_pio
#define KEY_3_BASE 0x41020
#define KEY_3_BIT_CLEARING_EDGE_REGISTER 0
#define KEY_3_BIT_MODIFYING_OUTPUT_REGISTER 0
#define KEY_3_CAPTURE 1
#define KEY_3_DATA_WIDTH 1
#define KEY_3_DO_TEST_BENCH_WIRING 0
#define KEY_3_DRIVEN_SIM_VALUE 0
#define KEY_3_EDGE_TYPE "FALLING"
#define KEY_3_FREQ 50000000
#define KEY_3_HAS_IN 1
#define KEY_3_HAS_OUT 0
#define KEY_3_HAS_TRI 0
#define KEY_3_IRQ 5
#define KEY_3_IRQ_INTERRUPT_CONTROLLER_ID 0
#define KEY_3_IRQ_TYPE "LEVEL"
#define KEY_3_NAME "/dev/key_3"
#define KEY_3_RESET_VALUE 0
#define KEY_3_SPAN 16
#define KEY_3_TYPE "altera_avalon_pio"


/*
 * red_leds configuration
 *
 */

#define ALT_MODULE_CLASS_red_leds altera_avalon_pio
#define RED_LEDS_BASE 0x410d0
#define RED_LEDS_BIT_CLEARING_EDGE_REGISTER 0
#define RED_LEDS_BIT_MODIFYING_OUTPUT_REGISTER 0
#define RED_LEDS_CAPTURE 0
#define RED_LEDS_DATA_WIDTH 10
#define RED_LEDS_DO_TEST_BENCH_WIRING 0
#define RED_LEDS_DRIVEN_SIM_VALUE 0
#define RED_LEDS_EDGE_TYPE "NONE"
#define RED_LEDS_FREQ 50000000
#define RED_LEDS_HAS_IN 0
#define RED_LEDS_HAS_OUT 1
#define RED_LEDS_HAS_TRI 0
#define RED_LEDS_IRQ -1
#define RED_LEDS_IRQ_INTERRUPT_CONTROLLER_ID -1
#define RED_LEDS_IRQ_TYPE "NONE"
#define RED_LEDS_NAME "/dev/red_leds"
#define RED_LEDS_RESET_VALUE 0
#define RED_LEDS_SPAN 16
#define RED_LEDS_TYPE "altera_avalon_pio"


/*
 * seven_seg_0 configuration
 *
 */

#define ALT_MODULE_CLASS_seven_seg_0 altera_avalon_pio
#define SEVEN_SEG_0_BASE 0x410a0
#define SEVEN_SEG_0_BIT_CLEARING_EDGE_REGISTER 0
#define SEVEN_SEG_0_BIT_MODIFYING_OUTPUT_REGISTER 0
#define SEVEN_SEG_0_CAPTURE 0
#define SEVEN_SEG_0_DATA_WIDTH 7
#define SEVEN_SEG_0_DO_TEST_BENCH_WIRING 0
#define SEVEN_SEG_0_DRIVEN_SIM_VALUE 0
#define SEVEN_SEG_0_EDGE_TYPE "NONE"
#define SEVEN_SEG_0_FREQ 50000000
#define SEVEN_SEG_0_HAS_IN 0
#define SEVEN_SEG_0_HAS_OUT 1
#define SEVEN_SEG_0_HAS_TRI 0
#define SEVEN_SEG_0_IRQ -1
#define SEVEN_SEG_0_IRQ_INTERRUPT_CONTROLLER_ID -1
#define SEVEN_SEG_0_IRQ_TYPE "NONE"
#define SEVEN_SEG_0_NAME "/dev/seven_seg_0"
#define SEVEN_SEG_0_RESET_VALUE 0
#define SEVEN_SEG_0_SPAN 16
#define SEVEN_SEG_0_TYPE "altera_avalon_pio"


/*
 * seven_seg_1 configuration
 *
 */

#define ALT_MODULE_CLASS_seven_seg_1 altera_avalon_pio
#define SEVEN_SEG_1_BASE 0x41090
#define SEVEN_SEG_1_BIT_CLEARING_EDGE_REGISTER 0
#define SEVEN_SEG_1_BIT_MODIFYING_OUTPUT_REGISTER 0
#define SEVEN_SEG_1_CAPTURE 0
#define SEVEN_SEG_1_DATA_WIDTH 7
#define SEVEN_SEG_1_DO_TEST_BENCH_WIRING 0
#define SEVEN_SEG_1_DRIVEN_SIM_VALUE 0
#define SEVEN_SEG_1_EDGE_TYPE "NONE"
#define SEVEN_SEG_1_FREQ 50000000
#define SEVEN_SEG_1_HAS_IN 0
#define SEVEN_SEG_1_HAS_OUT 1
#define SEVEN_SEG_1_HAS_TRI 0
#define SEVEN_SEG_1_IRQ -1
#define SEVEN_SEG_1_IRQ_INTERRUPT_CONTROLLER_ID -1
#define SEVEN_SEG_1_IRQ_TYPE "NONE"
#define SEVEN_SEG_1_NAME "/dev/seven_seg_1"
#define SEVEN_SEG_1_RESET_VALUE 0
#define SEVEN_SEG_1_SPAN 16
#define SEVEN_SEG_1_TYPE "altera_avalon_pio"


/*
 * seven_seg_2 configuration
 *
 */

#define ALT_MODULE_CLASS_seven_seg_2 altera_avalon_pio
#define SEVEN_SEG_2_BASE 0x41080
#define SEVEN_SEG_2_BIT_CLEARING_EDGE_REGISTER 0
#define SEVEN_SEG_2_BIT_MODIFYING_OUTPUT_REGISTER 0
#define SEVEN_SEG_2_CAPTURE 0
#define SEVEN_SEG_2_DATA_WIDTH 7
#define SEVEN_SEG_2_DO_TEST_BENCH_WIRING 0
#define SEVEN_SEG_2_DRIVEN_SIM_VALUE 0
#define SEVEN_SEG_2_EDGE_TYPE "NONE"
#define SEVEN_SEG_2_FREQ 50000000
#define SEVEN_SEG_2_HAS_IN 0
#define SEVEN_SEG_2_HAS_OUT 1
#define SEVEN_SEG_2_HAS_TRI 0
#define SEVEN_SEG_2_IRQ -1
#define SEVEN_SEG_2_IRQ_INTERRUPT_CONTROLLER_ID -1
#define SEVEN_SEG_2_IRQ_TYPE "NONE"
#define SEVEN_SEG_2_NAME "/dev/seven_seg_2"
#define SEVEN_SEG_2_RESET_VALUE 0
#define SEVEN_SEG_2_SPAN 16
#define SEVEN_SEG_2_TYPE "altera_avalon_pio"


/*
 * seven_seg_3 configuration
 *
 */

#define ALT_MODULE_CLASS_seven_seg_3 altera_avalon_pio
#define SEVEN_SEG_3_BASE 0x41070
#define SEVEN_SEG_3_BIT_CLEARING_EDGE_REGISTER 0
#define SEVEN_SEG_3_BIT_MODIFYING_OUTPUT_REGISTER 0
#define SEVEN_SEG_3_CAPTURE 0
#define SEVEN_SEG_3_DATA_WIDTH 7
#define SEVEN_SEG_3_DO_TEST_BENCH_WIRING 0
#define SEVEN_SEG_3_DRIVEN_SIM_VALUE 0
#define SEVEN_SEG_3_EDGE_TYPE "NONE"
#define SEVEN_SEG_3_FREQ 50000000
#define SEVEN_SEG_3_HAS_IN 0
#define SEVEN_SEG_3_HAS_OUT 1
#define SEVEN_SEG_3_HAS_TRI 0
#define SEVEN_SEG_3_IRQ -1
#define SEVEN_SEG_3_IRQ_INTERRUPT_CONTROLLER_ID -1
#define SEVEN_SEG_3_IRQ_TYPE "NONE"
#define SEVEN_SEG_3_NAME "/dev/seven_seg_3"
#define SEVEN_SEG_3_RESET_VALUE 0
#define SEVEN_SEG_3_SPAN 16
#define SEVEN_SEG_3_TYPE "altera_avalon_pio"


/*
 * seven_seg_4 configuration
 *
 */

#define ALT_MODULE_CLASS_seven_seg_4 altera_avalon_pio
#define SEVEN_SEG_4_BASE 0x41060
#define SEVEN_SEG_4_BIT_CLEARING_EDGE_REGISTER 0
#define SEVEN_SEG_4_BIT_MODIFYING_OUTPUT_REGISTER 0
#define SEVEN_SEG_4_CAPTURE 0
#define SEVEN_SEG_4_DATA_WIDTH 7
#define SEVEN_SEG_4_DO_TEST_BENCH_WIRING 0
#define SEVEN_SEG_4_DRIVEN_SIM_VALUE 0
#define SEVEN_SEG_4_EDGE_TYPE "NONE"
#define SEVEN_SEG_4_FREQ 50000000
#define SEVEN_SEG_4_HAS_IN 0
#define SEVEN_SEG_4_HAS_OUT 1
#define SEVEN_SEG_4_HAS_TRI 0
#define SEVEN_SEG_4_IRQ -1
#define SEVEN_SEG_4_IRQ_INTERRUPT_CONTROLLER_ID -1
#define SEVEN_SEG_4_IRQ_TYPE "NONE"
#define SEVEN_SEG_4_NAME "/dev/seven_seg_4"
#define SEVEN_SEG_4_RESET_VALUE 0
#define SEVEN_SEG_4_SPAN 16
#define SEVEN_SEG_4_TYPE "altera_avalon_pio"


/*
 * seven_seg_5 configuration
 *
 */

#define ALT_MODULE_CLASS_seven_seg_5 altera_avalon_pio
#define SEVEN_SEG_5_BASE 0x41050
#define SEVEN_SEG_5_BIT_CLEARING_EDGE_REGISTER 0
#define SEVEN_SEG_5_BIT_MODIFYING_OUTPUT_REGISTER 0
#define SEVEN_SEG_5_CAPTURE 0
#define SEVEN_SEG_5_DATA_WIDTH 7
#define SEVEN_SEG_5_DO_TEST_BENCH_WIRING 0
#define SEVEN_SEG_5_DRIVEN_SIM_VALUE 0
#define SEVEN_SEG_5_EDGE_TYPE "NONE"
#define SEVEN_SEG_5_FREQ 50000000
#define SEVEN_SEG_5_HAS_IN 0
#define SEVEN_SEG_5_HAS_OUT 1
#define SEVEN_SEG_5_HAS_TRI 0
#define SEVEN_SEG_5_IRQ -1
#define SEVEN_SEG_5_IRQ_INTERRUPT_CONTROLLER_ID -1
#define SEVEN_SEG_5_IRQ_TYPE "NONE"
#define SEVEN_SEG_5_NAME "/dev/seven_seg_5"
#define SEVEN_SEG_5_RESET_VALUE 0
#define SEVEN_SEG_5_SPAN 16
#define SEVEN_SEG_5_TYPE "altera_avalon_pio"


/*
 * switches configuration
 *
 */

#define ALT_MODULE_CLASS_switches altera_avalon_pio
#define SWITCHES_BASE 0x410c0
#define SWITCHES_BIT_CLEARING_EDGE_REGISTER 0
#define SWITCHES_BIT_MODIFYING_OUTPUT_REGISTER 0
#define SWITCHES_CAPTURE 0
#define SWITCHES_DATA_WIDTH 10
#define SWITCHES_DO_TEST_BENCH_WIRING 0
#define SWITCHES_DRIVEN_SIM_VALUE 0
#define SWITCHES_EDGE_TYPE "NONE"
#define SWITCHES_FREQ 50000000
#define SWITCHES_HAS_IN 1
#define SWITCHES_HAS_OUT 0
#define SWITCHES_HAS_TRI 0
#define SWITCHES_IRQ -1
#define SWITCHES_IRQ_INTERRUPT_CONTROLLER_ID -1
#define SWITCHES_IRQ_TYPE "NONE"
#define SWITCHES_NAME "/dev/switches"
#define SWITCHES_RESET_VALUE 0
#define SWITCHES_SPAN 16
#define SWITCHES_TYPE "altera_avalon_pio"

#endif /* __SYSTEM_H_ */
