import http from "../http-common";

class PlayerService {
  getAll() {
    return http.get("/players");
  }

  load() {
    return http.get("/players/load");
  }

  submitLineup(lineup) {
    return http.post("/players/submitLineup", lineup)
  }
}

export default new PlayerService();