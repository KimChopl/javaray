import React, { useState, useEffect } from "react";
import { ProfileCard, ProfileImage, Nickname, Button } from "./Profile.styles";

const Profile = () => {
  const [nickname, setNickname] = useState("닉네임");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    fetch("/api/user/profile")
      .then((response) => response.json())
      .then((data) => {
        setNickname(data.nickname);
        setProfileImage(data.profileImage);
      });
  }, []);

  return (
    <ProfileCard>
      <ProfileImage src={profileImage} alt="Profile" />
      <Nickname>{nickname}</Nickname>
      <Button>설정</Button>
    </ProfileCard>
  );
};

export default Profile;
