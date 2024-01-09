# PlayoffChallenge

Questions/Risks
    - where is this hosted?
    - how to get available players?
    - how to test with gametimes?

UI
- edit lineup
- admin page
    - can pull latest game data
- standings
- view all lineups

Auth

DB
- Players to choose from
    - name
    - team
    - postition
    - status?
    - game start time?
    - image?
    - link to stats?
    - still available

- Players stats
    - week
    - each category
    - total points

- Selected players each week
  - includes number of times in a row that player was taken
  - each position

- Standings
    - teamName
    - total points (from past weeks)
    - user
    - teamId

Backend
- cannot update after game start time
- endpoints:
    - GetAllAvailablePlayers()
        - includes multipliers
    - GetSelectedPlayersStats()
    - SubmitLineup()
    - GetCurrentLineup()
    - GetStandings()
    - GetLineupForTeam()
        - don't show until gametime
    - UpdateGameStats()

API
- GetAllAvailablePlayers()
- GetGameStats()
- Weekly Depth Charts
  - 2023, PST, 1