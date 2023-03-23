-- This information is used by the Wi-Fi dongle to make a wireless connection to the router in the Lab
SSID = "TPLINK2.4GHz_391"
SSID_PASSWORD = "391391391"
--SSID = "TELUS4189-2.4G"
--SSID_PASSWORD = "2Cheese61Pikachu"

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

function sendAnswer(url, teamNum, questionNum, callback)
    print(url)
    local data = {teamID=teamNum, questionID=questionNum}
    --print(data)
    local postData = sjson.encode(data)
    --local postData = "teamID=" .. tostring(teamNum) .. "&questionID=" .. tostring(questionNum)
	--print(type(tostring(teamNum)))
	http.post(url, 
	'Content-Type: application/json\r\n',
	postData, function(code, body)
		if(code == 200) then
			callback(body)
		else
			print("FAIL")
		end
	end)    
end

function check_wifi()
    ip = wifi.sta.getip()
    if(ip==nil) then
        print(ip)
    else
        print("Connected!")
        print(ip)
        sendAnswer(HOST .. "audio/", 1, 2, function(response)
            print(response)
        end)
    end
end


function check_wifi_get()
	ip = wifi.sta.getip()

	if(ip==nil) then
		print(ip)
	else
		--print("Connected!")
		--print(ip)
        getQuestion(HOST .. "questions/1", function(response)
            --print(response)
            local array = {}
            for split in response:gmatch('"([^"]+)"') do
                table.insert(array, split)
            end
            print("@")
            --[[
            5: question
            10,12: A, answer
            16,18: B, answer
            22,24: C, answer
            28,30: D, answer
            ]]--
            print(array[5])
            print(array[10] .. ": " .. array[12])
            print(array[16] .. ": " .. array[18])
            print(array[22] .. ": " .. array[24])
            print(array[28] .. ": " .. array[30])
            print("@")
        end)
	end
end

function open_audio()
    file.open("mki0a-u7uo1.wav", "r")
    local fileSize = file.seek("end")
    file.seek("set",0)
    local buffer = file.read(fileSize)
    return buffer
end
   
