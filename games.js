export const games = [
  {
    id:'logic', title:'Logic Puzzles', category:'MIND & REASONING', icon:'🧠', color:'#8b5cf6',
    description:'Crack patterns, spot relationships and think several steps ahead.',
    questions:[
      {q:'What comes next in the sequence: 2, 6, 12, 20, 30, __?', options:['36','40','42','44'], a:2, explain:'The differences are 4, 6, 8, 10 and then 12. So 30 + 12 = 42.'},
      {q:'A clock shows 3:15. What is the smaller angle between the hands?', options:['0°','7.5°','15°','22.5°'], a:1, explain:'At 3:15, the minute hand is at 90°. The hour hand is at 97.5°. Difference = 7.5°.'},
      {q:'If all ZORPS are MIPS and all MIPS are TANS, which statement must be true?', options:['All TANS are ZORPS','All ZORPS are TANS','No ZORPS are TANS','Some MIPS are not TANS'], a:1, explain:'The relationship is ZORPS ⊆ MIPS ⊆ TANS.'},
      {q:'A box has 3 red, 4 blue and 5 green balls. What is the minimum number drawn blind to guarantee two of the same colour?', options:['2','3','4','5'], a:2, explain:'There are 3 colours. In the worst case, the first 3 are all different; the 4th guarantees a pair.'}
    ]
  },
  {
    id:'signal', title:'Decode the Signal', category:'COMMUNICATION CHALLENGE', icon:'📡', color:'#06b6d4',
    description:'Decode Morse, binary and substitution clues to recover the message.',
    questions:[
      {q:'In 8-bit ASCII, what character does 01000001 represent?', options:['A','B','C','D'], a:0, explain:'01000001 is decimal 65, the ASCII code for uppercase A.'},
      {q:'What is the Morse code for SOS?', options:['... --- ...','--- ... ---','.. .- ..','... ..- ...'], a:0, explain:'SOS is represented by three dots, three dashes, three dots.'},
      {q:'Decode the Caesar cipher: KHOOR (shift each letter back by 3).', options:['WORLD','HELLO','HOUSE','RADIO'], a:1, explain:'K→H, H→E, O→L, O→L, R→O.'},
      {q:'Convert binary 1010 to decimal.', options:['8','9','10','12'], a:2, explain:'8 + 0 + 2 + 0 = 10.'}
    ]
  },
  {
    id:'network', title:'Network Rescue', category:'SYSTEMS THINKING', icon:'🌐', color:'#22c55e',
    description:'Choose the best action to restore a communication network.',
    questions:[
      {q:'A department lab has no internet. The router power light is off. What should you check first?', options:['DNS settings','Power supply and adapter','Browser cache','IP subnet mask'], a:1, explain:'Start with the physical layer: verify power and the adapter before investigating higher layers.'},
      {q:'A device can ping 8.8.8.8 but cannot open websites by name. What is the likely issue?', options:['DNS resolution','Wi-Fi password','Damaged monitor','Low battery'], a:0, explain:'IP connectivity works, but name resolution fails. Check DNS configuration.'},
      {q:'Which topology offers a central point for connecting all workstations?', options:['Bus','Ring','Star','Mesh'], a:2, explain:'In a star topology, each device connects to a central switch or hub.'},
      {q:'A link is congested during peak hours. Which action is the most direct first step?', options:['Increase screen brightness','Measure traffic and identify the bottleneck','Replace every computer','Disable all security'], a:1, explain:'Measure before changing the system. Identify traffic patterns and the bottleneck.'}
    ]
  },
  {
    id:'escape', title:'Escape Mission', category:'MULTI-STAGE MYSTERY', icon:'🗝️', color:'#f59e0b',
    description:'Solve a chain of clues. Every correct answer unlocks the next stage.',
    questions:[
      {q:'Clue 1: I travel through copper, fibre and air, carrying voices and data. What am I?', options:['A resistor','A communication signal','A capacitor','A battery'], a:1, explain:'A communication signal carries information through a transmission medium.'},
      {q:'Clue 2: I have two states, 0 and 1. What number system am I?', options:['Decimal','Octal','Binary','Hexadecimal'], a:2, explain:'Binary uses exactly two digits: 0 and 1.'},
      {q:'Clue 3: I converts a digital signal into a form suitable for a channel. What process am I?', options:['Modulation','Rectification','Filtering only','Sampling only'], a:0, explain:'Modulation maps information onto a carrier or suitable transmission signal.'},
      {q:'Final lock: Which device forwards packets between different networks?', options:['Hub','Router','Repeater','Microphone'], a:1, explain:'A router forwards packets between networks using network-layer information.'}
    ]
  },
  {
    id:'tower', title:'Tower Strategy', category:'RESOURCE PLANNING', icon:'🏗️', color:'#ec4899',
    description:'Make smart choices with limited resources and changing constraints.',
    questions:[
      {q:'You have 10 building units. A stable base costs 4, each support costs 2, and the top platform costs 3. What is the maximum number of supports you can afford while including the base and top?', options:['1','2','3','4'], a:1, explain:'10 − 4 − 3 = 3 units remain, enough for one support (2), not two (4).'},
      {q:'Your team has 12 points. Choose a plan: A gives 8 points with 4 risk; B gives 6 points with 1 risk. If risk costs 2 points per unit, which has the better net score?', options:['Plan A: 0','Plan B: 4','Both equal','Plan A: 8'], a:1, explain:'A = 8 − 8 = 0. B = 6 − 2 = 4. Plan B is better.'},
      {q:'A structure is leaning. Which change is most likely to improve stability?', options:['Raise the centre of mass','Narrow the base','Widen the base','Remove all supports'], a:2, explain:'A wider base generally improves stability by increasing the support area.'},
      {q:'You can complete one task now: Task X adds 10 points; Task Y unlocks two future tasks worth 7 points each. What is the best long-term choice?', options:['Task X','Task Y','Neither','Random choice'], a:1, explain:'Task Y unlocks a potential total of 14 points, greater than 10.'}
    ]
  },
  {
    id:'memory', title:'Memory Challenge', category:'FOCUS & RECALL', icon:'🧩', color:'#a78bfa',
    description:'Remember technical sequences and identify what changed.',
    questions:[
      {q:'Memorise: 4 – 9 – 2 – 7 – 1. Which number was third?', options:['9','2','7','1'], a:1, explain:'The third number in the sequence is 2.'},
      {q:'Which sequence exactly matches: R, T, 4, K, 8, M?', options:['R,T,4,K,8,M','R,4,T,K,8,M','R,T,4,8,K,M','R,T,K,4,8,M'], a:0, explain:'The original sequence is R, T, 4, K, 8, M.'},
      {q:'A status panel showed: TX=ON, RX=OFF, LINK=ON. Which item was OFF?', options:['TX','RX','LINK','None'], a:1, explain:'RX was OFF.'},
      {q:'Remember the order: Power, Link, Data, Error. Which item came immediately before Data?', options:['Power','Link','Error','None'], a:1, explain:'Link came immediately before Data.'}
    ]
  },
  {
    id:'decision', title:'Decision Master', category:'STRATEGIC DECISIONS', icon:'♟️', color:'#fb7185',
    description:'Evaluate trade-offs and select the most effective response.',
    questions:[
      {q:'A campus emergency requires communication. The mobile network is overloaded, but the campus Wi-Fi and wired network still work. What is the best immediate action?', options:['Wait for mobile service','Use available campus network channels and inform responders','Switch off all routers','Send unverified messages'], a:1, explain:'Use functioning channels and communicate verified information to responders.'},
      {q:'Your team has 15 minutes and three tasks: safety check (5 min), fault isolation (8 min), cosmetic repair (6 min). What should be prioritised?', options:['Cosmetic repair','Safety check, then fault isolation','Ignore safety','Do all simultaneously without coordination'], a:1, explain:'Safety comes first, followed by fault isolation.'},
      {q:'Two data sources disagree. What is the most responsible decision?', options:['Choose the larger number','Verify source, timestamp and measurement method','Average them without checking','Delete both'], a:1, explain:'Validate data quality and context before making a decision.'},
      {q:'A proposed fix restores service but disables authentication. What should you do?', options:['Deploy immediately','Reject or redesign the fix to preserve security','Share passwords publicly','Ignore the risk'], a:1, explain:'Availability should not be restored by creating an unacceptable security vulnerability.'}
    ]
  }
]
