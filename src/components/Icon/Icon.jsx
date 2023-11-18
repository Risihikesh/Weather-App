import './Icon.css';

export default function Icon({ icon, onClick }) {
  return (
    <button className="IconButton" style={{ backgroundImage: `url(${icon})` }} onClick={onClick} />
  );
}
