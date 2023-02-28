module partyBox(
   input CLOCK_50,
	input CLOCK2_50,
	input [3:0] KEY,
	input [9:0] SW,
	output [9:0] LEDR,
	output [6:0] HEX0,
	output [6:0] HEX1,
	output [6:0] HEX2,
	output [6:0] HEX3,
	output [6:0] HEX4,
	output [6:0] HEX5,
	
	output [12:0] DRAM_ADDR,
	output        DRAM_CLK,
	output DRAM_CKE,		
	output [1:0] DRAM_BA,
	output	DRAM_CS_N, 
	output DRAM_CAS_N, 
	output	DRAM_RAS_N, 
	output DRAM_WE_N,	
	inout [15:0]	DRAM_DQ,	
	output	DRAM_UDQM, 
	output DRAM_LDQM, 

	output [7:0] VGA_R,
	output [7:0] VGA_G,
	output [7:0] VGA_B,
	output VGA_BLANK_N,
	output VGA_CLK,
	output VGA_HS,
	output VGA_SYNC_N,
	output VGA_VS
);


    /*nios u0 (
		.sdram_addr                 (DRAM_ADDR),                 //                sdram.addr
		.sdram_ba                   (DRAM_BA),                   //                     .ba
		.sdram_cas_n                (DRAM_CAS_N),                //                     .cas_n
		.sdram_cke                  (DRAM_CKE),                  //                     .cke
		.sdram_cs_n                 (DRAM_CS_N),                 //                     .cs_n
		.sdram_dq                   (DRAM_DQ),                   //                     .dq
		.sdram_dqm                  ({DRAM_UDQM, DRAM_LDQM}),                  //                     .dqm
		.sdram_ras_n                (DRAM_RAS_N),                //                     .ras_n
		.sdram_we_n                 (DRAM_WE_N),                 //                     .we_n
		.sdram_clk_clk              (DRAM_CLK),              //            sdram_clk.clk
		.system_pll_ref_clk_clk     (CLOCK_50),     //   system_pll_ref_clk.clk
		.system_pll_ref_reset_reset (1'b0), // system_pll_ref_reset.reset
		.vga_CLK                    (VGA_CLK),                    //                  vga.CLK
		.vga_HS                     (VGA_HS),                     //                     .HS
		.vga_VS                     (VGA_VS),                     //                     .VS
		.vga_BLANK                  (VGA_BLANK_N),                  //                     .BLANK
		.vga_SYNC                   (VGA_SYNC),                   //                     .SYNC
		.vga_R                      (VGA_R),                      //                     .R
		.vga_G                      (VGA_G),                      //                     .G
		.vga_B                      (VGA_B),                      //                     .B
		.vga_pll_ref_clk_clk        (CLOCK2_50),        //      vga_pll_ref_clk.clk
		.vga_pll_ref_reset_reset    (1'b0),    //    vga_pll_ref_reset.reset
		.buttons_export		(KEY),
		.red_leds_export    (LEDR),
		.seven_seg_0_export (HEX0),
		.seven_seg_1_export (HEX1),
		.seven_seg_2_export (HEX2),
		.seven_seg_3_export (HEX3),
		.seven_seg_4_export (HEX4),
		.seven_seg_5_export (HEX5),
		.switches_export    (SW)
		
	);*/
	
	test u0 (
		.clk_clk       (CLOCK_50),       //   clk.clk
		.reset_reset_n (1'b0), // reset.reset_n
		.sdram_addr    (DRAM_ADDR),    // sdram.addr
		.sdram_ba      (DRAM_BA),      //      .ba
		.sdram_cas_n   (DRAM_CAS_N),   //      .cas_n
		.sdram_cke     (DRAM_CKE),     //      .cke
		.sdram_cs_n    (DRAM_CS_N),    //      .cs_n
		.sdram_dq      (DRAM_DQ),      //      .dq
		.sdram_dqm     ({DRAM_UDQM, DRAM_LDQM}),     //      .dqm
		.sdram_ras_n   (DRAM_RAS_N),   //      .ras_n
		.sdram_we_n    (DRAM_WE_N),    //      .we_n
		.vga_CLK       (VGA_CLK),       //   vga.CLK
		.vga_HS        (VGA_HS),        //      .HS
		.vga_VS        (VGA_VS),        //      .VS
		.vga_BLANK     (VGA_BLANK_N),     //      .BLANK
		.vga_SYNC      (VGA_SYNC),      //      .SYNC
		.vga_R         (VGA_R),         //      .R
		.vga_G         (VGA_G),         //      .G
		.vga_B         (VGA_B)          //      .B
	);






endmodule