
module System (
	clk_clk,
	key_0_export,
	key_1_export,
	key_2_export,
	key_3_export,
	red_leds_export,
	reset_reset_n,
	seven_seg_0_export,
	seven_seg_1_export,
	seven_seg_2_export,
	seven_seg_3_export,
	seven_seg_4_export,
	seven_seg_5_export,
	switches_export,
	aud_vid_SDAT,
	aud_vid_SCLK);	

	input		clk_clk;
	input		key_0_export;
	input		key_1_export;
	input		key_2_export;
	input		key_3_export;
	output	[9:0]	red_leds_export;
	input		reset_reset_n;
	output	[6:0]	seven_seg_0_export;
	output	[6:0]	seven_seg_1_export;
	output	[6:0]	seven_seg_2_export;
	output	[6:0]	seven_seg_3_export;
	output	[6:0]	seven_seg_4_export;
	output	[6:0]	seven_seg_5_export;
	input	[9:0]	switches_export;
	inout		aud_vid_SDAT;
	output		aud_vid_SCLK;
endmodule
