const db = require("../models");
const Player = db.players;
const Lineup = db.lineups;
const Op = db.Sequelize.Op;

const fs = require("fs-extra")
const path = require('path');
const playerDataJson = path.resolve('./backend/players.json');

exports.findAll = (req, res) => {
  console.log('findAll');
  Player.findAll({ where: { available: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.submitLineup = (req, res) => {
  // if (!req.body.title) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  const lineup = {
    teamId: "123",
    teamName: "My Team",
    week: "1",
    qbId: req.body.qb,
    rb1Id: req.body.rb1,
    rb2Id: req.body.rb2,
    wr1Id: req.body.wr1,
    wr2Id: req.body.wr2,
    teId: req.body.te,
    dstId: req.body.dst,
    kId: req.body.k
  }

  Lineup.create(lineup)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Lineup"
      });
      return false;
    });
}

const applicablePositions = ['QB', 'RB', 'FB', 'WR', 'RWR', 'LWR', 'TE'];

exports.populateTable = async (req, res) => {
  console.log('populateTable');

  // TODO: does not have bye week teams
  const playerData = await fs.readJson(playerDataJson);
  const players = [];
  playerData.teams.forEach(team => {
    const tempPlayerArrays = team.offense.filter(p => applicablePositions.includes(p.position.name)).map(p => p.position.players);
    tempPlayerArrays.push(team.special_teams.find(p => p.position.name === 'K').position.players);
    tempPlayerArrays.forEach(playersArray => {
      playersArray.forEach(player => {
        // TODO: need to properly set available
        players.push({ id: player.id, name: player.name, team: team.name, position: player.position, available: true });
      });
    });

    players.push({ id: team.id, name: team.name, team: team.name, position: 'DST', available: true })
  });

  Player.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Players were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all players."
      });
    });

  players.forEach(player => {
    createPlayer(player);
  });
};

createPlayer = (player) => {
  Player.create(player)
    .then(data => {
      //return true;
    })
    .catch(err => {
      console.log(err.message);
      // res.status(500).send({
      //   message:
      //     err.message || "Some error occurred while creating the Player"
      // });
      //return false;
    });
};
