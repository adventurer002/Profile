from pathlib import Path
import math
out=Path(__file__).resolve().parents[1]/'public/images'
def save(name,bg,body):
 (out/f'project-{name}.svg').write_text(f'''<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="714" viewBox="0 0 1000 714"><defs><filter id="shadow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="24" stdDeviation="24" flood-opacity=".10"/></filter><linearGradient id="silver" x1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset=".35" stop-color="#c5cdbc"/><stop offset=".6" stop-color="#fafff1"/><stop offset="1" stop-color="#9da791"/></linearGradient><radialGradient id="orb"><stop stop-color="#effdcf"/><stop offset=".45" stop-color="#c2d69d"/><stop offset=".78" stop-color="#f0f5e8"/><stop offset="1" stop-color="#a0b087"/></radialGradient></defs><rect width="1000" height="714" fill="{bg}"/>{body}</svg>''')
body='<circle cx="500" cy="350" r="273" fill="none" stroke="#c5cfb4"/><circle cx="500" cy="350" r="220" fill="none" stroke="#c5cfb4" stroke-dasharray="3 7"/>'
body+='<text x="74" y="120" font-family="Arial" font-size="13" letter-spacing="4" fill="#6a7859">A MORE HUMAN CONNECTION</text><text x="69" y="219" font-family="Arial" font-size="84" letter-spacing="-5" fill="#34412b">Hello, intelligence.</text>'
body+='<g filter="url(#shadow)"><rect x="254" y="295" width="492" height="260" rx="24" fill="#f9fbf6"/><circle cx="500" cy="360" r="26" fill="url(#orb)"/><text x="500" y="411" text-anchor="middle" font-family="Arial" font-size="15" fill="#5c6751">A conversation that understands.</text>'
for i in range(51):
 height=9+40*abs(math.sin(i*.69))*math.exp(-((i-25)/20)**2)
 body+=f'<rect x="{322+i*7}" y="{469-height/2}" width="3" height="{height}" rx="1.5" fill="#91a875"/>'
body+='</g><text x="500" y="609" text-anchor="middle" font-family="Arial" font-size="10" letter-spacing="3" fill="#6a7859">VOICE / KNOWLEDGE / EXPERIENCE</text>'
save('voice','#e1e8d6',body)
body='<text x="70" y="124" font-family="Arial" font-size="13" letter-spacing="4" fill="#8c705b">AN INTELLIGENT CREATIVE WORKFLOW</text>'
body+='<g transform="translate(125 198) rotate(-9 140 180)" filter="url(#shadow)"><rect width="277" height="355" fill="#edeadf"/><text x="24" y="48" font-family="Arial" font-size="11" fill="#6b655d">STUDIO / 01</text><circle cx="138" cy="187" r="84" fill="#a8b18a"/><ellipse cx="139" cy="170" rx="55" ry="70" fill="url(#silver)"/><text x="24" y="326" font-family="Georgia" font-style="italic" font-size="39" fill="#4c5942">Natural forms.</text></g>'
body+='<g transform="translate(370 150) rotate(5 150 205)" filter="url(#shadow)"><rect width="300" height="413" fill="#788365"/><text x="24" y="49" font-family="Arial" font-size="10" letter-spacing="3" fill="#e6ecda">IDEAS IN MOTION</text><text x="21" y="153" font-family="Georgia" font-size="75" fill="#f4f0df">Make</text><text x="21" y="228" font-family="Georgia" font-style="italic" font-size="75" fill="#f4f0df">room</text><text x="21" y="303" font-family="Georgia" font-size="75" fill="#f4f0df">for more.</text><path d="M25 348h250" stroke="#d4dfc1"/><text x="24" y="381" font-family="Arial" font-size="10" letter-spacing="2" fill="#e6ecda">THINK. GENERATE. REFINE.</text></g>'
body+='<g transform="translate(669 257) rotate(13 100 140)" filter="url(#shadow)"><rect width="215" height="290" fill="#f8f4e9"/><text x="20" y="43" font-family="Arial" font-size="10" letter-spacing="2" fill="#7c7266">NEW PERSPECTIVES</text><path d="M38 179 Q36 65 112 87 Q189 96 166 178 Q148 240 83 218 Q38 199 64 141" fill="none" stroke="#d6b395" stroke-width="30"/><text x="20" y="268" font-family="Georgia" font-size="20" fill="#71604f">Beyond the prompt.</text></g>'
save('content','#e9dfd2',body)
body='<text x="69" y="126" font-family="Arial" font-size="13" letter-spacing="4" fill="#708899">FIND THE MOMENT THAT MATTERS</text><text x="67" y="213" font-family="Arial" font-size="77" letter-spacing="-4" fill="#344b5c">Long story. Short.</text>'
body+='<g filter="url(#shadow)"><rect x="123" y="270" width="754" height="297" rx="13" fill="#f7fafb"/><rect x="143" y="290" width="714" height="35" rx="5" fill="#edf1f4"/><circle cx="160" cy="307" r="4" fill="#aac0cc"/><circle cx="175" cy="307" r="4" fill="#cad6dd"/><text x="199" y="311" font-family="Arial" font-size="10" fill="#7790a0">HIGHLIGHT STUDIO</text><text x="775" y="312" font-family="Arial" font-size="9" fill="#7790a0">06:00:00</text>'
for i,col in enumerate(['#8da8b7','#bbcbcf','#728c9b','#a6b9c7','#c2cfd4']):
 x=146+i*144
 body+=f'<rect x="{x}" y="342" width="135" height="91" rx="5" fill="{col}"/><circle cx="{x+66}" cy="385" r="26" fill="#ffffff22"/><path d="M{x+62} 375l14 10-14 10z" fill="#ffffff99"/>'
for i in range(115):
 ht=7+19*abs(math.sin(i*.8))*abs(math.sin(i*.21))
 body+=f'<rect x="{153+i*6}" y="{473-ht/2}" width="3" height="{ht}" rx="1" fill="#7d9aaa"/>'
body+='<rect x="307" y="337" width="220" height="161" rx="7" fill="#dcecb111" stroke="#a8bf75" stroke-width="3"/><path d="M421 333v174" stroke="#637e41" stroke-width="2"/><rect x="145" y="521" width="85" height="20" rx="10" fill="#e3ecd5"/><text x="159" y="535" font-family="Arial" font-size="9" fill="#6f8553">AI SELECTED</text><text x="667" y="535" font-family="Arial" font-size="10" fill="#7e94a1">EXTRACT THE EXTRAORDINARY</text></g>'
save('clips','#dce5ea',body)
body='<text x="71" y="124" font-family="Arial" font-size="13" letter-spacing="4" fill="#8b9887">ONE FOUNDATION. MANY POSSIBILITIES.</text><text x="68" y="216" font-family="Arial" font-size="81" letter-spacing="-4" fill="#e1e8da">Connected intelligence.</text>'
for x,y,label in [(231,337,'LLM'),(770,337,'RAG'),(231,560,'MEMORY'),(770,560,'PROMPT')]:
 body+=f'<path d="M500 445L{x} {y}" stroke="#748961" stroke-width="1"/><circle cx="{x}" cy="{y}" r="56" fill="#242e24" stroke="#58634f"/><text x="{x}" y="{y+5}" text-anchor="middle" fill="#cbd7be" font-family="Arial" font-size="13" letter-spacing="2">{label}</text>'
body+='<circle cx="500" cy="445" r="141" fill="none" stroke="#414f3d" stroke-dasharray="3 8"/><circle cx="500" cy="445" r="103" fill="none" stroke="#596c4b"/><circle cx="500" cy="445" r="76" fill="url(#orb)"/><text x="500" y="455" text-anchor="middle" font-family="Arial" font-size="29" letter-spacing="-1" fill="#35432a">MCP</text><text x="500" y="655" text-anchor="middle" font-family="Arial" font-size="9" letter-spacing="3" fill="#8b9887">SHARED CAPABILITIES / COLLECTIVE INTELLIGENCE</text>'
save('mcp','#1c251e',body)
print('4 project concept covers generated')
