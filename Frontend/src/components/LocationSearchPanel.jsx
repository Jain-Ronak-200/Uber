import React from 'react'
const LocationSearchPanel = ({setPickuplat,setPickuplng,setDestinationlat,setDestinationlng,destination,pickup,vehiclePanel,setVehiclePanel,setPenelOpen,suggestions,destinationsuggestion,setPickup,setDestination}) => {
// sample array for location

  return (
    <div>
        <h1 className='mt-7 text-lg font-semibold' >Suggestions</h1>
        {/* this is just a semple data */}
        {
            suggestions.map(function(elem,index){
                return         <div key={index} onClick={(()=>{
               })} className='flex gap-4 active:border-1 rounded-xl  item-center my-2 justify-start p-auto'>
                <h2 className='bg-[#eee] flex item-center h-8 w-12 justify-center rounded-full'><i className="ri-map-pin-fill "></i></h2>
                <h4 onClick={()=>{setPickup(elem.name)
                    setPickuplat(elem.lat)
                setPickuplng(elem.lng)
                
}
                }  >{elem.name} </h4>
            </div>

            })
        }
        {
            destinationsuggestion.map(function(elem, index) {
                return <div key={index} onClick={() => {
                    if (destination && pickup) {
                        // setVehiclePanel(true);
                        // console.log(destination,pickup)
                    } else {
                        setVehiclePanel(false);
                    }

                    
                }} className='flex gap-4 active:border-1 rounded-xl item-center my-2 justify-start'>
                    <h2 className='bg-[#eee] flex item-center h-8 w-12 justify-center rounded-full'><i className="ri-map-pin-fill"></i></h2>
                    <h4 onClick={()=>{setDestination(elem.name)
                    setDestinationlat(elem.lat)
                    setDestinationlng(elem.lng)
                        
                    }} >{elem.name}</h4>
                </div>

               
            })
        }

        

    </div>
  )
}

export default LocationSearchPanel