import { useEffect, useState } from 'react';

const ImageListItem = (imageUrlLists) => {

  console.log(Array.isArray((imageUrlLists.imageUrlLists)));

  return (
    <>
      {/*{imageUrlLists && (*/}
      {/*    imageUrlLists.imageUrlLists?.map((src)=> {*/}
      {/*      <img*/}
      {/*          key={src}*/}
      {/*          src={src}*/}
      {/*      />*/}
      {/*    })*/}
      {/*  )}*/}
      {/*<div>*/}
      {/*  /!* 0, 1, ..., etc *!/*/}
      {/*  <img src={imageUrlLists.imageUrlLists[0]} />*/}
      {/*</div>*/}

      <div>
        {imageUrlLists.imageUrlLists.map((src) => {
          return (
              <img src={src} />
          )
        })}
      </div>
    </>
  );
};

export default ImageListItem;
