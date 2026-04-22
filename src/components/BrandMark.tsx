import logo from "./logo.png";

export function BrandMark() {
  return (
    <div className="brand-mark" aria-label="Peerless FireConnect logo">
      <img
        src={logo}
        alt="Peerless FireConnect"
        className="brand-mark__image"
      />
    </div>
  );
}