-- This information is used by the Wi-Fi dongle to make a wireless connection to the router in the Lab
--SSID = "TPLINK2.4GHz_391"
--SSID_PASSWORD = "391391391"
SSID = "Kolton's phone"
SSID_PASSWORD = "391391391"
--SSID = "TELUS4189-2.4G"
--SSID_PASSWORD = "2Cheese61Pikachu"

station_cfg={}
station_cfg.ssid=SSID
station_cfg.pwd=SSID_PASSWORD
station_cfg.save=false
wifi.sta.config(station_cfg)
wifi.sta.autoconnect(1)

HOST = "http://50.112.215.42/"

function getReq(url, callback)
	http.get(url, nil, function(code, data)
		if(code == 200) then
			callback(data)
		else
			print("HTTP request failed")
		end
	end)
end


function sendAnswerReq(url, teamNum, questionNum, callback)
    print(url)
    local data = {teamID=teamNum, questionID=questionNum}
    local postData = sjson.encode(data)
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

function getQuestion(number)
    getReq(HOST .. "questions/" .. number, function(response)
        --print(response)
        local array = {}
        for split in response:gmatch('"([^"]+)"') do
            table.insert(array, split)
        end
        print("@")
        --print(table.getn(array))
        s = splitByChunk(array[5])
        for i,v in pairs(s) do
            print(v)
        end
        print("@")
    end)
end

function getQuestionChoices(number)
    getReq(HOST .. "questions/" .. number, function(response)
        --print(response)
        local array = {}
        for split in response:gmatch('"([^"]+)"') do
            table.insert(array, split)
        end
        local string = ""
        if(table.getn(array) < 26) then
            string = "A: " .. array[14] .. "@B: " .. array[20]  
        else        
            string = "A: " .. array[14] .. "@B: " .. array[20] .. "@C: " .. array[26] .. "@D: " .. array[32]
        end
        print("@")
        s = splitByChunk(string)
        for i,v in pairs(s) do
            print(v)
        end
        print("@")
    end)
end

function getRoomCode()
    getReq(HOST .. "room/main", function(response)
        local array = {}
        for split in response:gmatch('"([^"]+)"') do
            table.insert(array, split)
        end
        print("@")
        print(array[1])
        print("@")
    end)
end

function getStart()
    getReq(HOST .. "", function(response)
        print(response)
    end)
end

function sendAnswer()
    sendAnswerReq(HOST .. "audio/", 1, 2, function(response)
        print(response)
    end)
end

function splitByChunk(text)
    local s = {}
    for i = 1, #text, 14 do
        s[#s+1] = text:sub(i, i+13)
    end
    return s
end

function check_wifi()
    ip = wifi.sta.getip()
    if(ip==nil) then
        print(ip)
    else
        print("Connected!")
        print(ip)
    end
end

   
