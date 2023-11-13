# Just-For-Kiks-Party-Games

## 1. PROJECT TITLE
Just For Kiks Party Games
## 2. GENERAL PROJECT DESCRIPTION
WHAT: This project is to build a Party Game where users can enter their names, be randomly split up into two teams, can play 4 different games through their phones and a VGA monitor attached to the DE1-SoC board, which would be connected via Wifi to the cloud server and a mobile application. The VGA monitor acts as a shared display for the players of the game. The DE1-SoC also has two trigger buttons attached that act as speed buzzers to select which team goes first during trivia games. A room verification code is displayed on the VGA display to allow users to join the party room though the same code. Players can join the party room by putting the verification code through their mobile app, and select a game of their preference. Mini-games will be selected every round, with a random option. Trivia games will be played through a speed buzzer and the microphone attached to the DE1, whereas other mini-games will be played through the mobile application. The winning team in this case will be measured through mini-game finishing time. Each round, which allows a different mini-game to be picked, awards the winning team 100 points, and the first team to achieve 1000 points wins the entire game.
The mini-games are:
Trivia:
The questions compiled by the creator are stored in the cloud and displayed in the VGA monitor. The first person to press a button connected to the DE1 will get a chance to answer the question. When the button is pressed, the mic will be enabled, allowing the speaker to answer the question. This answer will get put through a speech to text recognition AI model. If the answer provided by the user is right they will see their reward point increase on the app. If not or if the user takes too long to answer, there will be an error sound from DE1-SoC and the other team gets to answer the question. If no one can answer within a time limit the game will move on to another question. The first team to answer 3 trivia questions correctly wins 100 points, and subsequently the round.
Math Questions:
Similar to the Trivia category, but this is strictly all math related questions.
Colour Box Matching:
A 3x3, 4x4, and 5x5 box will be generated by the DE1, where each box has a different colour and displayed on the VGA monitor. Each user will also have a box of corresponding size to the DE1 displayed on their phone but with a different colour orientation. When the round starts, each user will tap on the individual boxes to change the colour of the box. The box will rotate between 5 different colours when tapped. The goal is to match the pattern that is displayed on the VGA monitor. Once
 the user is done matching the colour of the boxes, they will press a submit button and move onto the next box size. The first user to finish all 3 sizes will get 100 points for their team.
Number Ordering:
A 3x3, 4x4, and 5x5 box will be generated by the DE1, where each box has a randomly generated number and sent to each of the user’s phones. The user will then have to order the numbers in increasing order by tapping on the numbers. After the user finishes ordering the numbers, they must submit. Once they finish the first box, they move onto the next box size. The first to finish all 3 sizes will get 100 points for their team.
There will be a fifth choice at the beginning of the game where users will play a random combination of all the games where there is no choice in between rounds on what game to play. So round 1 may be a trivia question, then round 2 may be a colour box matching game and round 3 may go back to being a trivia question.
HOW: A room code will be generated that will be sent to the DE1-SoC, which will display the code onto a VGA display. This would then allow users to join through a mobile application that would indicate that they have joined a particular room under a name that the user specifies. All the players will be split up into two teams, and the game will constantly display a leaderboard of the two team scores, while allowing users to vote for a specific mini-game to be played each round. Each round finishes with a team scoring 100 points, and the mini-game choosing screen will be displayed again. The person that chooses the mini-game will be picked on a rotation basis, with each team alternating and each person on the team alternating. For the trivia and math game, the DE1-SoC will periodically display questions on the VGA display, that the users then are able to answer. The microphone on the DE1-SoC will allow users to give a voice input for the answer and voice recognition will detect the correct answer. The rest of the games will be played via the mobile application.
## 3. TARGET MARKET AND VALUE
Families and friends, (Ages 13+) would be able to improve their cognitive skills and learn different interesting facts.
## 4. NEEDS AND CONSTRAINTS OF TARGET MARKET
List of constraints or needs imposed by this target market:
1. Ease of use. Intuitive user interface for users to choose categories of family friendly games
and see their score after answering the question.
2. A machine learning model trained on specific keywords (e.g. letters, numbers, yes & no) to
correctly capture the answers from users
3. Two big buttons for two teams to compete who will be the first to answer for trivia questions
4. Internet-connected to a cloud system which stores all the questions and room codes. When prompted by DE1-SoC, the cloud system will send the asked questions and codes to the user.
5. Every player needs to have a mobile device to participate in games.
6. High resolution screen with large text to display questions to larger groups of players.
7. Microphone able to pick up sounds from at least a meter away to clearly analyze and
compare the answer to the pre-stored answer.
8. An audio output for countdown after the user presses the button
9. Overall loss cost, so do not require another separate internet service
