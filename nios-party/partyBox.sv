module partyBox(
    input CLOCK_50,
	input [3:0] KEY,
	input [9:0] SW,
	output [9:0] LEDR,
	output [6:0] HEX0,
	output [6:0] HEX1,
	output [6:0] HEX2,
	output [6:0] HEX3,
	output [6:0] HEX4,
	output [6:0] HEX5
);


    System u0 (
		.clk_clk            (CLOCK_50), 
		.key_0_export       (KEY[0]),
        .key_3_export       (KEY[3]),
		.key_2_export       (KEY[2]),
		.key_1_export       (KEY[1]),
		.red_leds_export    (LEDR),
		.reset_reset_n      (~KEY[0]),
		.seven_seg_0_export (HEX0),
		.seven_seg_1_export (HEX1),
		.seven_seg_2_export (HEX2),
		.seven_seg_3_export (HEX3),
		.seven_seg_4_export (HEX4),
		.seven_seg_5_export (HEX5),
		.switches_export    (SW)
		
	);






endmodule