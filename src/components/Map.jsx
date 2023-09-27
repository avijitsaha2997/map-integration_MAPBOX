/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PopUpView from "./PopUpView";
import { purple } from "@mui/material/colors";

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
  const [prevColor, setPrevColor] = useState(null);
  const [customEl, setCustomEL] = useState(null);

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
  const property = {
    propertyType: {
      id: "63fefdc56023b40ac4385d00",
      name: "Villa",
    },
    propertyArea: {
      id: "63fefe6d6023b40ac4385dc3",
      areaName: "Abu Dhabi",
    },
    developmentType: {
      id: "63feff816023b40ac4385fba",
      name: "OFF PLAN",
    },
    developerType: {
      id: "63ff00c56023b40ac4386188",
      name: "Eagle Hills",
    },
    amenities: {
      description:
        "Ramhan Island’s world-class amenities and facilities will provide an unparalleled lifestyle that will make you pampered by day and privileged by night.",
      features:
        "Waterfront Living#Sandbar#Eco-Parks#Swimmable Crystal Lagoon#Jogging and Running Tracks#Sports and Fitness Centre#Spa & Wellness#Infinity Pool#Floating Villas",
    },
    location: {
      position: [25.2048, 55.2708],
      locDescription:
        "The Ramhan Villas are located in Abu Dhabi and are conveniently accessible to the city’s mainland and other places. Ramhan Island will become one of the most desirable spots in the capital of the United Arab Emirates.",
      nearby: [
        {
          position: [25.2048, 55.2708],
          title: "10 Mins Yas Island",
          icon: "island",
        },
        {
          position: [25.2048, 55.2708],
          title: "15 Mins Sheikh Zayed Grand Mosque",
          icon: "mosque",
        },
        {
          position: [25.2048, 55.2708],
          title: "15 Mins Abu Dhabi Airport",
          icon: "airport",
        },
        {
          position: [25.2048, 55.2708],
          title: "18 Mins Saadiyat Island",
          icon: "island",
        },
        {
          position: [25.2048, 55.2708],
          title: "20 Mins Drive Lovre Abu Dhabi",
          icon: "city",
        },
      ],
    },
    unitType: {
      title: "Bedrooms",
      count: "1",
      size: "4, 5, 6, 7",
    },
    createBy: {
      id: "63fdba8b7e7c44513a8a3b9e",
      fullName: "Bellal Hossain",
    },
    isFeatured: true,
    _id: "63ff04846023b40ac43861ce",
    propertyNo: 1,
    lang: "en",
    propertyName: "Ramhan Island",
    propertyDescription:
      "The Heavenly Ramhan Island is completely unspoiled and natural, with bays, beaches, and mangrove trees just waiting to be explored by the adventurous traveler. Ramhan By Eagle Hills, is located on an island in Abu Dhabi, is a circular island due to its geological formation.\r\n\r\nThe incredible design of this masterplan features 3, 4, 5, 6 & 7 Bedroom beachfront luxury villas with top-tier facilities, a marina filled with cutting-edge retail and dining options, 5-star accommodations in the form of a hotel and serviced apartments, and a wellness center with open bay views and peaceful surroundings.",
    areaSize: "7,539 sft",
    highlights:
      "Luxury waterfront villas#Starting from AED 6.4M#Hotel and serviced residences#Private beach for every unit#Magnificent sea views#Premium detached villas#World-class Marina#Floating villas on the water#120 Marina Boat Berths",
    completion: "2025",
    startingPrice: 6400000,
    paymentPlan: [
      {
        milestone: "Price starting at AED 6.4M to 24.5M",
        installment: 1,
        percentage: "30%",
        date: "2023-03-01T00:00:00.000Z",
        notes: "1",
      },
      {
        milestone: "EMI",
        installment: 6,
        percentage: "20%",
        date: "2023-03-14T00:00:00.000Z",
        notes: "1",
      },
      {
        milestone: "Handover ",
        installment: 1,
        percentage: "60%",
        date: "2023-03-29T00:00:00.000Z",
        notes: "1",
      },
      {
        milestone: "Pay via cash",
        installment: 1,
        percentage: "100%",
        date: "2023-03-01T00:00:00.000Z",
        notes: "1",
      },
    ],
    brochure: "https://www.africau.edu/images/default/sample.pdf",
    images: [
      {
        type: "cover",
        metaDescription: "cover",
        path: "https://www.offplan-dubai.com/wp-content/uploads/2023/02/ramhan-1.jpg",
      },
      {
        type: "gallery",
        metaDescription: "gallery",
        path: "https://www.offplan-dubai.com/wp-content/uploads/2023/02/ramhan-4.jpg",
      },
      {
        type: "gallery",
        metaDescription: "gallery",
        path: "https://www.offplan-dubai.com/wp-content/uploads/2023/02/ramhan-5.jpg",
      },
      {
        type: "gallery",
        metaDescription: "gallery",
        path: "https://www.offplan-dubai.com/wp-content/uploads/2023/02/ramhan-6.jpg",
      },
      {
        type: "gallery",
        metaDescription: "gallery",
        path: "https://www.offplan-dubai.com/wp-content/uploads/2023/02/ramhan-7.jpg",
      },
    ],
    videos: [
      {
        type: "youtube",
        path: "https://www.youtube.com/watch?v=dcGnNft3nvg&ab_channel=ProvidentRealEstate",
      },
    ],
    createdAt: "2023-03-01T07:53:40.738Z",
    updatedAt: "2023-03-01T07:53:40.738Z",
    __v: 0,
  };

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

    places.forEach((item) => {
      if (selectedFeature === "All" || item.feature === selectedFeature) {
        const customMarkerElement = document.createElement("div");
        customMarkerElement.className = "custom-marker-div";

        const customMarkerElement1 = document.createElement("div");
        customMarkerElement1.className = "custom-marker";
        customMarkerElement1.style.backgroundColor = item.color;

        customMarkerElement.appendChild(customMarkerElement1);

        customMarkerElement.addEventListener("click", () => {
          customMarkerElement1.style.backgroundColor = "#000F1D";
          popup.style.display = "flex";
          popup.style.justifyContent = "center";
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
          <div className="feature-text"> Feature Launch</div>
        </div>
        <div
          onClick={() => handleFilterClick("newly launched")}
          className={`filter ${
            selectedFeature === "newly launched" ? "active" : ""
          }`}>
          <div className="newly-launched"></div>
          <div className="feature-text">Newly Launched</div>
        </div>
        <div
          onClick={() => handleFilterClick("high demand")}
          className={`filter ${
            selectedFeature === "high demand" ? "active" : ""
          }`}>
          <div className="high-demand"></div>
          <div className="feature-text"> High Demand</div>
        </div>
        <div
          onClick={() => handleFilterClick("last units")}
          className={`filter ${
            selectedFeature === "last units" ? "active" : ""
          }`}>
          <div className="last-units"></div>
          <div className="feature-text"> Last Units</div>
        </div>
        <div
          onClick={() => handleFilterClick("out of stocks")}
          className={`filter ${
            selectedFeature === "out of stocks" ? "active" : ""
          }`}>
          <div className="out-of-stocks"></div>
          <div className="feature-text"> Out Of Stocks</div>
        </div>
      </div>
      <div ref={mapContainer} className="map-container" />
      <div id="popup" className="popup">
        <PopUpView
          coverImage={property.images.filter((image) => {
            if (image.type === "cover") {
              return image.path;
            }
          })}
          propertyName={property.propertyName}
          areaName={property.propertyArea.areaName}
          developerName={property.developerType.name}
          propertyType={property.propertyType.name}
          unitSize={property.unitType.size}
          description={property.amenities.description}
        />
      </div>
    </>
  );
}
