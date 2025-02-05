interface DeviceOrientationEvent extends Event {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
  webkitCompassHeading?: number;
  webkitCompassAccuracy?: number;
}

interface DeviceOrientationEventStatic {
  requestPermission?(): Promise<'granted' | 'denied' | 'default'>;
}

interface Window {
  DeviceOrientationEvent: DeviceOrientationEventStatic;
}
