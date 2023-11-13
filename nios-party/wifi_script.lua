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


function sendBuzzerReq(url, teamNum, questionNum, callback)
    print(url)
    local data = {teamID=teamNum, questionID=questionNum, display="true"}
    local postData = sjson.encode(data)
	http.post(url, 
	'Content-Type: application/json\r\n',
	postData, function(code, body)
		if(code == 200) then
			--callback(body)
            print("SENT")
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
            string = "1: " .. array[14] .. "@2: " .. array[20]
        else        
            string = "1: " .. array[14] .. "@2: " .. array[20] .. "@3: " .. array[26] .. "@4: " .. array[32]
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
    getReq(HOST .. "room", function(response)
        --print(response)
        local array = {}
        for split in response:gmatch('"([^"]+)"') do
            table.insert(array, split)
        end
        print("@")
        print(array[1])
        print("@")
    end)
end

function getStart(roomCode)
    getReq(HOST .. "room/" .. roomCode, function(response)
        local array = {}
        for split in response:gmatch('"([^"]+)"') do
            table.insert(array, split)
        end
        if(array[2] == "No rooms found") then
            print("@")
            print("No Room")
            print("@")
        elseif(array[4] == "false") then
            print("@")
            print("waiting")
            print("@")
        else
            print("@")
            print("ready")
            print("@") 
        end
    end)
end

function getGameMode()
    getReq(HOST .. "teams/game/votes", function(response)
        local array = {}
        for split in response:gmatch('"([^"]+)"') do
            table.insert(array, split)
        end
        print("@")
        print(array[2])
        print("@")
    end)
end

function getWinner()
    getReq(HOST .. "teams/game/accumulate/score", function(response)
        --print(response)
        local array = {}
        for split in response:gmatch('"([^"]+)"') do
            table.insert(array, split)
        end

        if(array[3] == "In game") then
            print("@")
            print(array[3])
            print("@")
        else 
            local string = array[3] .. "@" .. array[5]
            print("@")
            s = splitByChunk(string)
            for i,v in pairs(s) do
                print(v)
            end
            print("@")
        end
    end)
end

function getNextQState()
    getReq(HOST .. "audio", function(response)
        
        local array = {}
        for split in response:gmatch('"([^"]+)"') do
            table.insert(array, split)
        end
        print(array[1])
        if(array[1] == "No answer") then
            print("@")
            print(array[1])
            print("@")
        else
            --print(response)
            local array = {}
            for split in response:gmatch('"([^"]+)"') do
                table.insert(array, split)
            end
            print("@")
            if(array[4] == "true") then
                print("true")
            else
                print("false")
            end
            print("@")
        end
    end)
end

function getGameEnd() 
    getReq(HOST .. "teams/game/lobby/status/option", function(response)
        -- in game, restart, over
        print("@")
        print(response)
        print("@")
    end)
end

function sendBuzzer(teamID, questionID)
    sendBuzzerReq(HOST .. "teams/buzzer/press", teamID, questionID, function(response)
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

   
