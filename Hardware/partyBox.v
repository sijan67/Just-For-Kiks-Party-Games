`define zero 	7'b1000000
`define one 	7'b1111001
`define two 	7'b0100100
`define three 	7'b0110000
`define four 	7'b0011001
`define five 	7'b0010010
`define six 	7'b0000010
`define seven 	7'b1111000
`define eight 	7'b0000000
`define nine 	7'b0010000

module partyBox(
	input CLOCK_50,
	input [3:0] KEY,
	input [9:0] SW,
	input [35:0] GPIO_1,
	output [9:0] LEDR,
	output [6:0] HEX0,
	output [6:0] HEX1,
	output [6:0] HEX2,
	output [6:0] HEX3,
	output [6:0] HEX4,
	output [6:0] HEX5
);

/*
	// KEY[3:0] will be replaced using a GPIO (external buttons)
	System u0(
		.clk_clk			(CLOCK_50),
		.key_0_export		(KEY[0]),
		.key_1_export		(KEY[1]),
		.key_2_export		(KEY[2]),
		.key_3_export		(KEY[3]),
		.red_leds_export	(LEDR),
		.reset_reset_n		(KEY[0]),
		.seven_seg_0_export	(HEX0),
		.seven_seg_1_export	(HEX1),
		.seven_seg_2_export	(HEX2),
		.seven_seg_3_export	(HEX3),
		.seven_seg_4_export	(HEX4),
		.seven_seg_5_export	(HEX5),
		.switches_export	(SW)
	);

*/

	reg [9:0] on = 10'b00000_00000;
	reg [28:0] counter = 25'b0;
	reg [6:0] display_count = `zero;
	reg count = 1'b1;
	assign LEDR = on;
	assign HEX0 = display_count;
	assign HEX1 = `zero;
	assign HEX2 = `zero;
	assign HEX3 = `zero;
	assign HEX4 = `zero;
	assign HEX5 = `zero;

	always @(posedge CLOCK_50) begin
		//if(GPIO_1) begin
		if(count) begin
			if(KEY[3] == 0) begin
				on <= 10'b11111_00000;
				count <= 1'b0;
				display_count = `five;
			end else if(KEY[2] == 0) begin
				on <= 10'b00000_11111;
				count <= 1'b0;
				display_count = `five;
			end
		end else begin

			counter <= counter + 1;
			if(counter == 28'd5000_0000) begin
				case(display_count)
					`one: 		display_count = `zero;
					`two: 		display_count = `one;
					`three: 	display_count = `two;
					`four: 		display_count = `three;
					`five: 		display_count = `four;
					default: 	display_count = `zero;
				endcase
				if(display_count == `zero) begin
					count <= 1'b1;
					on <= 10'b0;
				end
				counter <= 28'b0;
			end
		end
	end



endmodule
