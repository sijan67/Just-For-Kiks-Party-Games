-- This information is used by the Wi-Fi dongle to make a wireless connection to the router in the Lab
--SSID = "ubcvisitor"--"TELUS4189-2.4G"
--SSID_PASSWORD = ""--"2Cheese61Pikachu"
SSID = "TELUS4189-2.4G"
SSID_PASSWORD = "2Cheese61Pikachu"

-- configure ESP as a station
--wifi.setmode(wifi.STATION)
--wifi.sta.config(SSID,SSID_PASSWORD)
--wifi.sta.autoconnect(1)
station_cfg={}
station_cfg.ssid=SSID
station_cfg.pwd=SSID_PASSWORD
station_cfg.save=false
wifi.sta.config(station_cfg)
wifi.sta.autoconnect(1)


HOST = "http://50.112.215.42/"

function getQuestion(url, callback)
	http.get(url, nil, function(code, data)
		if(code == 200) then
			callback(data)
		else
			print("HTTP request failed")
		end
	end)
end

function sendTeamID(url, teamID, callback)
	local postData = sjson.encode(teamID)
	http.post(url, nil, postData, function(code, body, headers)
		if(code == 200) then
			callback(body)
		else
			callback(nil)
		end
	end)
end

function check_wifi()
    ip = wifi.sta.getip()

    if(ip==nil) then
        print(ip)
    else
        --tmr.stop(0)
        print("Connected!")
        print(ip)
        return(ip)
    end
end

function check_wifi_get()
	ip = wifi.sta.getip()

	if(ip==nil) then
		print(ip)
	else
		print("Connected!")
		print(ip)
        getQuestion(HOST .. "questions/2", function(response)
            print(response)
        end)
	end
end
