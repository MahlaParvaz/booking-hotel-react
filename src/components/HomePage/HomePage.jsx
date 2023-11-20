import PopularLocation from '../PopularLocation/PopularLocation';
import NearLocation from '../NearLocation/NearLocation';

function HomePage() {
  return (
    <div className="bg-slate-50">
      <PopularLocation />

      <NearLocation />
    </div>
  );
}

export default HomePage;
