/* eslint-disable react/prop-types */
import iconLocation from "../assets/property details page/icon-locate.svg";
import iconVillas from "../assets/property details page/icon-villas.svg";
import iconBed from "../assets/property details page/icon-bed.svg";
import iconBuilding from "../assets/property details page/icon-building.svg";
function PopUpView(props) {
  return (
    <div className="px-1 py-3 md:w-[35%]">
      <div className="flex flex-wrap border bg-gradient-to-r from-[#001120] via-[#00182E] to-[#001120] border-[#D9D9D9] rounded-lg overflow-clip p-1">
        <div className="w-[40%] rounded-md overflow-hidden">
          <img
            src={props.coverImage[0].path}
            alt="cover"
            className="h-full rounded-l-md"
          />
        </div>
        <div className="w-[60%] p-2 md:p-5">
          <h1 className="font-roboto text-[15px] md:text-xl text-white">
            {props.propertyName} at {props.developerName}
          </h1>
          <div className="flex w-full items-center md:mt-2">
            <div className="md:mr-10">
              <div className="mr-4">
                <p className="font-montserrat text-white text-[9px] md:text-sm leading-4 flex my-2 pr-3">
                  <img src={iconLocation} className="mr-1" />
                  {props.areaName}
                </p>
              </div>
              <div className="mr-4 ">
                <p className="font-montserrat text-white text-[9px] md:text-sm leading-4 flex my-2 pr-3">
                  <img src={iconBuilding} className="mr-1" />
                  {props.developerName}
                </p>
              </div>
            </div>
            <div className="">
              <div className="mr-4 ">
                <p className="font-montserrat text-white text-[9px] md:text-sm leading-4 flex my-2 pr-3">
                  <img src={iconVillas} className="mr-1" />
                  {props.propertyType}
                </p>
              </div>
              <div className="">
                <p className="font-montserrat text-white text-[9px] md:text-sm leading-4 flex my-2 pr-3">
                  <img src={iconBed} className="mr-1" />
                  {props.unitSize}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopUpView;
