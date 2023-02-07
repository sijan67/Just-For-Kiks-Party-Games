
module System (
	clk_clk,
	red_leds_export,
	reset_reset_n,
	seven_seg_0_export,
	seven_seg_1_export,
	seven_seg_2_export,
	seven_seg_3_export,
	seven_seg_4_export,
	seven_seg_5_export,
	switches_export,
	key_0_export,
	key_1_export,
	key_2_export,
	key_3_export);	

	input		clk_clk;
	output	[9:0]	red_leds_export;
	input		reset_reset_n;
	output	[6:0]	seven_seg_0_export;
	output	[6:0]	seven_seg_1_export;
	output	[6:0]	seven_seg_2_export;
	output	[6:0]	seven_seg_3_export;
	output	[6:0]	seven_seg_4_export;
	output	[6:0]	seven_seg_5_export;
	input	[9:0]	switches_export;
	input		key_0_export;
	input		key_1_export;
	input		key_2_export;
	input		key_3_export;
endmodule
