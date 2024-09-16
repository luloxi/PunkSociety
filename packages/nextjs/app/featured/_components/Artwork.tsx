type ArtworkProps = {
  size: "small" | "medium" | "large";
  url: string;
};

export const Artwork: React.FC<ArtworkProps> = props => {
  return (
    <div
      style={{
        backgroundImage: `url(${props.url})`,
        ...styles.artwork,
        ...styles[props.size],
      }}
      className="bg-cover bg-center"
    ></div>
  );
};

const styles = {
  artwork: {
    margin: "16px 12px",
    padding: 0,
    borderRadius: "16px",
  },
  small: {
    gridRowEnd: "span 16",
  },
  medium: {
    gridRowEnd: "span 22",
  },
  large: {
    gridRowEnd: "span 26",
  },
};
