	component System is
		port (
			clk_clk            : in  std_logic                    := 'X';             -- clk
			red_leds_export    : out std_logic_vector(9 downto 0);                    -- export
			reset_reset_n      : in  std_logic                    := 'X';             -- reset_n
			seven_seg_0_export : out std_logic_vector(6 downto 0);                    -- export
			seven_seg_1_export : out std_logic_vector(6 downto 0);                    -- export
			seven_seg_2_export : out std_logic_vector(6 downto 0);                    -- export
			seven_seg_3_export : out std_logic_vector(6 downto 0);                    -- export
			seven_seg_4_export : out std_logic_vector(6 downto 0);                    -- export
			seven_seg_5_export : out std_logic_vector(6 downto 0);                    -- export
			switches_export    : in  std_logic_vector(9 downto 0) := (others => 'X'); -- export
			key_0_export       : in  std_logic                    := 'X';             -- export
			key_1_export       : in  std_logic                    := 'X';             -- export
			key_2_export       : in  std_logic                    := 'X';             -- export
			key_3_export       : in  std_logic                    := 'X'              -- export
		);
	end component System;

	u0 : component System
		port map (
			clk_clk            => CONNECTED_TO_clk_clk,            --         clk.clk
			red_leds_export    => CONNECTED_TO_red_leds_export,    --    red_leds.export
			reset_reset_n      => CONNECTED_TO_reset_reset_n,      --       reset.reset_n
			seven_seg_0_export => CONNECTED_TO_seven_seg_0_export, -- seven_seg_0.export
			seven_seg_1_export => CONNECTED_TO_seven_seg_1_export, -- seven_seg_1.export
			seven_seg_2_export => CONNECTED_TO_seven_seg_2_export, -- seven_seg_2.export
			seven_seg_3_export => CONNECTED_TO_seven_seg_3_export, -- seven_seg_3.export
			seven_seg_4_export => CONNECTED_TO_seven_seg_4_export, -- seven_seg_4.export
			seven_seg_5_export => CONNECTED_TO_seven_seg_5_export, -- seven_seg_5.export
			switches_export    => CONNECTED_TO_switches_export,    --    switches.export
			key_0_export       => CONNECTED_TO_key_0_export,       --       key_0.export
			key_1_export       => CONNECTED_TO_key_1_export,       --       key_1.export
			key_2_export       => CONNECTED_TO_key_2_export,       --       key_2.export
			key_3_export       => CONNECTED_TO_key_3_export        --       key_3.export
		);

