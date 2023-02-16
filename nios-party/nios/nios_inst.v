	nios u0 (
		.sdram_addr                 (<connected-to-sdram_addr>),                 //                sdram.addr
		.sdram_ba                   (<connected-to-sdram_ba>),                   //                     .ba
		.sdram_cas_n                (<connected-to-sdram_cas_n>),                //                     .cas_n
		.sdram_cke                  (<connected-to-sdram_cke>),                  //                     .cke
		.sdram_cs_n                 (<connected-to-sdram_cs_n>),                 //                     .cs_n
		.sdram_dq                   (<connected-to-sdram_dq>),                   //                     .dq
		.sdram_dqm                  (<connected-to-sdram_dqm>),                  //                     .dqm
		.sdram_ras_n                (<connected-to-sdram_ras_n>),                //                     .ras_n
		.sdram_we_n                 (<connected-to-sdram_we_n>),                 //                     .we_n
		.sdram_clk_clk              (<connected-to-sdram_clk_clk>),              //            sdram_clk.clk
		.system_pll_ref_clk_clk     (<connected-to-system_pll_ref_clk_clk>),     //   system_pll_ref_clk.clk
		.system_pll_ref_reset_reset (<connected-to-system_pll_ref_reset_reset>), // system_pll_ref_reset.reset
		.vga_CLK                    (<connected-to-vga_CLK>),                    //                  vga.CLK
		.vga_HS                     (<connected-to-vga_HS>),                     //                     .HS
		.vga_VS                     (<connected-to-vga_VS>),                     //                     .VS
		.vga_BLANK                  (<connected-to-vga_BLANK>),                  //                     .BLANK
		.vga_SYNC                   (<connected-to-vga_SYNC>),                   //                     .SYNC
		.vga_R                      (<connected-to-vga_R>),                      //                     .R
		.vga_G                      (<connected-to-vga_G>),                      //                     .G
		.vga_B                      (<connected-to-vga_B>),                      //                     .B
		.vga_pll_ref_clk_clk        (<connected-to-vga_pll_ref_clk_clk>),        //      vga_pll_ref_clk.clk
		.vga_pll_ref_reset_reset    (<connected-to-vga_pll_ref_reset_reset>),    //    vga_pll_ref_reset.reset
		.red_leds_export            (<connected-to-red_leds_export>),            //             red_leds.export
		.switches_export            (<connected-to-switches_export>),            //             switches.export
		.seven_seg_0_export         (<connected-to-seven_seg_0_export>),         //          seven_seg_0.export
		.seven_seg_1_export         (<connected-to-seven_seg_1_export>),         //          seven_seg_1.export
		.seven_seg_2_export         (<connected-to-seven_seg_2_export>),         //          seven_seg_2.export
		.seven_seg_3_export         (<connected-to-seven_seg_3_export>),         //          seven_seg_3.export
		.seven_seg_4_export         (<connected-to-seven_seg_4_export>),         //          seven_seg_4.export
		.seven_seg_5_export         (<connected-to-seven_seg_5_export>),         //          seven_seg_5.export
		.buttons_export             (<connected-to-buttons_export>)              //              buttons.export
	);

