module partyBox(
   input 		 CLOCK_50,
	input 		 CLOCK2_50,
	input  [3:0] KEY,
	input  [9:0] SW,
	output [9:0] LEDR,
	output [6:0] HEX0,
	output [6:0] HEX1,
	output [6:0] HEX2,
	output [6:0] HEX3,
	output [6:0] HEX4,
	output [6:0] HEX5,
	inout  [35:0] GPIO_1,
	
	output [12:0]DRAM_ADDR,
	output       DRAM_CLK,
	output 		 DRAM_CKE,		
	output [1:0] DRAM_BA,
	output		 DRAM_CS_N, 
	output 		 DRAM_CAS_N, 
	output		 DRAM_RAS_N, 
	output 		 DRAM_WE_N,	
	inout  [15:0]DRAM_DQ,	
	output 		 DRAM_UDQM, 
	output 		 DRAM_LDQM, 

	output [7:0] VGA_R,
	output [7:0] VGA_G,
	output [7:0] VGA_B,
	output 		 VGA_BLANK_N,
	output 		 VGA_CLK,
	output 		 VGA_HS,
	output 		 VGA_SYNC_N,
	output 		 VGA_VS,
	
	output 		 FPGA_I2C_SCLK,
	inout	 		 FPGA_I2C_SDAT,
	
	input	 		 AUD_ADCDAT,
	inout	 		 AUD_ADCLRCK,
	inout	 		 AUD_BCLK,
	output 		 AUD_DACDAT,
	inout	 		 AUD_DACLRCK,
	output 		 AUD_XCK,

	input	IO_acknowledge,
	input	IO_irq,
	output	[15:0] IO_address,
	output	IO_bus_enable,
	output	[1:0] IO_byte_enable,
	output	IO_rw,
	output	[15:0] IO_write_data,
	input	[15:0] IO_read_data
);
	
	test u0 (
		.clk_clk       (CLOCK_50),       //   clk.clk
		.reset_reset_n (KEY[0]), // reset.reset_n
		//.av_config_SCLK							(FPGA_I2C_SCLK),
		//.av_config_SDAT							(FPGA_I2C_SDAT),
		.sdram_addr    (DRAM_ADDR),    // sdram.addr
		.sdram_ba      (DRAM_BA),      //      .ba
		.sdram_cas_n   (DRAM_CAS_N),   //      .cas_n
		.sdram_cke     (DRAM_CKE),     //      .cke
		.sdram_cs_n    (DRAM_CS_N),    //      .cs_n
		.sdram_dq      (DRAM_DQ),      //      .dq
		.sdram_dqm     ({DRAM_UDQM, DRAM_LDQM}),     //      .dqm
		.sdram_ras_n   (DRAM_RAS_N),   //      .ras_n
		.sdram_we_n    (DRAM_WE_N),    //      .we_n
		.sdram_clk_clk (DRAM_CLK),
		.vga_CLK       (VGA_CLK),       //   vga.CLK
		.vga_HS        (VGA_HS),        //      .HS
		.vga_VS        (VGA_VS),        //      .VS
		.vga_BLANK     (VGA_BLANK_N),     //      .BLANK
		.vga_SYNC      (VGA_SYNC_N),      //      .SYNC
		.vga_R         (VGA_R),         //      .R
		.vga_G         (VGA_G),         //      .G
		.vga_B         (VGA_B),          //      .B
		.audio_clk_clk								(AUD_XCK),
		.audio_ADCDAT								(AUD_ADCDAT),
		.audio_ADCLRCK								(AUD_ADCLRCK),
		.audio_BCLK									(AUD_BCLK),
		.audio_DACDAT								(AUD_DACDAT),
		.audio_DACLRCK								(AUD_DACLRCK),
		.button_1_export							(KEY[3]),
		.button_2_export							(KEY[2]),
		.rs232_RXD       							(GPIO_1[33]),       //     rs232.RXD
		.rs232_TXD       							(GPIO_1[35])
		/*.io_acknowledge  (IO_acknowledge),  //        io.acknowledge
		.io_irq          (IO_irq),          //          .irq
		.io_address      (IO_address),      //          .address
		.io_bus_enable   (IO_bus_enable),   //          .bus_enable
		.io_byte_enable  (IO_byte_enable),  //          .byte_enable
		.io_rw           (IO_rw),           //          .rw
		.io_write_data   (IO_write_data),   //          .write_data
		.io_read_data    (IO_read_data)     // */
	);






endmodule