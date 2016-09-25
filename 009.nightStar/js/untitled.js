function f(e){
  g=g?q.createElement("canvas"):q.body.children.c;
  g.width=e*100;
  g.height=c;
  a=g.getContext("2d");
  r.push(g);
  for(b in a){
    a[(b[7]||b[0])+b[b[2].charCodeAt(0)%b.length]]=a[b];
  }
}
function m(e,n,o){
  a.sv();
  a.rotate(o);
  a.tt(0,-e);
  a.sa(n,n);
  o=l;
  l*=n;
  s();
  a.restore();
  l=o;
}
function s(){
  if(l>0.04){
    if(d(1)<0.04){
      m(0,0.7,-0.15);
      m(0,0.7,0.15);
    }else {
      a.tR(0,0,9,9);
      m(4,1,d(1)<0.5?0.08:-0.08);
    }
  }
}
function d(e){
  return t.random()*e;
}
function h(e){
  a.fillStyle=e;
}
var a,g,q=document,t=Math,r=[],w="#FFF",c=400,p=i=0,l=1,b=f(9),j=a;
f(9);
k=a;
h(w);
f(9);
u=a;
h("rgba(0,0,0,.05)");
f(10);
for(h(w);i++<200;){
  a.tR(d(1000),d(c),d(3),d(3));
}
f(15);
b=a.ar(c,120,20,c,120,900);
b.P=b.addColorStop;
b.P(0.1,w);
b.P(0.11,"rgba(255,255,255,.3)");
b.P(1,"rgba(4,129,227,0)");
h(b);
a.tR(0,0,1500,c);
f(20);
h("#002b57");
for(a.tt(c,c);p++<4;a.tt(c,0)){
  s();
}
setInterval(function(){
  j.ce(0,0,900,c);
  j.gg(k.cn,0,0);
  k.ce(0,0,900,c);
  k.gg(j.cn,-1,1);
  u.tR(0,0,900,c);
  u.gg(k.cn,0,0);
  d(1)<0.03&&k.tR(d(1000),0,d(3),d(3));
  j.tR(0,0,900,c);
  for(i=1;++i<6;){
    j.gg(b=r[i],t.abs(p%2-1)*-(b.width-900),0);
  }
  p+=0.001;
},10);