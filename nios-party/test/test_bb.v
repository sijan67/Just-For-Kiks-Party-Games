
module test (
	audio_ADCDAT,
	audio_ADCLRCK,
	audio_BCLK,
	audio_DACDAT,
	audio_DACLRCK,
	audio_clk_clk,
	button_1_export,
	button_2_export,
	clk_clk,
	reset_reset_n,
	rs232_RXD,
	rs232_TXD,
	sdram_addr,
	sdram_ba,
	sdram_cas_n,
	sdram_cke,
	sdram_cs_n,
	sdram_dq,
	sdram_dqm,
	sdram_ras_n,
	sdram_we_n,
	sdram_clk_clk,
	vga_CLK,
	vga_HS,
	vga_VS,
	vga_BLANK,
	vga_SYNC,
	vga_R,
	vga_G,
	vga_B,
	io_acknowledge,
	io_irq,
	io_address,
	io_bus_enable,
	io_byte_enable,
	io_rw,
	io_write_data,
	io_read_data);	

	input		audio_ADCDAT;
	input		audio_ADCLRCK;
	input		audio_BCLK;
	output		audio_DACDAT;
	input		audio_DACLRCK;
	output		audio_clk_clk;
	input		button_1_export;
	input		button_2_export;
	input		clk_clk;
	input		reset_reset_n;
	input		rs232_RXD;
	output		rs232_TXD;
	output	[12:0]	sdram_addr;
	output	[1:0]	sdram_ba;
	output		sdram_cas_n;
	output		sdram_cke;
	output		sdram_cs_n;
	inout	[15:0]	sdram_dq;
	output	[1:0]	sdram_dqm;
	output		sdram_ras_n;
	output		sdram_we_n;
	output		sdram_clk_clk;
	output		vga_CLK;
	output		vga_HS;
	output		vga_VS;
	output		vga_BLANK;
	output		vga_SYNC;
	output	[7:0]	vga_R;
	output	[7:0]	vga_G;
	output	[7:0]	vga_B;
	input		io_acknowledge;
	input		io_irq;
	output	[15:0]	io_address;
	output		io_bus_enable;
	output	[1:0]	io_byte_enable;
	output		io_rw;
	output	[15:0]	io_write_data;
	input	[15:0]	io_read_data;
endmodule
