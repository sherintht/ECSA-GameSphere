import React, { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Award, Brain, Clock3, Crown, Gamepad2, GraduationCap, LogOut, Medal, ShieldCheck, Trophy, UserRound, Zap } from 'lucide-react'
import { games } from './games'
import { supabase } from './supabase'

const STORE='ecsa_arena_v1'
const readLocal=()=>{try{return JSON.parse(localStorage.getItem(STORE)||'{"players":[],"scores":[]}')}catch{return {players:[],scores:[]}}}
const writeLocal=d=>localStorage.setItem(STORE,JSON.stringify(d))
const fmt=s=>`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`

export default function App(){
  const [page,setPage]=useState('home')
  const [student,setStudent]=useState(()=>JSON.parse(localStorage.getItem('ecsa_student')||'null'))
  const [form,setForm]=useState({name:'',reg:'',semester:'S5'})
  const [active,setActive]=useState(null)
  const [index,setIndex]=useState(0)
  const [selected,setSelected]=useState(null)
  const [answers,setAnswers]=useState([])
  const [seconds,setSeconds]=useState(0)
  const [finished,setFinished]=useState(false)
  const [lastResult,setLastResult]=useState(null)
  const [board,setBoard]=useState([])
  const [notice,setNotice]=useState('')
  const [adminOpen,setAdminOpen]=useState(false)
  const [adminPin,setAdminPin]=useState('')
  const [admin,setAdmin]=useState(false)

  useEffect(()=>{loadBoard()},[])
  useEffect(()=>{
    if(!active||finished)return
    const t=setInterval(()=>setSeconds(s=>s+1),1000)
    return ()=>clearInterval(t)
  },[active,finished])
  useEffect(()=>{
    if(!notice)return
    const t=setTimeout(()=>setNotice(''),3500)
    return ()=>clearTimeout(t)
  },[notice])

  async function loadBoard(){
    if(supabase){
      const {data,error}=await supabase.from('scores').select('id,student_name,register_number,semester,game_id,score,correct,total,elapsed_seconds,created_at').order('score',{ascending:false}).limit(100)
      if(!error&&data){setBoard(data);return}
    }
    const d=readLocal()
    setBoard(d.scores.sort((a,b)=>b.score-a.score).slice(0,100))
  }

  function register(e){
    e.preventDefault()
    if(!form.name.trim()||!form.reg.trim()){setNotice('Enter your name and register number.');return}
    const p={name:form.name.trim(),reg:form.reg.trim().toUpperCase(),semester:form.semester}
    localStorage.setItem('ecsa_student',JSON.stringify(p));setStudent(p);setPage('games');setNotice('Welcome to the Arena!')
  }
  function startGame(g){
    setActive(g);setIndex(0);setSelected(null);setAnswers([]);setSeconds(0);setFinished(false);setPage('play')
  }
  function next(){
    if(selected===null){setNotice('Choose an answer to continue.');return}
    const nextAnswers=[...answers,{question:index,choice:selected,correct:selected===active.questions[index].a}]
    setAnswers(nextAnswers);setSelected(null)
    if(index===active.questions.length-1){finish(nextAnswers);return}
    setIndex(index+1)
  }
  async function finish(finalAnswers){
    setFinished(true)
    const correct=finalAnswers.filter(a=>a.correct).length
    const score=correct*100 + (correct===active.questions.length?100:0) + Math.max(0,Math.floor((300-seconds)/3))
    const result={student_name:student.name,register_number:student.reg,semester:student.semester,game_id:active.id,game_title:active.title,score,correct,total:active.questions.length,elapsed_seconds:seconds,created_at:new Date().toISOString()}
    setLastResult(result)
    if(supabase){
      const {error}=await supabase.from('scores').insert({student_name:result.student_name,register_number:result.register_number,semester:result.semester,game_id:result.game_id,score:result.score,correct:result.correct,total:result.total,elapsed_seconds:result.elapsed_seconds})
      if(error)setNotice('Result saved locally; cloud save needs database setup.')
      else setNotice('Result submitted to the Arena!')
    }else{
      const d=readLocal();d.scores.push(result);writeLocal(d);setNotice('Demo result saved on this device.')
    }
    await loadBoard();setPage('result')
  }
  function logout(){localStorage.removeItem('ecsa_student');setStudent(null);setPage('home')}
  const myRank=useMemo(()=>{const i=board.findIndex(x=>x.register_number===student?.reg);return i<0?null:i+1},[board,student])
  const gameRank=useMemo(()=>board.filter(x=>x.game_id===active?.id).sort((a,b)=>b.score-a.score),[board,active])

  return <div className="app-shell">
    <header className="topbar"><button className="brand" onClick={()=>setPage(student?'games':'home')}><span className="brand-mark">E</span><span><b>ECSA</b><small>STRATEGY ARENA</small></span></button><div className="top-actions"><span className="event-pill"><span className="live-dot"/> ARENA OPEN</span>{student&&<button className="profile-chip" onClick={()=>setPage('profile')}><UserRound size={15}/>{student.name.split(' ')[0]}</button>}</div></header>
    <main>
      {notice&&<div className="toast">{notice}</div>}
      {page==='home'&&<section className="hero">
        <div className="hero-copy"><div className="eyebrow"><Zap size={14}/> ECE STUDENT CHALLENGE PLATFORM</div><h1>THINK.<br/><span>PLAY.</span><br/>CONQUER.</h1><p>Welcome to ECSA Strategy Arena — seven challenges. One mind. Your strategy decides your rank.</p><div className="hero-buttons"><button className="primary" onClick={()=>setPage('register')}>Enter the Arena <ArrowRight size={17}/></button><button className="secondary" onClick={()=>{loadBoard();setPage('leaderboard')}}><Trophy size={16}/> View leaderboard</button></div><div className="hero-stats"><div><b>07</b><small>GAMES</small></div><div><b>01</b><small>CHAMPION</small></div><div><b>∞</b><small>STRATEGIES</small></div></div></div>
        <div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="core"><span>⚡</span><b>ARENA</b><small>READY PLAYER?</small></div><div className="float-card fc1">🧠 <span>THINK FAST</span></div><div className="float-card fc2">🏆 <span>CLIMB THE RANKS</span></div><div className="float-card fc3">📡 <span>DECODE IT</span></div></div>
      </section>}
      {page==='register'&&<section className="form-wrap"><div className="section-kicker">PLAYER REGISTRATION</div><h2>Claim your player identity.</h2><p className="muted">Open to all Electronics and Communication Engineering students.</p><form className="player-form" onSubmit={register}><label>Full name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Enter your full name" required/></label><label>Register number<input value={form.reg} onChange={e=>setForm({...form,reg:e.target.value})} placeholder="e.g. 24ECE001" required/></label><label>Semester<select value={form.semester} onChange={e=>setForm({...form,semester:e.target.value})}>{['S1','S2','S3','S4','S5','S6','S7','S8'].map(x=><option key={x}>{x}</option>)}</select></label><button className="primary full">Create player profile <ArrowRight size={17}/></button></form><p className="tiny-note"><ShieldCheck size={13}/> Use your own register number. One player profile per device in this starter version.</p></section>}
      {page==='games'&&<><div className="page-heading"><div><div className="section-kicker">PLAYER DASHBOARD</div><h2>Choose your challenge, {student?.name.split(' ')[0]}.</h2><p className="muted">Every game is a chance to earn points and rise on the leaderboard.</p></div><div className="player-tag"><GraduationCap size={17}/>{student?.semester} ECE</div></div><div className="game-grid">{games.map((g,i)=><article className="game-card" key={g.id} style={{'--accent':g.color}}><div className="game-card-top"><span className="game-icon">{g.icon}</span><span className="game-number">CHALLENGE 0{i+1}</span></div><div className="game-category">{g.category}</div><h3>{g.title}</h3><p>{g.description}</p><div className="game-meta"><span><Clock3 size={14}/> ~2–4 min</span><span>{g.questions.length} questions</span></div><button className="play-btn" onClick={()=>startGame(g)}>Play challenge <ArrowRight size={15}/></button></article>)}</div><div className="dashboard-bottom"><button className="secondary" onClick={()=>{loadBoard();setPage('leaderboard')}}><Trophy size={16}/> Open leaderboard</button><button className="text-btn" onClick={logout}><LogOut size={15}/> Sign out</button></div></>}
      {page==='play'&&active&&<section className="play-wrap"><div className="play-head"><button className="back-btn" onClick={()=>{setPage('games');setActive(null)}}><ArrowLeft size={16}/> Exit game</button><span className="timer"><Clock3 size={16}/>{fmt(seconds)}</span></div><div className="play-title"><span className="game-icon large">{active.icon}</span><div><div className="section-kicker">{active.category}</div><h2>{active.title}</h2></div></div><div className="progress-row"><span>QUESTION {index+1} / {active.questions.length}</span><span>{Math.round((index/active.questions.length)*100)}% COMPLETE</span></div><div className="progress"><span style={{width:`${(index/active.questions.length)*100}%`}}/></div><div className="question-card"><div className="question-label">YOUR MISSION</div><h3>{active.questions[index].q}</h3><div className="option-list">{active.questions[index].options.map((o,i)=><button key={i} className={`option ${selected===i?'selected':''}`} onClick={()=>setSelected(i)}><span className="option-letter">{String.fromCharCode(65+i)}</span>{o}</button>)}</div><button className="primary next-btn" onClick={next}>{index===active.questions.length-1?'Submit challenge':'Lock answer & continue'} <ArrowRight size={16}/></button></div><p className="tiny-note centered">Choose carefully. Your answer is locked when you continue.</p></section>}
      {page==='result'&&lastResult&&<section className="result-wrap"><div className="result-medal">🏆</div><div className="section-kicker">CHALLENGE COMPLETED</div><h2>Mission accomplished.</h2><p className="muted">{lastResult.game_title} · {student?.name}</p><div className="result-score"><span>YOUR SCORE</span><b>{lastResult.score}</b><small>POINTS</small></div><div className="result-metrics"><div><b>{lastResult.correct}/{lastResult.total}</b><small>Correct answers</small></div><div><b>{fmt(lastResult.elapsed_seconds)}</b><small>Time taken</small></div><div><b>{lastResult.correct===lastResult.total?'PERFECT':'COMPLETED'}</b><small>Performance</small></div></div><div className="result-actions"><button className="primary" onClick={()=>setPage('games')}>Play another game <ArrowRight size={16}/></button><button className="secondary" onClick={()=>{loadBoard();setPage('leaderboard')}}><Trophy size={16}/> Leaderboard</button></div><div className="explanations"><h3>Answer review</h3>{active.questions.map((q,i)=><div className="review-row" key={i}><b>{i+1}. {q.q}</b><p>{q.explain}</p><span className={answers[i]?.correct?'correct':'incorrect'}>{answers[i]?.correct?'✓ Correct':'✕ Incorrect'} · Correct answer: {q.options[q.a]}</span></div>)}</div></section>}
      {page==='leaderboard'&&<section><div className="page-heading"><div><div className="section-kicker">THE RANKINGS</div><h2>Leaderboard.</h2><p className="muted">Top challenge scores across the Arena.</p></div><button className="secondary" onClick={loadBoard}>↻ Refresh</button></div><div className="leaderboard"><div className="leader-head"><span>RANK / PLAYER</span><span>GAME</span><span>SCORE</span></div>{board.length===0?<div className="empty-state"><Trophy size={30}/><h3>No scores yet</h3><p>Be the first player to complete a challenge.</p></div>:board.map((r,i)=><div className="leader-row" key={r.id||`${r.register_number}-${r.game_id}-${i}`}><div className="rank-player"><span className={`rank rank-${i+1}`}>{i===0?'♛':`#${i+1}`}</span><span><b>{r.student_name}</b><small>{r.register_number} · {r.semester}</small></span></div><span className="leader-game">{games.find(g=>g.id===r.game_id)?.title||r.game_id}</span><b className="score">{r.score}</b></div>)}</div><p className="tiny-note">Scores are listed per completed game. The overall champion should be determined by total points across all seven games.</p><button className="text-btn" onClick={()=>setPage(student?'games':'home')}><ArrowLeft size={15}/> Back</button></section>}
      {page==='profile'&&<section className="form-wrap"><div className="section-kicker">PLAYER PROFILE</div><h2>{student?.name}</h2><p className="muted">{student?.reg} · {student?.semester} ECE</p><div className="profile-panel"><Medal size={24}/><div><b>{myRank?`Rank #${myRank}`:'No overall rank yet'}</b><small>Based on submitted game scores currently loaded.</small></div></div><button className="primary full" onClick={()=>setPage('games')}>Back to games</button><button className="text-btn" onClick={logout}>Sign out</button></section>}
    </main>
    <footer><div className="footer-brand"><span className="brand-mark small">E</span><b>ECSA STRATEGY ARENA</b></div><span>Built for ECE minds. Play fair. Think smart.</span><button className="admin-link" onClick={()=>setAdminOpen(!adminOpen)}>Admin</button></footer>
    {adminOpen&&<div className="admin-panel"><b>Admin quick view</b><p>Starter admin view. For secure administration, configure Supabase Auth and database policies before the public event.</p><input placeholder="Demo admin PIN (local preview only)" value={adminPin} onChange={e=>setAdminPin(e.target.value)}/><button className="secondary" onClick={()=>{if(adminPin==='ECSA2026'){setAdmin(true);setNotice('Demo admin view enabled.');}else setNotice('Incorrect demo PIN.')}}>Unlock demo view</button>{admin&&<div className="admin-stats"><b>{board.length}</b> score records loaded <button className="text-btn" onClick={loadBoard}>Refresh records</button></div>}</div>}
  </div>
}
