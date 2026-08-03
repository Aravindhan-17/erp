"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight
} from "lucide-react";


interface Props {
  images: (StaticImageData | string)[];
  title:string;
}


export function ProductImageCarousel({
  images,
  title
}:Props){


  const [active,setActive]=useState(0);



  const prev=()=>{
    setActive((prev)=>
      prev===0 ? images.length-1 : prev-1
    );
  };


  const next=()=>{
    setActive((prev)=>
      prev===images.length-1 ? 0 : prev+1
    );
  };



  return(

    <div
      className="
      grid
      grid-cols-[80px_1fr]
      gap-4
      "
    >



      {/* thumbnails */}


      <div
        className="
        flex
        flex-col
        gap-3
        "
      >

        {
          images.map((img,index)=>(

            <button
              key={index}
              onClick={()=>setActive(index)}
              className={`
              relative
              h-20
              w-20
              overflow-hidden
              rounded-xl
              border
              ${
                active===index
                ?
                "border-primary"
                :
                "border-gray-200"
              }
              `}
            >


              <Image
                src={img}
                alt={title}
                fill
                className="
                object-contain
                p-2
                "
              />


            </button>


          ))
        }


      </div>







      {/* main image */}


      <div
        className="
        relative
        flex
        h-[520px]
        items-center
        justify-center
        overflow-hidden
        rounded-3xl
        border
        border-gray-200
        bg-white
        "
      >


        <Image
          src={images[active]}
          alt={title}
          fill
          className="
          object-contain
          p-10
          transition
          duration-500
          "
        />




        <button
          onClick={prev}
          className="
          absolute
          left-4
          top-1/2
          flex
          h-10
          w-10
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          bg-white
          shadow
          "
        >

          <ChevronLeft size={20}/>

        </button>





        <button
          onClick={next}
          className="
          absolute
          right-4
          top-1/2
          flex
          h-10
          w-10
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          bg-white
          shadow
          "
        >

          <ChevronRight size={20}/>

        </button>



      </div>


    </div>


  );
}