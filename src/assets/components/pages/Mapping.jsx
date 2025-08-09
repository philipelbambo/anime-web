import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Package, Truck, Clock, CheckCircle } from 'lucide-react';
import * as THREE from 'three';

const Mapping = () => {
  const mapRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const truckRef = useRef(null);
  const packageRef = useRef(null);
  const [trackingStage, setTrackingStage] = useState(3);

  // Tracking stages
  const stages = [
    { id: 0, label: 'Order Placed', icon: CheckCircle, completed: true, location: 'Warehouse' },
    { id: 1, label: 'Processing', icon: Package, completed: true, location: 'Warehouse' },
    { id: 2, label: 'Shipped', icon: Truck, completed: true, location: 'Distribution Center' },
    { id: 3, label: 'In Transit', icon: Truck, completed: true, location: 'On Route' },
    { id: 4, label: 'Out for Delivery', icon: Truck, completed: false, location: 'Local Hub' },
    { id: 5, label: 'Delivered', icon: CheckCircle, completed: false, location: 'Your Address' }
  ];

  useEffect(() => {
    if (mapRef.current && !sceneRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

      renderer.setSize(800, 600);
      renderer.setClearColor(0x87CEEB, 1);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      mapRef.current.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(10, 10, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      scene.add(directionalLight);

      const groundGeometry = new THREE.PlaneGeometry(25, 20);
      const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x90EE90 });
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.receiveShadow = true;
      scene.add(ground);

      const roadGeometry = new THREE.PlaneGeometry(2.5, 20);
      const roadMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
      const road = new THREE.Mesh(roadGeometry, roadMaterial);
      road.rotation.x = -Math.PI / 2;
      road.position.y = 0.01;
      scene.add(road);

      const lineGeometry = new THREE.PlaneGeometry(0.1, 18);
      const lineMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
      const centerLine = new THREE.Mesh(lineGeometry, lineMaterial);
      centerLine.rotation.x = -Math.PI / 2;
      centerLine.position.y = 0.02;
      scene.add(centerLine);

      const warehouseGeometry = new THREE.BoxGeometry(2, 2.5, 2);
      const warehouseMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
      const warehouse = new THREE.Mesh(warehouseGeometry, warehouseMaterial);
      warehouse.position.set(-8, 1.25, -6);
      warehouse.castShadow = true;
      scene.add(warehouse);

      const roofGeometry = new THREE.ConeGeometry(1.5, 1, 4);
      const roofMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
      const roof1 = new THREE.Mesh(roofGeometry, roofMaterial);
      roof1.position.set(-8, 3, -6);
      roof1.rotation.y = Math.PI / 4;
      scene.add(roof1);

      const centerGeometry = new THREE.BoxGeometry(1.5, 2, 1.5);
      const centerMaterial = new THREE.MeshLambertMaterial({ color: 0x4169E1 });
      const center = new THREE.Mesh(centerGeometry, centerMaterial);
      center.position.set(-2, 1, 2);
      center.castShadow = true;
      scene.add(center);

      const houseGeometry = new THREE.BoxGeometry(1.8, 2, 1.8);
      const houseMaterial = new THREE.MeshLambertMaterial({ color: 0xFF6347 });
      const house = new THREE.Mesh(houseGeometry, houseMaterial);
      house.position.set(8, 1, 6);
      house.castShadow = true;
      scene.add(house);

      const roof2 = new THREE.Mesh(roofGeometry, roofMaterial);
      roof2.position.set(8, 2.8, 6);
      roof2.rotation.y = Math.PI / 4;
      scene.add(roof2);

      const truckBodyGeometry = new THREE.BoxGeometry(0.8, 0.5, 1.5);
      const truckBodyMaterial = new THREE.MeshLambertMaterial({ color: 0xFF4500 });
      const truckBody = new THREE.Mesh(truckBodyGeometry, truckBodyMaterial);

      const truckCabGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.6);
      const truckCab = new THREE.Mesh(truckCabGeometry, truckBodyMaterial);
      truckCab.position.set(0, 0.05, -0.7);

      const wheelGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.1);
      const wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x222222 });

      const wheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel1.position.set(-0.5, -0.35, 0.4);
      wheel1.rotation.z = Math.PI / 2;

      const wheel2 = wheel1.clone();
      wheel2.position.set(0.5, -0.35, 0.4);

      const wheel3 = wheel1.clone();
      wheel3.position.set(-0.5, -0.35, -0.4);

      const wheel4 = wheel1.clone();
      wheel4.position.set(0.5, -0.35, -0.4);

      const truck = new THREE.Group();
      truck.add(truckBody, truckCab, wheel1, wheel2, wheel3, wheel4);
      truck.position.set(-6, 0.5, 0);
      truck.castShadow = true;
      scene.add(truck);

      const packageGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
      const packageMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
      const packageMesh = new THREE.Mesh(packageGeometry, packageMaterial);
      packageMesh.position.set(-6, 1.2, 0);
      packageMesh.castShadow = true;
      scene.add(packageMesh);

      const treeGeometry = new THREE.ConeGeometry(0.3, 1.5, 8);
      const treeMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });

      for (let i = 0; i < 8; i++) {
        const tree = new THREE.Mesh(treeGeometry, treeMaterial);
        const x = (Math.random() - 0.5) * 20;
        const z = (Math.random() - 0.5) * 15;
        if (Math.abs(x) > 2) {
          tree.position.set(x, 0.75, z);
          tree.castShadow = true;
          scene.add(tree);
        }
      }

      const routePoints = [
        new THREE.Vector3(-6, 0.5, 0),
        new THREE.Vector3(-2, 0.5, 0),
        new THREE.Vector3(2, 0.5, 0),
        new THREE.Vector3(6, 0.5, 3),
        new THREE.Vector3(8, 0.5, 6)
      ];

      camera.position.set(0, 15, 15);
      camera.lookAt(0, 0, 0);

      let progress = 0;
      let currentSegment = 0;
      const speed = 0.005;

      const animate = () => {
        requestAnimationFrame(animate);
        progress += speed;
        if (progress >= 1 && currentSegment < routePoints.length - 2) {
          progress = 0;
          currentSegment++;
        }
        if (currentSegment < routePoints.length - 1) {
          const start = routePoints[currentSegment];
          const end = routePoints[currentSegment + 1];
          const currentPos = start.clone().lerp(end, progress);
          truck.position.copy(currentPos);
          packageMesh.position.copy(currentPos).setY(currentPos.y + 0.7);
          const direction = end.clone().sub(start).normalize();
          truck.lookAt(truck.position.clone().add(direction));
        }
        const time = Date.now() * 0.0005;
        camera.position.x = Math.sin(time) * 2;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      };
      animate();

      sceneRef.current = scene;
      rendererRef.current = renderer;
      truckRef.current = truck;
      packageRef.current = packageMesh;
    }

    return () => {
      if (rendererRef.current && mapRef.current && rendererRef.current.domElement) {
        mapRef.current.removeChild(rendererRef.current.domElement);
        sceneRef.current = null;
        rendererRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* The rest of your JSX remains unchanged */}
    </div>
  );
};

export default Mapping;
