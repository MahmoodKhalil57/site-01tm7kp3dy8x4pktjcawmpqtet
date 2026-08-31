import{o as e,t}from"./react.0T9Avz-T.js";import{t as n}from"./jsx-runtime.Dshd5hIJ.js";import{a as r,c as i,d as a,f as o,h as s,i as c,l,m as u,n as d,o as f,p,r as m,s as h,t as g,u as _}from"./react-three-fiber.esm.DJb2hSvt.js";function v(){return v=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},v.apply(null,arguments)}var y=e(t());function b(e,t,n){let r=m(e=>e.size),a=m(e=>e.viewport),o=typeof e==`number`?e:r.width*a.dpr,c=typeof t==`number`?t:r.height*a.dpr,u=(typeof e==`number`?n:e)||{},{samples:d=0,depth:f,...p}=u,g=f??u.depthBuffer,v=y.useMemo(()=>{let e=new s(o,c,{minFilter:_,magFilter:_,type:l,...p});return g&&(e.depthTexture=new h(o,c,i)),e.samples=d,e},[]);return y.useLayoutEffect(()=>{v.setSize(o,c),d&&(v.samples=d)},[d,v,o,c]),y.useEffect(()=>()=>v.dispose(),[]),v}var x=e=>typeof e==`function`,S=y.forwardRef(({envMap:e,resolution:t=256,frames:n=1/0,makeDefault:r,children:i,...a},o)=>{let s=m(({set:e})=>e),c=m(({camera:e})=>e),l=m(({size:e})=>e),u=y.useRef(null);y.useImperativeHandle(o,()=>u.current,[]);let f=y.useRef(null),p=b(t);y.useLayoutEffect(()=>{a.manual||(u.current.aspect=l.width/l.height)},[l,a]),y.useLayoutEffect(()=>{u.current.updateProjectionMatrix()});let h=0,g=null,_=x(i);return d(t=>{_&&(n===1/0||h<n)&&(f.current.visible=!1,t.gl.setRenderTarget(p),g=t.scene.background,e&&(t.scene.background=e),t.gl.render(t.scene,u.current),t.scene.background=g,t.gl.setRenderTarget(null),f.current.visible=!0,h++)}),y.useLayoutEffect(()=>{if(r){let e=c;return s(()=>({camera:u.current})),()=>s(()=>({camera:e}))}},[u,r,s]),y.createElement(y.Fragment,null,y.createElement(`perspectiveCamera`,v({ref:u},a),!_&&i),y.createElement(`group`,{ref:f},_&&i(p.texture)))}),C=Math.PI/180;180/Math.PI;function w(e){return e*C}var T=n(),E=`--background`,D=`--primary`;function O(e,t){let n=o.physical,{vertexShader:r,fragmentShader:i,uniforms:a}=n,s=n.defines??{},c=u.clone(a),l=new e(t.material||{});l.color&&(c.diffuse.value=l.color),`roughness`in l&&(c.roughness.value=l.roughness),`metalness`in l&&(c.metalness.value=l.metalness),`envMap`in l&&(c.envMap.value=l.envMap),`envMapIntensity`in l&&(c.envMapIntensity.value=l.envMapIntensity),Object.entries(t.uniforms??{}).forEach(([e,t])=>{c[e]=typeof t==`object`&&t&&`value`in t?t:{value:t}});let d=`${t.header}\n${t.vertexHeader??``}\n${r}`,f=`${t.header}\n${t.fragmentHeader??``}\n${i}`;for(let[e,n]of Object.entries(t.vertex??{}))d=d.replace(e,`${e}\n${n}`);for(let[e,n]of Object.entries(t.fragment??{}))f=f.replace(e,`${e}\n${n}`);return new p({defines:{...s},uniforms:c,vertexShader:d,fragmentShader:f,lights:!0,fog:!!t.material?.fog})}var k=({children:e})=>{let[t,n]=(0,y.useState)(!1);return(0,y.useEffect)(()=>{let e=requestAnimationFrame(()=>{let e=requestAnimationFrame(()=>n(!0));return()=>cancelAnimationFrame(e)});return()=>cancelAnimationFrame(e)},[]),(0,T.jsx)(`div`,{style:{width:`100%`,height:`100%`,position:`relative`,opacity:+!!t,transition:`opacity 0.4s ease`},children:(0,T.jsx)(g,{dpr:[1,1.5],frameloop:`always`,className:`w-full h-full`,resize:{debounce:0,scroll:!1},children:e})})},A=e=>{let t=e.replace(`#`,``),n=parseInt(t.substring(0,2),16),r=parseInt(t.substring(2,4),16),i=parseInt(t.substring(4,6),16);return[n/255,r/255,i/255]};function j(e){let t=e.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/);if(!t)return null;let n=parseFloat(t[1]),r=parseFloat(t[2]),i=parseFloat(t[3])*Math.PI/180,a=r*Math.cos(i),o=r*Math.sin(i),s=n+.3963377774*a+.2158037573*o,c=n-.1055613458*a-.0638541728*o,l=n-.0894841775*a-1.291485548*o,u=s*s*s,d=c*c*c,f=l*l*l,p=4.0767416621*u-3.3077115913*d+.2309699292*f,m=-1.2684380046*u+2.6097574011*d-.3413193965*f,h=-.0041960863*u-.7034186147*d+1.707614701*f,g=e=>(e=Math.max(0,Math.min(1,e)),e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055);return p=Math.round(g(p)*255),m=Math.round(g(m)*255),h=Math.round(g(h)*255),`#${p.toString(16).padStart(2,`0`)}${m.toString(16).padStart(2,`0`)}${h.toString(16).padStart(2,`0`)}`}function M(e,t){if(typeof document>`u`)return t;let n=getComputedStyle(document.documentElement).getPropertyValue(e).trim();return n?j(n)??t:t}var N=`
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) +
           (c - a)* u.y * (1.0 - u.x) +
           (d - b) * u.x * u.y;
}
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
float cnoise(vec3 P){
  vec3 Pi0 = floor(P);
  vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;
  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);
  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);
  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);
  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
  vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
  g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
  g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;
  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x,Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x,Pf1.y,Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy,Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy,Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x,Pf0.y,Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x,Pf1.yz));
  float n111 = dot(g111, Pf1);
  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);
  vec2 n_yz = mix(n_z.xy,n_z.zw,fade_xyz.y);
  float n_xyz = mix(n_yz.x,n_yz.y,fade_xyz.x);
  return 2.2 * n_xyz;
}
`,P=({beamWidth:e=2,beamHeight:t=15,beamNumber:n=12,speed:r=2,noiseIntensity:i=1.75,scale:o=.2,rotation:s=0})=>{let c=(0,y.useRef)(null),[l,u]=(0,y.useState)(()=>M(E,`#000000`)),[d,p]=(0,y.useState)(()=>M(D,`#7c3aed`)),m=(0,y.useCallback)(()=>{u(M(E,`#000000`)),p(M(D,`#7c3aed`))},[]);(0,y.useEffect)(()=>{let e=new MutationObserver(m);return e.observe(document.documentElement,{attributes:!0,attributeFilter:[`data-theme`,`class`]}),()=>e.disconnect()},[m]);let h=(0,y.useMemo)(()=>O(a,{header:`
  varying vec3 vEye;
  varying float vNoise;
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float time;
  uniform float uSpeed;
  uniform float uNoiseIntensity;
  uniform float uScale;
  ${N}`,vertexHeader:`
  float getPos(vec3 pos) {
    vec3 noisePos =
      vec3(pos.x * 0., pos.y - uv.y, pos.z + time * uSpeed * 3.) * uScale;
    return cnoise(noisePos);
  }
  vec3 getCurrentPos(vec3 pos) {
    vec3 newpos = pos;
    newpos.z += getPos(pos);
    return newpos;
  }
  vec3 getNormal(vec3 pos) {
    vec3 curpos = getCurrentPos(pos);
    vec3 nextposX = getCurrentPos(pos + vec3(0.01, 0.0, 0.0));
    vec3 nextposZ = getCurrentPos(pos + vec3(0.0, -0.01, 0.0));
    vec3 tangentX = normalize(nextposX - curpos);
    vec3 tangentZ = normalize(nextposZ - curpos);
    return normalize(cross(tangentZ, tangentX));
  }`,fragmentHeader:``,vertex:{"#include <begin_vertex>":`transformed.z += getPos(transformed.xyz);`,"#include <beginnormal_vertex>":`objectNormal = getNormal(position.xyz);`},fragment:{"#include <dithering_fragment>":`
    float randomNoise = noise(gl_FragCoord.xy);
    gl_FragColor.rgb -= randomNoise / 15. * uNoiseIntensity;`},material:{fog:!0},uniforms:{diffuse:new f(...A(l)),time:{shared:!0,mixed:!0,linked:!0,value:0},roughness:.3,metalness:.3,uSpeed:{shared:!0,mixed:!0,linked:!0,value:r},envMapIntensity:10,uNoiseIntensity:i,uScale:o}}),[l,r,i,o]);return(0,T.jsxs)(k,{children:[(0,T.jsxs)(`group`,{rotation:[0,0,w(s)],children:[(0,T.jsx)(L,{ref:c,material:h,count:n,width:e,height:t}),(0,T.jsx)(R,{color:d,position:[0,3,10]})]}),(0,T.jsx)(`color`,{attach:`background`,args:[l]}),(0,T.jsx)(S,{makeDefault:!0,position:[0,0,20],fov:30})]})};function F(e,t,n,i,a){let o=new r,s=e*(a+1)*2,l=e*a*2,u=new Float32Array(s*3),d=new Uint32Array(l*3),f=new Float32Array(s*2),p=0,m=0,h=0,g=-(e*t+(e-1)*i)/2;for(let r=0;r<e;r++){let e=g+r*(t+i),o=Math.random()*300,s=Math.random()*300;for(let r=0;r<=a;r++){let i=n*(r/a-.5),c=[e,i,0],l=[e+t,i,0];u.set([...c,...l],p*3);let g=r/a;if(f.set([o,g+s,o+1,g+s],h),r<a){let e=p,t=p+1,n=p+2,r=p+3;d.set([e,t,n,n,t,r],m),m+=6}p+=2,h+=4}}return o.setAttribute(`position`,new c(u,3)),o.setAttribute(`uv`,new c(f,2)),o.setIndex(new c(d,1)),o.computeVertexNormals(),o}var I=(0,y.forwardRef)(({material:e,width:t,count:n,height:r},i)=>{let a=(0,y.useRef)(null);(0,y.useImperativeHandle)(i,()=>a.current);let o=(0,y.useMemo)(()=>F(n,t,r,0,100),[n,t,r]);return d((e,t)=>{a.current.material.uniforms.time.value+=.1*t}),(0,T.jsx)(`mesh`,{ref:a,geometry:o,material:e})});I.displayName=`MergedPlanes`;var L=(0,y.forwardRef)((e,t)=>(0,T.jsx)(I,{ref:t,material:e.material,width:e.width,count:e.count,height:e.height}));L.displayName=`PlaneNoise`;var R=({position:e,color:t})=>{let n=(0,y.useRef)(null);return(0,y.useEffect)(()=>{if(!n.current)return;let e=n.current.shadow.camera;e.top=24,e.bottom=-24,e.left=-24,e.right=24,e.far=64,n.current.shadow.bias=-.004},[]),(0,T.jsx)(`directionalLight`,{ref:n,color:t,intensity:1,position:e})};export{P as default};