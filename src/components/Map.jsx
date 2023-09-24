/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXZpaml0c2FoYTI5OTciLCJhIjoiY2xjcDM4ZWpiMXEzYjNybXFlN2ExNWtjYSJ9.l0lzw0rJpo-uIh3v7-NFdQ";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(55.2708);
  const [lat, setLat] = useState(25.2048);
  const [zoom, setZoom] = useState(9);
  const [selectedFeature, setSelectedFeature] = useState("All");

  console.log(selectedFeature);

  const places = [
    {
      name: "Palm Jumeirah",
      lat: 25.1152,
      lng: 55.1372,
      feature: "feature launch",
      color: "rgb(199, 5, 124)",
    },
    {
      name: "Burj Al Arab",
      lat: 25.1412,
      lng: 55.1855,
      feature: "newly launched",
      color: "green",
    },
    {
      name: "Nakhlat Jabal Ali",
      lat: 25.0064,
      lng: 54.9889,
      feature: "high demand",
      color: "blue",
    },
    {
      name: "The Palm Jabel Ali",
      lat: 24.9847,
      lng: 55.0057,
      feature: "last units",
      color: "rgb(228, 194, 0)",
    },
    {
      name: "Al Barsha",
      lat: 25.0962,
      lng: 55.1985,
      feature: "out of stocks",
      color: "red",
    },
  ];

  useEffect(() => {
    if (map.current) {
      map.current.remove();
      map.current = null;
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [lng, lat],
      zoom: zoom,
    });
    places.forEach((item) => {
      if (selectedFeature === "All" || item.feature === selectedFeature) {
        const customMarkerElement = document.createElement("div");
        customMarkerElement.className = "custom-marker-div";
        const customMarkerElement1 = document.createElement("div");
        customMarkerElement.appendChild(customMarkerElement1);
        customMarkerElement1.className = "custom-marker";
        customMarkerElement1.style.backgroundColor = item.color;

        const popUpContent = document.createElement("div");
        popUpContent.className = "popup-content";
        popUpContent.style.display = "none";
        popUpContent.innerHTML = item.name;

        customMarkerElement1.appendChild(popUpContent);

        customMarkerElement1.addEventListener("mouseenter", () => {
          popUpContent.style.display = "block";
        });

        customMarkerElement1.addEventListener("mouseleave", () => {
          popUpContent.style.display = "none";
        });

        const marker = new mapboxgl.Marker({ element: customMarkerElement })
          .setLngLat([item.lng, item.lat])
          .addTo(map.current);
      }
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, [selectedFeature]);

  const handleFilterClick = (feature) => {
    setSelectedFeature(feature);
  };

  return (
    <>
      <div className="features">
        <div className="back-button">
          <ArrowBackIcon />
          <div>Back</div>
        </div>
        <div
          onClick={() => handleFilterClick("All")}
          className={`filter ${selectedFeature === "All" ? "active" : ""}`}>
          <div>All</div>
        </div>
        <div
          onClick={() => handleFilterClick("feature launch")}
          className={`filter ${
            selectedFeature === "feature launch" ? "active" : ""
          }`}>
          <div className="feature-launch"></div>
          <div> Feature Launch</div>
        </div>
        <div
          onClick={() => handleFilterClick("newly launched")}
          className={`filter ${
            selectedFeature === "newly launched" ? "active" : ""
          }`}>
          <div className="newly-launched"></div>
          <div>Newly Launched</div>
        </div>
        <div
          onClick={() => handleFilterClick("high demand")}
          className={`filter ${
            selectedFeature === "high demand" ? "active" : ""
          }`}>
          <div className="high-demand"></div>
          <div> High Demand</div>
        </div>
        <div
          onClick={() => handleFilterClick("last units")}
          className={`filter ${
            selectedFeature === "last units" ? "active" : ""
          }`}>
          <div className="last-units"></div>
          <div> Last Units</div>
        </div>
        <div
          onClick={() => handleFilterClick("out of stocks")}
          className={`filter ${
            selectedFeature === "out of stocks" ? "active" : ""
          }`}>
          <div className="out-of-stocks"></div>
          <div> Out Of Stocks</div>
        </div>
      </div>
      <div ref={mapContainer} className="map-container" />
    </>
  );
}
