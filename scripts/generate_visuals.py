from PIL import Image, ImageDraw, ImageFilter
import numpy as np, subprocess, math
from pathlib import Path
out=Path(__file__).resolve().parents[1]/'public/images'
w,h=1100,900
u,v=np.meshgrid(np.linspace(0,2*np.pi,145),np.linspace(0,2*np.pi,65),indexing='ij')
r=1.65+.17*np.cos(3*u)
x=(r+.63*np.cos(v))*np.cos(u); y=(r+.63*np.cos(v))*np.sin(u); z=.63*np.sin(v)+.20*np.sin(3*u)
base=np.stack([x,y,z],axis=-1)
back=Image.new('RGB',(w,h),(247,247,244))
shadow=Image.new('RGBA',(w,h)); d=ImageDraw.Draw(shadow); d.ellipse((280,710,890,755),fill=(35,40,35,42)); shadow=shadow.filter(ImageFilter.GaussianBlur(28));back.paste(shadow,(0,0),shadow)
p=subprocess.Popen(['ffmpeg','-y','-loglevel','error','-f','rawvideo','-vcodec','rawvideo','-pix_fmt','rgb24','-s',f'{w}x{h}','-r','24','-i','-','-an','-c:v','libx264','-crf','23','-pix_fmt','yuv420p','-movflags','+faststart',str(out/'hero-motion.mp4')],stdin=subprocess.PIPE)
for frame in range(120):
 t=frame/120*2*np.pi
 a=.72+.13*np.sin(t); b=-.55+.12*np.cos(t)
 rx=np.array([[1,0,0],[0,np.cos(a),-np.sin(a)],[0,np.sin(a),np.cos(a)]])
 ry=np.array([[np.cos(b),0,np.sin(b)],[0,1,0],[-np.sin(b),0,np.cos(b)]])
 rz=np.array([[.87,-.493,0],[.493,.87,0],[0,0,1]])
 pts=base@rx.T@ry.T@rz.T
 q=np.stack([pts[:-1,:-1],pts[1:,:-1],pts[1:,1:],pts[:-1,1:]],axis=2).reshape(-1,4,3)
 n=np.cross(q[:,1]-q[:,0],q[:,3]-q[:,0]); n/=np.maximum(np.linalg.norm(n,axis=1,keepdims=True),1e-8)
 light=np.abs(n@np.array([.25,-.45,.85])); bands=.5+.5*np.sin(n[:,0]*9+n[:,1]*5+n[:,2]*3)
 shade=np.clip(65+135*light+47*bands,35,251)
 img=back.copy();draw=ImageDraw.Draw(img)
 for i in np.argsort(q[:,:,2].mean(axis=1)):
  poly=q[i]; scale=148*(1+poly[:,2]*.025); xy=np.stack([poly[:,0]*scale+575,poly[:,1]*scale+425],axis=-1)
  c=int(shade[i]); draw.polygon([tuple(p) for p in xy],fill=(c,min(255,c+2),min(255,c+3)))
 if frame==0: img.save(out/'hero-poster.webp',quality=90)
 p.stdin.write(img.tobytes())
p.stdin.close();p.wait();print('Hero video generated')
