import React from "react";
import {Image} from '../../node_modules/cloudinary-react';

export default function Home() {
  const [imageIds, setImageIds] = React.useState();

  const loadImages = async () => {
    try {
      const res = await fetch("/api/images");
      const data = await res.json();
      setImageIds(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(()=>
{
loadImages();
}
,[])
  return (
    <div>
      <h1>Home</h1>
      {imageIds && imageIds.map((imageId, index) =>(
          <Image key={index} cloudName='dflymtsw5' publicId={imageId} width='300' crop='scale'/>
      ))}
    </div>
  );
}
