import { useMap } from "react-leaflet";

const url = "/tmp/data_logs.json";

export default function Stations() {
  const map = useMap();

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let stations = [];
      let stations_text = [];
      for (let i = 0; i < data.length; ++i) {
        if (!stations_text.includes(`${data[i].gps_lat},${data[i].gps_lan}`)) {
          stations.push({ lat: data[i].gps_lat, lan: data[i].gps_lan });
          stations_text.push(`${data[i].gps_lat},${data[i].gps_lan}`);
        }
      }

      stations.map((station) => {
        // prepare the output string
        const string = `
        <div class="card text-white">
          <div class="card-body">
            <h2 class="card-header">Stanice</h1>
            <p class="text-content2">${station.lat} ${station.lan}</p>
            <div class="card-footer">
              <a href='/stations/${station.lat}-${station.lan}'>
                <button class="btn btn-solid-secondary font-semibold">Naměřená data</button>
              </a>
            </div>
          </div>
        </div>`;

        const statoinPopup = L.popup({
          keepInView: true,
          offset: L.point(20, 0),
          autoPanPadding: L.point(20, 20),
          closeButton: false,
          className: "",
        }).setContent(string);

        L.marker([station.lat, station.lan], {
          icon: stationIcon,
          title: "Stanice",
          alt: `Stanice`,
        })
          .addTo(map)
          .bindPopup(statoinPopup)
          .on("click", (e) => {
            console.log(e); // TODO: remove
          });
      });
    })
    .catch((err) => console.log(err));

  return (
    null
  );
}

const stationIcon = L.icon({
  iconUrl: "/station-icon.png",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [-20, -10],
  //   shadowUrl: "/station-icon.png",
  //   shadowSize: [35, 35],
  //   shadowAnchor: [0, 0],
});
