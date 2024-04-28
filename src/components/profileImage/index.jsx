import defaultImage from "assets/icons/defaultProfileImg.jpg";
const ProfileImage = ({ src = null }) => {
  return (
    <img
      src={src ? src : defaultImage}
      style={{
        borderRadius: "100%",
        border: "1px solid gray",
        overflow: "hidden",
      }}
      alt="profileimage"
    />
  );
};
export default ProfileImage;
