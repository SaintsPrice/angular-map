export interface IObjects {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
  }
  
  export interface IMapOptions {
    latitude: number;
    longitude: number;
    zoom: number;
  }

  export interface IMarkerOptions {
    icon: L.Icon<L.IconOptions>,
    title: string,
    clickable: boolean,
    draggable: boolean
  };
