import React, { useState, useEffect } from "react";
import './submit-lineup.css';
import PlayerService from "../services/player.service";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const SubmitLineup = () => {
  const [qb, setQB] = useState();
  const [rb1, setRB1] = useState();
  const [rb2, setRB2] = useState();
  const [wr1, setWR1] = useState();
  const [wr2, setWR2] = useState();
  const [te, setTE] = useState();
  const [k, setK] = useState();
  const [dst, setDST] = useState();
  const [qbs, setQBs] = useState();
  const [rbs, setRBs] = useState();
  const [wrs, setWRs] = useState();
  const [tes, setTEs] = useState();
  const [ks, setKs] = useState();
  const [dsts, setDSTs] = useState();

  const getAllPlayers = () => {
    PlayerService.getAll()
      .then(response => {
        setQBs(response.data.filter(p => p.position === 'QB'));
        setRBs(response.data.filter(p => p.position === 'RB' || p.position === 'FB'));
        setWRs(response.data.filter(p => p.position === 'WR'));
        setTEs(response.data.filter(p => p.position === 'TE'));
        setKs(response.data.filter(p => p.position === 'K'));
        setDSTs(response.data.filter(p => p.position === 'DST'));
      });
  }

  const loadPlayers = () => {
    PlayerService.load().then(getAllPlayers());
  }

  const submitLineup = () => {
    const lineup = { qb: qbs[0].id, rb1: rbs[0].id, rb2: rbs[1].id, wr1: wrs[0].id, wr2: wrs[1].id, te: tes[0].id, k: ks[0].id, dst: dsts[0].id }
    // const lineup = { qb: qb.id, rb1: rb1.id, rb2: rb2.id, wr1: wr1.id, wr2: wr2.id, te: te.id, k: k.id, dst: dst.id }
    PlayerService.submitLineup(lineup).then();
  }

  useEffect(() => {
    getAllPlayers();
  }, []);

  const handleQBChange = (event) => {
    setQB(qbs.find(q => q.name === event.target.value));
  }

  const handleRB1Change = (event) => {
    setRB1(rbs.find(r => r.name === event.target.value));
  }

  const handleRB2Change = (event) => {
    setRB2(rbs.find(r => r.name === event.target.value));
  }

  const handleWR1Change = (event) => {
    setWR1(wrs.find(w => w.name === event.target.value));
  }

  const handleWR2Change = (event) => {
    setWR2(wrs.find(w => w.name === event.target.value));
  }

  const handleTEChange = (event) => {
    setTE(tes.find(t => t.name === event.target.value));
  }

  const handleKChange = (event) => {
    setK(ks.find(k => k.name === event.target.value));
  }

  const handleDSTChange = (event) => {
    setDST(dsts.find(dst => dst.name === event.target.value));
  }

  return (
    <>
      <div>Submit Lineup</div>
      <Button onClick={loadPlayers}>Load Players</Button>
      { ks && ks.length > 0 ?
        <fieldset className='positions-wrapper'>
          <FormControl sx={{ width: '300px', margin: '5px 0px' }}>
            <InputLabel>QB</InputLabel>
            <Select
              value={qb}
              label="QB"
              onChange={handleQBChange}
            >
              { qbs.map(qb => <MenuItem key={qb.name} value={qb}>{qb.name} ({qb.team})</MenuItem>) }
            </Select>
          </FormControl>
          <FormControl sx={{ width: '300px', margin: '5px 0px' }}>
            <InputLabel>RB1</InputLabel>
            <Select
              value={rb1}
              label="RB1"
              onChange={handleRB1Change}
            >
              { rbs.map(rb => <MenuItem key={rb.name} value={rb}>{rb.name} ({rb.team})</MenuItem>) }
            </Select>
          </FormControl>
          <FormControl sx={{ width: '300px', margin: '5px 0px' }}>
            <InputLabel>RB2</InputLabel>
            <Select
              value={rb2}
              label="RB2"
              onChange={handleRB2Change}
            >
              { rbs.map(rb => <MenuItem key={rb.name} value={rb}>{rb.name} ({rb.team})</MenuItem>) }
            </Select>
          </FormControl>
          <FormControl sx={{ width: '300px', margin: '5px 0px' }}>
            <InputLabel>WR1</InputLabel>
            <Select
              value={wr1}
              label="WR1"
              onChange={handleWR1Change}
            >
              { wrs.map(wr => <MenuItem key={wr.name} value={wr}>{wr.name} ({wr.team})</MenuItem>) }
            </Select>
          </FormControl>
          <FormControl sx={{ width: '300px', margin: '5px 0px' }}>
            <InputLabel>WR2</InputLabel>
            <Select
              value={wr2}
              label="WR2"
              onChange={handleWR2Change}
            >
              { wrs.map(wr => <MenuItem key={wr.name} value={wr}>{wr.name} ({wr.team})</MenuItem>) }
            </Select>
          </FormControl>
          <FormControl sx={{ width: '300px', margin: '5px 0px' }}>
            <InputLabel>TE</InputLabel>
            <Select
              value={te}
              label="TE"
              onChange={handleTEChange}
            >
              { tes.map(te => <MenuItem key={te.name} value={te}>{te.name} ({te.team})</MenuItem>) }
            </Select>
          </FormControl>
          <FormControl sx={{ width: '300px', margin: '5px 0px' }}>
            <InputLabel>K</InputLabel>
            <Select
              value={k}
              label="K"
              onChange={handleKChange}
            >
              { ks.map(k => <MenuItem key={k.name} value={k}>{k.name} ({k.team})</MenuItem>) }
            </Select>
          </FormControl>
          <FormControl sx={{ width: '300px', margin: '5px 0px' }}>
            <InputLabel>DST</InputLabel>
            <Select
              value={dst}
              label="DST"
              onChange={handleDSTChange}
            >
              { dsts.map(dst => <MenuItem key={dst.name} value={dst}>{dst.name} ({dst.team})</MenuItem>) }
            </Select>
          </FormControl>
          <Button onClick={submitLineup}>Submit Lineup</Button>
        </fieldset>
        : <></>
      }
    </>
  );
}