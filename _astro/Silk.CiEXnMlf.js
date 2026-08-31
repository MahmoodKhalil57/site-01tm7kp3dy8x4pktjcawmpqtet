import{o as e,t}from"./react.0T9Avz-T.js";import{t as n}from"./jsx-runtime.Dshd5hIJ.js";import{n as r,o as i,r as a,t as o}from"./react-three-fiber.esm.DJb2hSvt.js";var s=e(t(),1),c=n(),l=e=>{let t=e.replace(`#`,``);return[parseInt(t.slice(0,2),16)/255,parseInt(t.slice(2,4),16)/255,parseInt(t.slice(4,6),16)/255]};function u(e){let t=e.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/);if(!t)return null;let n=parseFloat(t[1]),r=parseFloat(t[2]),i=parseFloat(t[3])*Math.PI/180,a=r*Math.cos(i),o=r*Math.sin(i),s=n+.3963377774*a+.2158037573*o,c=n-.1055613458*a-.0638541728*o,l=n-.0894841775*a-1.291485548*o,u=s*s*s,d=c*c*c,f=l*l*l,p=4.0767416621*u-3.3077115913*d+.2309699292*f,m=-1.2684380046*u+2.6097574011*d-.3413193965*f,h=-.0041960863*u-.7034186147*d+1.707614701*f,g=e=>(e=Math.max(0,Math.min(1,e)),e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055);return p=Math.round(g(p)*255),m=Math.round(g(m)*255),h=Math.round(g(h)*255),`#${p.toString(16).padStart(2,`0`)}${m.toString(16).padStart(2,`0`)}${h.toString(16).padStart(2,`0`)}`}function d(e,t){if(typeof document>`u`)return t;let n=getComputedStyle(document.documentElement).getPropertyValue(e).trim();return n?u(n)??t:t}var f=`
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,p=`
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform vec3  uBackground;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec3 col = mix(uBackground, uColor, pattern) - rnd / 15.0 * uNoiseIntensity;
  gl_FragColor = vec4(col, 1.0);
}
`,m=(0,s.forwardRef)(function({uniforms:e},t){let{viewport:n}=a();return(0,s.useLayoutEffect)(()=>{let e=t;e.current&&e.current.scale.set(n.width,n.height,1)},[t,n]),r((e,n)=>{let r=t;if(r.current){let e=r.current.material;e.uniforms.uTime.value+=.1*n}}),(0,c.jsxs)(`mesh`,{ref:t,children:[(0,c.jsx)(`planeGeometry`,{args:[1,1,1,1]}),(0,c.jsx)(`shaderMaterial`,{uniforms:e,vertexShader:f,fragmentShader:p})]})});m.displayName=`SilkPlane`;var h=({speed:e=5,scale:t=1,color:n,noiseIntensity:r=1.5,rotation:a=0})=>{let u=(0,s.useRef)(null),[f,p]=(0,s.useState)(()=>n??d(`--primary`,`#7c3aed`)),[h,g]=(0,s.useState)(()=>d(`--background`,`#000000`)),_=(0,s.useCallback)(()=>{n||p(d(`--primary`,`#7c3aed`)),g(d(`--background`,`#000000`))},[n]);(0,s.useEffect)(()=>{let e=new MutationObserver(_);return e.observe(document.documentElement,{attributes:!0,attributeFilter:[`data-theme`,`class`]}),()=>e.disconnect()},[_]);let v=n??f,y=(0,s.useMemo)(()=>({uSpeed:{value:e},uScale:{value:t},uNoiseIntensity:{value:r},uColor:{value:new i(...l(v))},uBackground:{value:new i(...l(h))},uRotation:{value:a},uTime:{value:0}}),[e,t,r,v,h,a]);return(0,c.jsx)(o,{dpr:[1,1.5],frameloop:`always`,children:(0,c.jsx)(m,{ref:u,uniforms:y})})};export{h as default};