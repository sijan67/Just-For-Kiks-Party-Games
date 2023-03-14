-- This information is used by the Wi-Fi dongle to make a wireless connection to the router in the Lab
SSID = "ubcvisitor"
SSID_PASSWORD = ""

-- configure ESP as a station
wifi.setmode(wifi.STATION)
wifi.sta.config(SSID,SSID_PASSWORD)
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

function sendAudio(url, audioFile, callback)
	local postData = sjson.encode(audioFile)
	http.post(url, nil, postData, function(code, body, headers)
		if(code == 200) then
			callback(body)
		else
			callback(nil)
		end
	end)
end)

function check_wifi()
	ip = wifi.sta.getip()

	if(ip==nil) then
		print("Connecting...")
	else
		tmr.stop(0)
		print("Connected to AP!")
		print(ip)
		getQuestion(HOST + "users", function(response)
			print(response)
		end)
	end
end