/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PopUpView from "./PopUpView";
import { places } from "./places";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXZpaml0c2FoYTI5OTciLCJhIjoiY2xjcDM4ZWpiMXEzYjNybXFlN2ExNWtjYSJ9.l0lzw0rJpo-uIh3v7-NFdQ";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(55.2708);
  const [lat, setLat] = useState(25.2048);
  const [zoom, setZoom] = useState(9);
  const [selectedFeature, setSelectedFeature] = useState("All");
  const [markers, setMarkers] = useState([]);
  const [propertyName, setPorpertyName] = useState("");
  const [areaName, setAreaName] = useState("");
  const [developerName, setDeveloperName] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [unitSize, setUnitSize] = useState("");
  const [description, setDescription] = useState("");
  const [popUpImg, setPopUpImg] = useState(
    "https://www.offplan-dubai.com/wp-content/uploads/2023/02/ramhan-1.jpg"
  );

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
    map.current.addControl(new mapboxgl.NavigationControl());
  }, []);

  useEffect(() => {
    markers.forEach((marker) => {
      marker.remove();
    });

    const popup = document.getElementById("popup");
    const mapContainer = document.querySelector("#map-container");

    let selectedMarker = null;
    let selectedMarkerDiv = null;
    let prevColor = null;

    function handleMapContainerClick(event) {
      const isMarker = event.target.closest(".custom-marker");
      if (!isMarker) {
        if (selectedMarker) {
          popup.style.display = "none";
          selectedMarker.style.backgroundColor = prevColor;
          selectedMarkerDiv.classList.remove("custom-marker-div-active");
          selectedMarkerDiv.classList.add("custom-marker-div");
          selectedMarker.classList.remove("custom-marker-active");
          selectedMarker.classList.add("custom-marker");
          selectedMarker = null;
        }
      }
    }
    mapContainer.addEventListener("click", handleMapContainerClick);

    places.forEach((item) => {
      if (selectedFeature === "All" || item.feature === selectedFeature) {
        const customMarkerElement = document.createElement("div");
        customMarkerElement.className = "custom-marker-div";

        const customMarkerElement1 = document.createElement("div");
        customMarkerElement1.className = "custom-marker";
        customMarkerElement1.style.backgroundColor = item.color;

        customMarkerElement.appendChild(customMarkerElement1);

        let img = item.property?.images.filter((image) => {
          if (image.type === "cover") {
            return image.path;
          }
        });

        let popUpPropertyName = item.property?.propertyName;
        let popUpAreaName = item.property.propertyArea.areaName;
        let popUpDeveloperName = item.property.developerType.name;
        let popUpPropertyType = item.property.propertyType.name;
        let popUpUnitSize = item.property.unitType.size;
        let popUpDescription = item.property.amenities.description;

        customMarkerElement.addEventListener("click", (e) => {
          e.stopPropagation();
          setPorpertyName(popUpPropertyName);
          setAreaName(popUpAreaName);
          setDeveloperName(popUpDeveloperName);
          setPropertyType(popUpPropertyType);
          setUnitSize(popUpUnitSize);
          setDescription(popUpDescription);
          setPopUpImg(img);
          popup.style.display = "flex";
          popup.style.justifyContent = "center";

          if (selectedMarker) {
            selectedMarker.style.backgroundColor = prevColor;
            selectedMarkerDiv.classList.remove("custom-marker-div-active");
            selectedMarkerDiv.classList.add("custom-marker-div");
            selectedMarker.classList.remove("custom-marker-active");
            selectedMarker.classList.add("custom-marker");
          }
          customMarkerElement1.style.backgroundColor = "#00182e";
          customMarkerElement.classList.remove("custom-marker-div");
          customMarkerElement.classList.add("custom-marker-div-active");
          customMarkerElement1.classList.remove("custom-marker");
          customMarkerElement1.classList.add("custom-marker-active");

          selectedMarker = customMarkerElement1;
          selectedMarkerDiv = customMarkerElement;
          prevColor = item.color;
        });

        const marker = new mapboxgl.Marker({ element: customMarkerElement })
          .setLngLat([item.lng, item.lat])
          .addTo(map.current);

        setMarkers((prevMarkers) => [...prevMarkers, marker]);
      }
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    return () => {
      mapContainer.removeEventListener("click", handleMapContainerClick);

      markers.forEach((marker) => {
        marker.remove();
        popup.style.display = "none";
      });
    };
  }, [selectedFeature]);

  const handleFilterClick = (feature) => {
    setSelectedFeature(feature);
  };

  return (
    <>
      <div className="w-full flex items-center overflow-x-scroll no-scrollbar mt-5 absolute z-10">
        <div className="back-button">
          <ArrowBackIcon />
          <div>Back</div>
        </div>

        <div
          onClick={() => handleFilterClick("All")}
          className={`features-div ${
            selectedFeature === "All" ? "active" : ""
          }`}>
          <div>All</div>
        </div>

        <div
          onClick={() => handleFilterClick("feature launch")}
          className={`features-div ${
            selectedFeature === "feature launch" ? "active" : ""
          }`}>
          <div className="feature bg-[#c7057c]"></div>
          <div className="w-32 "> Feature Launch</div>
        </div>

        <div
          onClick={() => handleFilterClick("newly launched")}
          className={`features-div ${
            selectedFeature === "newly launched" ? "active" : ""
          }`}>
          <div className="feature bg-green-700"></div>
          <div className="w-36">Newly Launched</div>
        </div>

        <div
          onClick={() => handleFilterClick("high demand")}
          className={`features-div ${
            selectedFeature === "high demand" ? "active" : ""
          }`}>
          <div className="feature bg-blue-800"></div>
          <div className="w-28"> High Demand</div>
        </div>

        <div
          onClick={() => handleFilterClick("last units")}
          className={`features-div ${
            selectedFeature === "last units" ? "active" : ""
          }`}>
          <div className="feature bg-yellow-400"></div>
          <div className="w-20"> Last Units</div>
        </div>

        <div
          onClick={() => handleFilterClick("out of stocks")}
          className={`features-div ${
            selectedFeature === "out of stocks" ? "active" : ""
          }`}>
          <div className="feature bg-red-600"></div>
          <div className="w-28"> Out Of Stocks</div>
        </div>
      </div>

      <div
        ref={mapContainer}
        id="map-container"
        className="!w-full !h-screen"
      />

      <div id="popup" className="w-full absolute bottom-0 hidden">
        <PopUpView
          coverImage={popUpImg}
          propertyName={propertyName}
          areaName={areaName}
          developerName={developerName}
          propertyType={propertyType}
          unitSize={unitSize}
          description={description}
        />
      </div>
    </>
  );
}
