import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Package, Truck, Clock, CheckCircle } from 'lucide-react';
import * as THREE from 'three';

const ParcelTrackingMap = () => {
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
      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      
      renderer.setSize(800, 600);
      renderer.setClearColor(0x87CEEB, 1);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      mapRef.current.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(10, 10, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      scene.add(directionalLight);

      // Ground (map terrain)
      const groundGeometry = new THREE.PlaneGeometry(25, 20);
      const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x90EE90 });
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.receiveShadow = true;
      scene.add(ground);

      // Main road
      const roadGeometry = new THREE.PlaneGeometry(2.5, 20);
      const roadMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
      const road = new THREE.Mesh(roadGeometry, roadMaterial);
      road.rotation.x = -Math.PI / 2;
      road.position.y = 0.01;
      scene.add(road);

      // Road markings
      const lineGeometry = new THREE.PlaneGeometry(0.1, 18);
      const lineMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
      const centerLine = new THREE.Mesh(lineGeometry, lineMaterial);
      centerLine.rotation.x = -Math.PI / 2;
      centerLine.position.y = 0.02;
      scene.add(centerLine);

      // Warehouse (starting point)
      const warehouseGeometry = new THREE.BoxGeometry(2, 2.5, 2);
      const warehouseMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
      const warehouse = new THREE.Mesh(warehouseGeometry, warehouseMaterial);
      warehouse.position.set(-8, 1.25, -6);
      warehouse.castShadow = true;
      scene.add(warehouse);

      // Warehouse roof
      const roofGeometry = new THREE.ConeGeometry(1.5, 1, 4);
      const roofMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
      const roof1 = new THREE.Mesh(roofGeometry, roofMaterial);
      roof1.position.set(-8, 3, -6);
      roof1.rotation.y = Math.PI / 4;
      scene.add(roof1);

      // Distribution center
      const centerGeometry = new THREE.BoxGeometry(1.5, 2, 1.5);
      const centerMaterial = new THREE.MeshLambertMaterial({ color: 0x4169E1 });
      const center = new THREE.Mesh(centerGeometry, centerMaterial);
      center.position.set(-2, 1, 2);
      center.castShadow = true;
      scene.add(center);

      // Customer house (destination)
      const houseGeometry = new THREE.BoxGeometry(1.8, 2, 1.8);
      const houseMaterial = new THREE.MeshLambertMaterial({ color: 0xFF6347 });
      const house = new THREE.Mesh(houseGeometry, houseMaterial);
      house.position.set(8, 1, 6);
      house.castShadow = true;
      scene.add(house);

      // House roof
      const roof2 = new THREE.Mesh(roofGeometry, roofMaterial);
      roof2.position.set(8, 2.8, 6);
      roof2.rotation.y = Math.PI / 4;
      scene.add(roof2);

      // Delivery truck
      const truckBodyGeometry = new THREE.BoxGeometry(0.8, 0.5, 1.5);
      const truckBodyMaterial = new THREE.MeshLambertMaterial({ color: 0xFF4500 });
      const truckBody = new THREE.Mesh(truckBodyGeometry, truckBodyMaterial);
      
      const truckCabGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.6);
      const truckCab = new THREE.Mesh(truckCabGeometry, truckBodyMaterial);
      truckCab.position.set(0, 0.05, -0.7);
      
      // Truck wheels
      const wheelGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.1);
      const wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x222222 });
      
      const wheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel1.position.set(-0.5, -0.35, 0.4);
      wheel1.rotation.z = Math.PI / 2;
      
      const wheel2 = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel2.position.set(0.5, -0.35, 0.4);
      wheel2.rotation.z = Math.PI / 2;
      
      const wheel3 = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel3.position.set(-0.5, -0.35, -0.4);
      wheel3.rotation.z = Math.PI / 2;
      
      const wheel4 = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel4.position.set(0.5, -0.35, -0.4);
      wheel4.rotation.z = Math.PI / 2;

      const truck = new THREE.Group();
      truck.add(truckBody);
      truck.add(truckCab);
      truck.add(wheel1);
      truck.add(wheel2);
      truck.add(wheel3);
      truck.add(wheel4);
      truck.position.set(-6, 0.5, 0);
      truck.castShadow = true;
      scene.add(truck);

      // Package on truck
      const packageGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
      const packageMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
      const packageMesh = new THREE.Mesh(packageGeometry, packageMaterial);
      packageMesh.position.set(-6, 1.2, 0);
      packageMesh.castShadow = true;
      scene.add(packageMesh);

      // Trees for scenery
      const treeGeometry = new THREE.ConeGeometry(0.3, 1.5, 8);
      const treeMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
      
      for (let i = 0; i < 8; i++) {
        const tree = new THREE.Mesh(treeGeometry, treeMaterial);
        const x = (Math.random() - 0.5) * 20;
        const z = (Math.random() - 0.5) * 15;
        // Avoid placing trees on the road
        if (Math.abs(x) > 2) {
          tree.position.set(x, 0.75, z);
          tree.castShadow = true;
          scene.add(tree);
        }
      }

      // Route path points
      const routePoints = [
        new THREE.Vector3(-6, 0.5, 0),   // Start
        new THREE.Vector3(-2, 0.5, 0),   // Distribution center
        new THREE.Vector3(2, 0.5, 0),    // Mid route
        new THREE.Vector3(6, 0.5, 3),    // Near destination
        new THREE.Vector3(8, 0.5, 6)     // Destination
      ];

      camera.position.set(0, 15, 15);
      camera.lookAt(0, 0, 0);

      // Animation variables
      let progress = 0;
      let currentSegment = 0;
      const speed = 0.005;

      const animate = () => {
        requestAnimationFrame(animate);
        
        // Animate truck along route
        progress += speed;
        
        if (progress >= 1 && currentSegment < routePoints.length - 2) {
          progress = 0;
          currentSegment++;
        }
        
        if (currentSegment < routePoints.length - 1) {
          const start = routePoints[currentSegment];
          const end = routePoints[currentSegment + 1];
          
          // Interpolate position
          const currentPos = start.clone().lerp(end, progress);
          truck.position.copy(currentPos);
          packageMesh.position.copy(currentPos);
          packageMesh.position.y += 0.7;
          
          // Rotate truck to face direction
          const direction = end.clone().sub(start).normalize();
          truck.lookAt(truck.position.clone().add(direction));
          
          // Animate wheels
          const wheelRotation = Date.now() * 0.01;
          truck.children.forEach((child, index) => {
            if (index >= 2) { // wheels
              child.rotation.x = wheelRotation;
            }
          });
        }
        
        // Rotate camera slightly for dynamic view
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
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin size={24} />
              <div>
                <h2 className="text-xl font-bold">Live Package Tracking</h2>
                <p className="text-blue-100 text-sm">Order #ORD-2024-001</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-100">Estimated Delivery</div>
              <div className="font-bold">Today, 3:00 PM</div>
            </div>
          </div>
        </div>

        {/* 3D Map */}
        <div className="relative">
          <div 
            ref={mapRef} 
            className="w-full flex items-center justify-center bg-sky-100"
          >
            {!sceneRef.current && (
              <div className="w-full h-96 flex items-center justify-center">
                <div className="text-center">
                  <Truck size={48} className="mx-auto text-blue-500 mb-2 animate-pulse" />
                  <p className="text-gray-600">Loading 3D tracking map...</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-md">
            <div className="text-sm font-semibold mb-2">Map Legend</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span>Delivery Truck</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-600 rounded"></div>
                <span>Warehouse</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Distribution Center</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Destination</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="p-6 bg-gray-50">
          <h3 className="font-bold text-lg mb-4">Delivery Progress</h3>
          <div className="space-y-3">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              const isActive = index === trackingStage;
              const isCompleted = stage.completed;
              
              return (
                <div key={stage.id} className={`flex items-center space-x-4 p-3 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-100 border border-blue-300' : 
                  isCompleted ? 'bg-green-50' : 'bg-white'
                }`}>
                  <div className={`p-2 rounded-full ${
                    isCompleted ? 'bg-green-500 text-white' : 
                    isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold ${
                      isCompleted ? 'text-green-700' : 
                      isActive ? 'text-blue-700' : 'text-gray-500'
                    }`}>
                      {stage.label}
                    </div>
                    <div className="text-sm text-gray-600">{stage.location}</div>
                  </div>
                  {isActive && (
                    <div className="flex items-center space-x-1 text-blue-600">
                      <Clock size={16} />
                      <span className="text-sm font-medium">In Progress</span>
                    </div>
                  )}
                  {isCompleted && (
                    <div className="text-green-600">
                      <CheckCircle size={20} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Status */}
        <div className="p-4 bg-blue-50 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-blue-800">
                Your package is on the move!
              </span>
            </div>
            <div className="text-sm text-blue-600">
              Last updated: 2 minutes ago
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcelTrackingMap;