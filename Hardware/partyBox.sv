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

module partyBox(HEX0, HEX1, HEX2, HEX3, HEX4, HEX5, KEY, LEDR, SW,
					 CLOCK_50, VGA_R, VGA_G, VGA_B, VGA_BLANK_N, VGA_CLK, VGA_HS, VGA_SYNC_N, VGA_VS, GPIO_1);
	output logic [6:0] HEX0, HEX1, HEX2, HEX3, HEX4, HEX5;
	output logic [9:0] LEDR;
	input logic [3:0] KEY;
	input logic [9:0] SW;

	input CLOCK_50;
	output [7:0] VGA_R;
	output [7:0] VGA_G;
	output [7:0] VGA_B;
	output VGA_BLANK_N;
	output VGA_CLK;
	output VGA_HS;
	output VGA_SYNC_N;
	output VGA_VS;
	
	input [35:0] GPIO_1;

	logic reset;
	logic [9:0] x;
	logic [8:0] y;
	logic [7:0] red, green, blue;
	logic [23:0] colour = 23'b111_1111__111_1111__111_1111;
	
	video_driver #(.WIDTH(640), .HEIGHT(480))
		v1 (.CLOCK_50, .reset, .x, .y, .red, .green, .blue,
			 .VGA_R, .VGA_G, .VGA_B, .VGA_BLANK_N,
			 .VGA_CLK, .VGA_HS, .VGA_SYNC_N, .VGA_VS);
	
	assign {red,green,blue} = colour;
	assign reset = 0;

	reg [9:0] on = 10'b00000_00000;
	reg [28:0] counter = 25'b0;
	reg [6:0] display_count = `zero;
	reg count = 1'b0;
	assign LEDR = on;
	assign HEX0 = display_count;
	assign HEX1 = `zero;
	assign HEX2 = `zero;
	assign HEX3 = `zero;
	assign HEX4 = `zero;
	assign HEX5 = `zero;

	always @(posedge CLOCK_50) begin
		
		if(count) begin
			//if(~KEY[3]) begin
			if(~GPIO_1[0]) begin
				on <= 10'b11111_00000;
				count <= 1'b0;
				display_count <= `five;
				colour <= 23'b111_1111__000_0000__000_0000;
			end else if(~KEY[2]) begin
				on <= 10'b00000_11111;
				count <= 1'b0;
				display_count <= `five;
				colour <= 23'b000_0000__000_0000__111_1111;
			end
		end else begin
			counter = counter + 1;
			if(counter == 28'd5000_0000) begin
				case(display_count)
					`one: 		display_count <= `zero;
					`two: 		display_count <= `one;
					`three: 	display_count <= `two;
					`four: 		display_count <= `three;
					`five: 		display_count <= `four;
					default: 	display_count <= `zero;
				endcase
				if(display_count == `zero) begin
					count <= 1'b1;
					on <= 10'b0;
					colour <= 23'b111_1111__111_1111__111_1111;
				end
				counter <= 28'b0;
			end
		end
	end

endmodule
