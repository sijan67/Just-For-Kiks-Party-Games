
module nios (
	buttons_export,
	red_leds_export,
	sdram_addr,
	sdram_ba,
	sdram_cas_n,
	sdram_cke,
	sdram_cs_n,
	sdram_dq,
	sdram_dqm,
	sdram_ras_n,
	sdram_we_n,
	seven_seg_0_export,
	seven_seg_1_export,
	seven_seg_2_export,
	seven_seg_3_export,
	seven_seg_4_export,
	seven_seg_5_export,
	switches_export,
	vga_CLK,
	vga_HS,
	vga_VS,
	vga_BLANK,
	vga_SYNC,
	vga_R,
	vga_G,
	vga_B,
	vga_pll_ref_clk_clk,
	vga_pll_ref_reset_reset,
	sdram_clk_clk,
	system_pll_ref_reset_reset,
	system_pll_ref_clk_clk);	

	input	[3:0]	buttons_export;
	output	[9:0]	red_leds_export;
	output	[12:0]	sdram_addr;
	output	[1:0]	sdram_ba;
	output		sdram_cas_n;
	output		sdram_cke;
	output		sdram_cs_n;
	inout	[15:0]	sdram_dq;
	output	[1:0]	sdram_dqm;
	output		sdram_ras_n;
	output		sdram_we_n;
	output	[6:0]	seven_seg_0_export;
	output	[6:0]	seven_seg_1_export;
	output	[6:0]	seven_seg_2_export;
	output	[6:0]	seven_seg_3_export;
	output	[6:0]	seven_seg_4_export;
	output	[6:0]	seven_seg_5_export;
	input	[9:0]	switches_export;
	output		vga_CLK;
	output		vga_HS;
	output		vga_VS;
	output		vga_BLANK;
	output		vga_SYNC;
	output	[7:0]	vga_R;
	output	[7:0]	vga_G;
	output	[7:0]	vga_B;
	input		vga_pll_ref_clk_clk;
	input		vga_pll_ref_reset_reset;
	output		sdram_clk_clk;
	input		system_pll_ref_reset_reset;
	input		system_pll_ref_clk_clk;
endmodule
