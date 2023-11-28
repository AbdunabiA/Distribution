import { YMaps, Map, Placemark, GeolocationControl } from "@pbe/react-yandex-maps";

const GoogleMaps = () => {
  return (
    <div>
      <YMaps
        query={{
          ns: "use-load-option",
          load:
            "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
        }}
      >
        <div>
          My awesome application with maps!
          <Map
            height={400}
            width={"100%"}
            defaultState={{
              center: [41.3598286, 69.2881609],
              zoom: 9,
              controls: ["zoomControl", "fullscreenControl"],
            }}
            // modules={["control.ZoomControl", "control.FullscreenControl"]}
          >
            <Placemark
              //   modules={["geoObject.addon.balloon"]}
              defaultGeometry={[41.3598286, 69.2881609]}
              properties={{
                balloonContentBody:
                  "This is balloon loaded by the Yandex.Maps API module system",
              }}
            />
            <GeolocationControl options={{ float: "left" }} />
          </Map>
        </div>
      </YMaps>
    </div>
  );
};

export default GoogleMaps;
