from fastapi import FastAPI
import uvicorn

app = FastAPI()
@app.get("/profile")
def health():
    return { "profile":
    [
    {
        "roomCode":"1234",
        "teamName":"Team1"
    }, 
    {
        "roomCode":"9182",
        "teamName":"Team1"
    }
]
}

@app.get("/movie/")
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

# uvicorn main:app --host 0.0.0.0 --port 80
# if __name__ == '__main__':
#     uvicorn.run(app, port=8000, host='128.189.222.95')