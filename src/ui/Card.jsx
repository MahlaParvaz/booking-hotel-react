import { Link } from 'react-router-dom';

function Card({ picture, name, latitude, longitude, id, price, location }) {
  return (
    <Link to={`/hotels-result/${id}?lat=${latitude}&lng=${longitude}`}>
      <div className="card  ">
        <img className="card__img " src={picture} alt={name} />
        <div className="btn btn--card">
          <button>Book now</button>
        </div>

        <div className="card__description">
          <p className="location mt-4 ">{location}</p>
          <p className="name">{name}</p>
          <p className="price">
            €&nbsp;{price}&nbsp;
            <span className="text-slate-400">night</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
