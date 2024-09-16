import { Artwork } from "./Artwork";

export const MasonryLayout = () => {
  return (
    <div style={styles.artwork_container}>
      <Artwork size="large" url="/home-images/artworks/1.png" />
      <Artwork size="medium" url="/home-images/artworks/2.png" />
      <Artwork size="large" url="/home-images/artworks/3.png" />
      <Artwork size="small" url="/home-images/artworks/4.png" />
      <Artwork size="small" url="/home-images/artworks/5.png" />
      <Artwork size="large" url="/home-images/artworks/6.png" />
      <Artwork size="medium" url="/home-images/artworks/7.png" />
      <Artwork size="large" url="/home-images/artworks/8.png" />
      <Artwork size="large" url="/home-images/artworks/9.png" />
      <Artwork size="medium" url="/home-images/artworks/10.png" />
    </div>
  );
};
const styles = {
  artwork_container: {
    margin: 0,
    padding: 0,
    width: "90vw",
    position: "absolute" as const,
    left: "50%",
    transform: "translateX(-50%)",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 250px)",
    gridAutoRows: "16px",
  },
};
