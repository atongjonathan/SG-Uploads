import React from "react";
import mobile from  '../../images/mobile.png'

const Promos = () => {
  return (
    <div className="py-10 md:px-20 px-8 bg-dry">
      <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center">
        <div className="flex lg:gap-10 gap-6 flex-col">
          <h1 className="xl:text-3xl text-xl capitalize font-sans font-medium xl:leading-relaxed">
            Download Your Movies Watch Offline. <br /> Enjoy on Your Mobile
          </h1>
          <p className="text-text text-sm xl:text-base leading-6 xl:leading-8">
          Welcome to StreamGrid! We’re thrilled to have you here. At StreamGrid, we bring you the latest and greatest in film, from blockbuster hits to indie gems. Whether you’re a casual viewer or a die-hard cinephile, there’s something for everyone. Explore our features to stay updated with the newest movies,  and join the conversation in our community discussions. Grab your popcorn, sit back, and enjoy the show! 
          </p>
          <div className="flex gap-4 md:text-lg text-sm">
            <div className="flex-colo bg-black text-subMain px-6 py-3 rounded font-bold">
            1080p 
            </div>
            <div className="flex-colo bg-black text-subMain px-6 py-3 rounded font-bold">
            720p
            </div>
            
            
          </div>
        </div>
        <div>
          <img src={mobile} alt="Mobile app" className="w-full object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Promos;
