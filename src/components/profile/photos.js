import React from "react";
import Skeleton from "react-loading-skeleton";

export default function Photos({ photos }) {
  // TODO: // future task: add onhover with the comments length & add the likes
  // future future task: add a lightbox where you can add comments - karl hadwen's lightbox tutorial on youtube
  // TODO: view all comments in a popup - maybe put this in parent component - look at React portals to make this happen

  console.log(photos);
  return (
    <div className="h-16 border-t border-gray mt-12 pt-4">
      <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
        {!photos ? (
          <>
            {[...new Array(9)].map((_, index) => (
              <Skeleton key={index} count={1} width={320} height={400} />
            ))}
          </>
        ) : photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.docId} className="relative group">
              <img src={photo.imageSrc} alt={photo.caption} />
              <div className="px-2 pt-1">{photo.comments.length} comments </div>
              <div className="px-2 pb-2">{photo.likes.length} likes</div>
            </div>
          ))
        ) : null}
      </div>

      {!photos ||
        (photos.length === 0 && (
          <p className="text-center text-2xl">No Photos Yet</p>
        ))}
    </div>
  );
}
