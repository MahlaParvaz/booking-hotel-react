import PopularLocationsDetail from './PopularLocationsDetail';

function MainComponent() {
  return (
    <>
      <PopularLocationsDetail countryFilter="Netherlands" title="Hotels in Netherlands" />
      <PopularLocationsDetail countryFilter="London" title="Hotels in London" />
    </>
  );
}

export default MainComponent;
