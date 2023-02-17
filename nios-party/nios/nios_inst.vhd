	component nios is
		port (
			buttons_export             : in    std_logic_vector(3 downto 0)  := (others => 'X'); -- export
			red_leds_export            : out   std_logic_vector(9 downto 0);                     -- export
			sdram_addr                 : out   std_logic_vector(12 downto 0);                    -- addr
			sdram_ba                   : out   std_logic_vector(1 downto 0);                     -- ba
			sdram_cas_n                : out   std_logic;                                        -- cas_n
			sdram_cke                  : out   std_logic;                                        -- cke
			sdram_cs_n                 : out   std_logic;                                        -- cs_n
			sdram_dq                   : inout std_logic_vector(15 downto 0) := (others => 'X'); -- dq
			sdram_dqm                  : out   std_logic_vector(1 downto 0);                     -- dqm
			sdram_ras_n                : out   std_logic;                                        -- ras_n
			sdram_we_n                 : out   std_logic;                                        -- we_n
			sdram_clk_clk              : out   std_logic;                                        -- clk
			seven_seg_0_export         : out   std_logic_vector(6 downto 0);                     -- export
			seven_seg_1_export         : out   std_logic_vector(6 downto 0);                     -- export
			seven_seg_2_export         : out   std_logic_vector(6 downto 0);                     -- export
			seven_seg_3_export         : out   std_logic_vector(6 downto 0);                     -- export
			seven_seg_4_export         : out   std_logic_vector(6 downto 0);                     -- export
			seven_seg_5_export         : out   std_logic_vector(6 downto 0);                     -- export
			switches_export            : in    std_logic_vector(9 downto 0)  := (others => 'X'); -- export
			system_pll_ref_clk_clk     : in    std_logic                     := 'X';             -- clk
			system_pll_ref_reset_reset : in    std_logic                     := 'X';             -- reset
			vga_CLK                    : out   std_logic;                                        -- CLK
			vga_HS                     : out   std_logic;                                        -- HS
			vga_VS                     : out   std_logic;                                        -- VS
			vga_BLANK                  : out   std_logic;                                        -- BLANK
			vga_SYNC                   : out   std_logic;                                        -- SYNC
			vga_R                      : out   std_logic_vector(7 downto 0);                     -- R
			vga_G                      : out   std_logic_vector(7 downto 0);                     -- G
			vga_B                      : out   std_logic_vector(7 downto 0);                     -- B
			vga_pll_ref_clk_clk        : in    std_logic                     := 'X';             -- clk
			vga_pll_ref_reset_reset    : in    std_logic                     := 'X'              -- reset
		);
	end component nios;

	u0 : component nios
		port map (
			buttons_export             => CONNECTED_TO_buttons_export,             --              buttons.export
			red_leds_export            => CONNECTED_TO_red_leds_export,            --             red_leds.export
			sdram_addr                 => CONNECTED_TO_sdram_addr,                 --                sdram.addr
			sdram_ba                   => CONNECTED_TO_sdram_ba,                   --                     .ba
			sdram_cas_n                => CONNECTED_TO_sdram_cas_n,                --                     .cas_n
			sdram_cke                  => CONNECTED_TO_sdram_cke,                  --                     .cke
			sdram_cs_n                 => CONNECTED_TO_sdram_cs_n,                 --                     .cs_n
			sdram_dq                   => CONNECTED_TO_sdram_dq,                   --                     .dq
			sdram_dqm                  => CONNECTED_TO_sdram_dqm,                  --                     .dqm
			sdram_ras_n                => CONNECTED_TO_sdram_ras_n,                --                     .ras_n
			sdram_we_n                 => CONNECTED_TO_sdram_we_n,                 --                     .we_n
			sdram_clk_clk              => CONNECTED_TO_sdram_clk_clk,              --            sdram_clk.clk
			seven_seg_0_export         => CONNECTED_TO_seven_seg_0_export,         --          seven_seg_0.export
			seven_seg_1_export         => CONNECTED_TO_seven_seg_1_export,         --          seven_seg_1.export
			seven_seg_2_export         => CONNECTED_TO_seven_seg_2_export,         --          seven_seg_2.export
			seven_seg_3_export         => CONNECTED_TO_seven_seg_3_export,         --          seven_seg_3.export
			seven_seg_4_export         => CONNECTED_TO_seven_seg_4_export,         --          seven_seg_4.export
			seven_seg_5_export         => CONNECTED_TO_seven_seg_5_export,         --          seven_seg_5.export
			switches_export            => CONNECTED_TO_switches_export,            --             switches.export
			system_pll_ref_clk_clk     => CONNECTED_TO_system_pll_ref_clk_clk,     --   system_pll_ref_clk.clk
			system_pll_ref_reset_reset => CONNECTED_TO_system_pll_ref_reset_reset, -- system_pll_ref_reset.reset
			vga_CLK                    => CONNECTED_TO_vga_CLK,                    --                  vga.CLK
			vga_HS                     => CONNECTED_TO_vga_HS,                     --                     .HS
			vga_VS                     => CONNECTED_TO_vga_VS,                     --                     .VS
			vga_BLANK                  => CONNECTED_TO_vga_BLANK,                  --                     .BLANK
			vga_SYNC                   => CONNECTED_TO_vga_SYNC,                   --                     .SYNC
			vga_R                      => CONNECTED_TO_vga_R,                      --                     .R
			vga_G                      => CONNECTED_TO_vga_G,                      --                     .G
			vga_B                      => CONNECTED_TO_vga_B,                      --                     .B
			vga_pll_ref_clk_clk        => CONNECTED_TO_vga_pll_ref_clk_clk,        --      vga_pll_ref_clk.clk
			vga_pll_ref_reset_reset    => CONNECTED_TO_vga_pll_ref_reset_reset     --    vga_pll_ref_reset.reset
		);

