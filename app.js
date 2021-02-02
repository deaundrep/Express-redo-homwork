const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let teamArray = [
{
    id: 1,
    name: "lakers",
    playersArray: [],
},
];

app.get("/", function (req, res) {
res.status(200).send("Welcome to our first API");
});app.get("/team", function (req, res) {
res.status(200).json({
    teamArray,
});
});

app.get("/team/:teamID", function (req, res) {
    let result = null;
    let teamIDNumber = Number(req.params.teamID);
    teamArray.forEach((team) => {
    if (team.id === teamIDNumber) {
        result = team;
    }
    });
    if (!result) {
    return res
        .status(400)
        .send("Sorry, the team you are looking for does not exist");
    }
    res.status(200).json({
    team: result,
    });
});

app.post("/team/add-players/:teamID", function (req, res) {
    
let teamIDNumber = Number(req.params.teamID);

teamArray.forEach((team) => {
    if (team.id === teamIDNumber){
        team.playersArray.push(req.body);
    }
});
res.status(200).json({
    teamArray,
});
});

app.listen(PORT, () => {
console.log(`Server is running on PORT: ${PORT}`);
});