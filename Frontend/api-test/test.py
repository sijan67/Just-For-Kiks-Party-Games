from fastapi import FastAPI
import uvicorn

app = FastAPI()
@app.get("/profile")
def prof():
    return { "profile":
    [
    {
        "name":"Sam",
        "studentId":"1232"
    }, 
    {
        "name":"Ken",
        "studentId":"1111"
    }
]
}

@app.get("/user")
def user():
    return {
        "_id":"63ed8fc579885db448a3898a",
        "username":"Kevin",
        "teamname":"coolboy",
        "teamscore":"0",
        "roomcode":"10001000"
        }

@app.get("/movie")
def user():
    return {
  "title": "The Basics - Networking",
  "description": "Your app fetched this from a remote endpoint!",
  "movies": [
    { "id": "1", "title": "Star Wars", "releaseYear": "1977" },
    { "id": "2", "title": "Back to the Future", "releaseYear": "1985" },
    { "id": "3", "title": "The Matrix", "releaseYear": "1999" },
    { "id": "4", "title": "Inception", "releaseYear": "2010" },
    { "id": "5", "title": "Interstellar", "releaseYear": "2014" }
  ]
}


if __name__ == '__test__':
    uvicorn.run(app, port=8000, host='128.189.222.88')