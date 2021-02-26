import React, { useState, memo, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { getSuggestedProfiles } from "../../services/firebase";
import SuggestedProfile from "./suggested-profile";

const Suggestions = ({ userId }) => {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId);
      setProfiles(response);
    }
    userId && suggestedProfiles();
  }, [userId]);

  return (
    <>
      {!profiles ? (
        <Skeleton count={1} height={150} />
      ) : profiles.length > 0 ? (
        <div className="flex flex-col">
          <div className="flex items-center align-items justify-between mb-2 mt-2">
            <p className="font-bold">Suggestions for you</p>
          </div>
          <div className="grid gap-5 mt-3">
            {profiles.map((profile) => (
              <SuggestedProfile
                key={profile.docId}
                userDocId={profile.docId}
                username={profile.username}
                profileId={profile.userId}
                userId={userId}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default memo(Suggestions);
