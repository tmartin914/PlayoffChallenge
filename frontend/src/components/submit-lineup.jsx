import React, { useState, useEffect } from "react";
import './submit-lineup.css';
import PlayerService from "../services/player.service";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

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
  const [teamId, setTeamId] = useState();
  const [loading, setLoading] = useState(false);

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

  const loadLineup = () => {
    if (teamId) {
      setLoading(true);
      PlayerService.getLineup(teamId)
        .then(response => {
          if (response && response.data){
            const test = qbs.find(q => q.id === response.data.qbId);
            setQB(qbs.find(q => q.id === response.data.qbId));
            setRB1(rbs.find(q => q.id === response.data.rb1Id));
            setRB2(rbs.find(q => q.id === response.data.rb2Id));
            setWR1(wrs.find(q => q.id === response.data.wr1Id));
            setWR2(wrs.find(q => q.id === response.data.wr2Id));
            setTE(tes.find(q => q.id === response.data.teId));
            setK(ks.find(q => q.id === response.data.kId));
            setDST(dsts.find(q => q.id === response.data.dstId));
          }
          setLoading(false);
        })
    }
  }

  const loadPlayers = () => {
    PlayerService.load().then(getAllPlayers());
  }

  const submitLineup = () => {
    if (teamId) {
      const lineup = { teamId: teamId, qb: qb.id, rb1: rb1.id, rb2: rb2.id, wr1: wr1.id, wr2: wr2.id, te: te.id, k: k.id, dst: dst.id }
      PlayerService.submitLineup(lineup).then();
    }
  }

  const quickSubmitLineup = () => {
    if (teamId) {
      const lineup = { teamId: teamId, qb: qbs[0].id, rb1: rbs[0].id, rb2: rbs[1].id, wr1: wrs[0].id, wr2: wrs[1].id, te: tes[0].id, k: ks[0].id, dst: dsts[0].id }
      PlayerService.submitLineup(lineup).then();
    }
  }

  useEffect(() => {
    getAllPlayers();
  }, []);

  const handleQBChange = (event) => {
    setQB(qbs.find(q => q.id === event.target.value.id));
  }

  const handleRB1Change = (event) => {
    setRB1(rbs.find(r => r.id === event.target.value.id));
  }

  const handleRB2Change = (event) => {
    setRB2(rbs.find(r => r.id === event.target.value.id));
  }

  const handleWR1Change = (event) => {
    setWR1(wrs.find(w => w.id === event.target.value.id));
  }

  const handleWR2Change = (event) => {
    setWR2(wrs.find(w => w.id === event.target.value.id));
  }

  const handleTEChange = (event) => {
    setTE(tes.find(t => t.id === event.target.value.id));
  }

  const handleKChange = (event) => {
    setK(ks.find(k => k.id === event.target.value.id));
  }

  const handleDSTChange = (event) => {
    setDST(dsts.find(dst => dst.id === event.target.value.id));
  }

  if (loading) {
    return <></>;
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
          {/* <select className="dropdown"
            value={qb}
            label="QB"
            onChange={handleQBChange}
          >
            { qbs.map(qb => <option key={qb.name} value={qb}>{qb.name} ({qb.team})</option>) }
          </select>
          <select className="dropdown"
            value={rb1}
            label="RB1"
            onChange={handleRB1Change}
          >
            { rbs.map(rb => <option key={rb.name} value={rb}>{rb.name} ({rb.team})</option>) }
          </select>
          <select className="dropdown"
            value={rb2}
            label="RB2"
            onChange={handleRB2Change}
          >
            { rbs.map(rb => <option key={rb.name} value={rb}>{rb.name} ({rb.team})</option>) }
          </select>
          <select className="dropdown"
            value={wr1}
            label="WR1"
            onChange={handleWR1Change}
          >
            { wrs.map(wr => <option key={wr.name} value={wr}>{wr.name} ({wr.team})</option>) }
          </select>
          <select className="dropdown"
            value={wr2}
            label="WR2"
            onChange={handleWR2Change}
          >
            { wrs.map(wr => <option key={wr.name} value={wr}>{wr.name} ({wr.team})</option>) }
          </select>
          <select className="dropdown"
            value={te}
            label="TE"
            onChange={handleTEChange}
          >
            { tes.map(te => <option key={te.name} value={te}>{te.name} ({te.team})</option>) }
          </select>
          <select className="dropdown"
            value={k}
            label="K"
            onChange={handleKChange}
          >
            { ks.map(k => <option key={k.name} value={k}>{k.name} ({k.team})</option>) }
          </select>
          <select className="dropdown"
            value={dst}
            label="DST"
            onChange={handleDSTChange}
          >
            { dsts.map(dst => <option key={dst.name} value={dst}>{dst.name} ({dst.team})</option>) }
          </select> */}
          <TextField
            variant="outlined"
            size="small"
            value={teamId}
            onChange={(e) => {setTeamId(e.target.value); }}
            label="Team Id"
            sx={{ width: '100%', marginTop: '5px'}}
          />
          <Button onClick={submitLineup}>Submit Lineup</Button>
          <Button onClick={loadLineup}>Load Lineup</Button>
          <Button onClick={quickSubmitLineup}>Quick Submit Lineup</Button>
        </fieldset>
        : <></>
      }
    </>
  );
}