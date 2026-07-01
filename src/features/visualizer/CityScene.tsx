"use client";

import React, { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Instances, Instance } from "@react-three/drei";
import { RepoFile } from "./Fetcher";
import { buildTreemap, TreemapNode } from "./CityBuilder";
import * as THREE from "three";
import { useTheme } from "@/components/ThemeProvider";

const FileInstanceBlock = ({ 
  node, 
  maxSize,
  onHover 
}: { 
  node: TreemapNode; 
  maxSize: number;
  onHover: (node: TreemapNode | null) => void;
}) => {
  const [hovered, setHovered] = useState(false);
  
  const baseHeight = 0.5;
  const maxHeight = 15;
  const height = baseHeight + (Math.log(node.size + 1) / Math.log(maxSize + 1)) * maxHeight;
  
  const centerX = node.x + node.width / 2;
  const centerZ = node.y + node.height / 2;

  React.useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => { document.body.style.cursor = 'auto'; };
  }, [hovered]);

  if (node.width < 1 || node.height < 1) return null;

  return (
    <group position={[centerX, 0, centerZ]}>
      <Instance
        position={[0, height / 2, 0]}
        scale={[node.width * 0.92, height, node.height * 0.92]}
        color={hovered ? "#60a5fa" : node.color}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); onHover(node); }}
        onPointerOut={() => { setHovered(false); onHover(null); }}
      />
      
      {hovered && (
        <Html distanceFactor={50} center position={[0, height + 3, 0]} zIndexRange={[100, 0]}>
          <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] p-4 rounded-md border border-[var(--border-color)] shadow-lg pointer-events-none min-w-[250px] max-w-[400px]">
            <div className="font-bold text-[var(--text-primary)] text-base mb-2 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: node.color }}></span>
              <span className="truncate">{node.name}</span>
            </div>
            <div className="text-sm text-[var(--text-secondary)] mb-2 font-medium">
              <span className="opacity-70">Size:</span> {(node.size / 1024).toFixed(1)} KB
            </div>
            <div className="text-xs text-[var(--text-primary)] font-mono bg-[var(--bg-secondary)] border border-[var(--border-color)] px-2 py-1.5 rounded-sm break-all">
              {node.path}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

const FolderOutline = ({ node, depth, theme }: { node: TreemapNode; depth: number, theme: string }) => {
  if (node.width < 2 || node.height < 2) return null;
  
  const centerX = node.x + node.width / 2;
  const centerZ = node.y + node.height / 2;
  const opacity = Math.max(0.05, 0.2 - depth * 0.05);
  
  const showLabel = node.width > 10 && node.height > 10 && depth <= 3;
  
  // Architectural blueprint colors
  const folderColor = theme === 'dark' ? "#FFFFFF" : "#000000";
  const edgeColor = theme === 'dark' ? "#555555" : "#CCCCCC";
  
  return (
    <group position={[centerX, 0.05 + depth * 0.02, centerZ]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[node.width - 0.3, node.height - 0.3]} />
        <meshBasicMaterial 
          color={folderColor} 
          transparent 
          opacity={opacity}
        />
      </mesh>
      
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(node.width - 0.3, node.height - 0.3)]} />
        <lineBasicMaterial 
          color={edgeColor} 
          transparent 
          opacity={0.5} 
        />
      </lineSegments>
      
      {showLabel && (
        <Html
          position={[0, 0.5, 0]}
          center
          distanceFactor={80}
          style={{ pointerEvents: 'none' }}
        >
          <div 
            className="px-2 py-1 text-center whitespace-nowrap bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-sm shadow-sm"
            style={{
              fontSize: depth === 0 ? '14px' : depth === 1 ? '12px' : '10px',
              fontWeight: depth <= 1 ? '600' : '400',
              opacity: 0.8
            }}
          >
             {node.name}
          </div>
        </Html>
      )}
    </group>
  );
};

const CitySceneRenderer = ({ 
  treemap, 
  maxSize,
  onHover,
  theme
}: { 
  treemap: TreemapNode; 
  maxSize: number;
  onHover: (node: TreemapNode | null) => void;
  theme: string;
}) => {
  const files: TreemapNode[] = [];
  const folders: { node: TreemapNode, depth: number }[] = [];
  
  const traverse = (node: TreemapNode, depth: number) => {
    if (node.type === "file") files.push(node);
    else {
      if (depth > 0) folders.push({ node, depth });
      node.children.forEach(c => traverse(c, depth + 1));
    }
  };
  traverse(treemap, 0);

  return (
    <group>
      {folders.map(f => (
        <FolderOutline key={f.node.path} node={f.node} depth={f.depth} theme={theme} />
      ))}
      
      <Instances limit={Math.max(files.length, 1)}>
        <boxGeometry />
        <meshStandardMaterial roughness={0.2} metalness={0.1} />
        {files.map(f => (
          <FileInstanceBlock key={f.path} node={f} maxSize={maxSize} onHover={onHover} />
        ))}
      </Instances>
    </group>
  );
};

export const CityScene = ({ files }: { files: RepoFile[] }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hoveredNode, setHoveredNode] = useState<TreemapNode | null>(null);
  const { theme } = useTheme();
  
  const treemap = useMemo(() => buildTreemap(files), [files]);
  
  const maxSize = useMemo(() => {
    let max = 0;
    const traverse = (node: TreemapNode) => {
      if (node.type === "file") max = Math.max(max, node.size);
      node.children.forEach(traverse);
    };
    traverse(treemap);
    return max;
  }, [treemap]);

  const center = treemap.width / 2;

  const bgColor = theme === 'dark' ? '#0A0A0A' : '#FAFAFA';
  const gridColor = theme === 'dark' ? '#333333' : '#EAEAEA';
  const gridCenterColor = theme === 'dark' ? '#555555' : '#CCCCCC';
  const groundColor = theme === 'dark' ? '#111111' : '#FFFFFF';

  return (
    <Canvas
      gl={{ antialias: true }}
      camera={{
        position: [center * 1.5, center * 1.2, center * 1.5],
        fov: 50,
        near: 0.1,
        far: Math.max(3000, center * 10)
      }}
    >
      <color attach="background" args={[bgColor]} />
      <ambientLight intensity={theme === 'dark' ? 0.4 : 0.8} />
      <directionalLight position={[100, 100, 50]} intensity={theme === 'dark' ? 0.8 : 0.5} />
      <directionalLight position={[-50, 50, -50]} intensity={0.3} />

      <OrbitControls
        target={[center, 0, center]}
        makeDefault
        enableDamping
        dampingFactor={0.05}
        autoRotate={true}
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={20}
        maxDistance={Math.max(1000, center * 4)}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[center, -0.1, center]}>
        <planeGeometry args={[treemap.width * 1.5, treemap.height * 1.5]} />
        <meshStandardMaterial color={groundColor} roughness={0.9} />
      </mesh>

      <gridHelper
        args={[treemap.width * 1.3, 30, gridCenterColor, gridColor]}
        position={[center, 0, center]}
      />

      <CitySceneRenderer treemap={treemap} maxSize={maxSize} onHover={setHoveredNode} theme={theme} />

      <fog attach="fog" args={[bgColor, Math.max(100, center * 1.5), Math.max(800, center * 5)]} />
    </Canvas>
  );
};
