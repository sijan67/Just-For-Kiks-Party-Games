// nios_Subsystem_0_VGA_PLL.v

// This file was auto-generated from altera_up_avalon_video_pll_hw.tcl.  If you edit it your changes
// will probably be lost.
// 
// Generated using ACDS version 18.1 625

`timescale 1 ps / 1 ps
module nios_Subsystem_0_VGA_PLL (
		input  wire  ref_clk_clk,        //      ref_clk.clk
		input  wire  ref_reset_reset,    //    ref_reset.reset
		output wire  vga_clk_clk,        //      vga_clk.clk
		output wire  reset_source_reset  // reset_source.reset
	);

	wire    video_pll_locked_export; // video_pll:locked -> reset_from_locked:locked

	nios_Subsystem_0_VGA_PLL_video_pll video_pll (
		.refclk   (ref_clk_clk),             //  refclk.clk
		.rst      (ref_reset_reset),         //   reset.reset
		.outclk_0 (),                        // outclk0.clk
		.outclk_1 (vga_clk_clk),             // outclk1.clk
		.outclk_2 (),                        // outclk2.clk
		.locked   (video_pll_locked_export)  //  locked.export
	);

	altera_up_avalon_reset_from_locked_signal reset_from_locked (
		.reset  (reset_source_reset),      // reset_source.reset
		.locked (video_pll_locked_export)  //       locked.export
	);

endmodule
