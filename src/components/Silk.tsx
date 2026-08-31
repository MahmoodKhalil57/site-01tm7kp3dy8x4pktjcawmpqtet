import React, {
  forwardRef,
  useMemo,
  useRef,
  useLayoutEffect,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Canvas, useFrame, useThree, type RootState } from "@react-three/fiber";
import { Color, Mesh, ShaderMaterial } from "three";
import type { IUniform } from "three";

type NormalizedRGB = [number, number, number];

const hexToNormalizedRGB = (hex: string): NormalizedRGB => {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return [r, g, b];
};

function oklchToHex(oklchStr: string): string | null {
  const match = oklchStr.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/);
  if (!match) return null;

  const L = parseFloat(match[1]);
  const C = parseFloat(match[2]);
  const H = parseFloat(match[3]);

  const hRad = (H * Math.PI) / 180;
  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  let rr = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  let gg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  let bb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  const gamma = (x: number) => {
    x = Math.max(0, Math.min(1, x));
    return x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;
  };

  rr = Math.round(gamma(rr) * 255);
  gg = Math.round(gamma(gg) * 255);
  bb = Math.round(gamma(bb) * 255);

  return `#${rr.toString(16).padStart(2, "0")}${gg.toString(16).padStart(2, "0")}${bb.toString(16).padStart(2, "0")}`;
}

function cssVarToHex(varName: string, fallback: string): string {
  if (typeof document === "undefined") return fallback;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  if (!raw) return fallback;
  return oklchToHex(raw) ?? fallback;
}

interface UniformValue<T = number | Color> {
  value: T;
}

interface SilkUniforms {
  uSpeed: UniformValue<number>;
  uScale: UniformValue<number>;
  uNoiseIntensity: UniformValue<number>;
  uColor: UniformValue<Color>;
  uBackground: UniformValue<Color>;
  uRotation: UniformValue<number>;
  uTime: UniformValue<number>;
  [uniform: string]: IUniform;
}

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
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
`;

interface SilkPlaneProps {
  uniforms: SilkUniforms;
}

const SilkPlane = forwardRef<Mesh, SilkPlaneProps>(function SilkPlane(
  { uniforms },
  ref,
) {
  const { viewport } = useThree();

  useLayoutEffect(() => {
    const mesh = ref as React.MutableRefObject<Mesh | null>;
    if (mesh.current) {
      mesh.current.scale.set(viewport.width, viewport.height, 1);
    }
  }, [ref, viewport]);

  useFrame((_state: RootState, delta: number) => {
    const mesh = ref as React.MutableRefObject<Mesh | null>;
    if (mesh.current) {
      const material = mesh.current.material as ShaderMaterial & {
        uniforms: SilkUniforms;
      };
      material.uniforms.uTime.value += 0.1 * delta;
    }
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
});
SilkPlane.displayName = "SilkPlane";

export interface SilkProps {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
}

const Silk: React.FC<SilkProps> = ({
  speed = 5,
  scale = 1,
  color,
  noiseIntensity = 1.5,
  rotation = 0,
}) => {
  const meshRef = useRef<Mesh>(null);

  const [resolvedColor, setResolvedColor] = useState(
    () => color ?? cssVarToHex("--primary", "#7c3aed"),
  );
  const [bgColor, setBgColor] = useState(() =>
    cssVarToHex("--background", "#000000"),
  );

  const resolveColor = useCallback(() => {
    if (!color) {
      setResolvedColor(cssVarToHex("--primary", "#7c3aed"));
    }
    setBgColor(cssVarToHex("--background", "#000000"));
  }, [color]);

  useEffect(() => {
    const observer = new MutationObserver(resolveColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });
    return () => observer.disconnect();
  }, [resolveColor]);

  const actualColor = color ?? resolvedColor;

  const uniforms = useMemo<SilkUniforms>(
    () => ({
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uColor: { value: new Color(...hexToNormalizedRGB(actualColor)) },
      uBackground: { value: new Color(...hexToNormalizedRGB(bgColor)) },
      uRotation: { value: rotation },
      uTime: { value: 0 },
    }),
    [speed, scale, noiseIntensity, actualColor, bgColor, rotation],
  );

  return (
    <Canvas dpr={[1, 1.5]} frameloop="always">
      <SilkPlane ref={meshRef} uniforms={uniforms} />
    </Canvas>
  );
};

export default Silk;
