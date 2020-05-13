import React from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";

import CardHeader from "reactstrap/lib/CardHeader";
import CardBody from "reactstrap/lib/CardBody";
import Card from "reactstrap/lib/Card";
import { Row, Col } from "reactstrap";
import { Doughnut, Line } from "react-chartjs-2";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import Widget02 from "views/Widgets/Widget02";

import { tabdil } from "lib/tabdil";
import { useGetStatics } from "hooks/get-statics/getStatics";
import CustomLoadingOverlay from "components/CustomLoadingOverlay/CustomLoadingOverlay";
import { useData } from "hooks/useData/useData";
import { useForm } from "hooks/useForm/useForm";
import SimpleSelect from "components/Form/SimpleSelect/SimpleSelect";
import HeatmapLayer from "react-leaflet-heatmap-layer";
import { addressPoints } from "variables/heatmapData.js";

const marketsPosition = [
  [35.715298, 51.404343],
  [34.715292, 41.404343],
  [21.715298, 31.404333],
  [11.715211, 21.404323]
];

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
};

const selectOptions = [
  { name: "1", label: "ماهانه" },
  { name: "2", label: "هفتگی" }
];
const DashboardMarkets = props => {
  const { form: timeFilter, bind } = useForm(null, null, {
    markets: "2",
    membership: "2",
    sales: "2",
    commission: "2"
  });
  const [markets, , loadingmarkets] = useData(
    `get-statistics3?type=1&time_filter=${timeFilter.markets}`
  );
  const [sales, , loadingsales] = useData(
    `get-statistics3?type=2&time_filter=${timeFilter.sales}`
  );
  const [commission, , loadingcommission] = useData(
    `get-statistics3?type=3&time_filter=${timeFilter.commission}`
  );
  const [membership, , loadingmembership] = useData(
    `get-statistics3?type=4&time_filter=${timeFilter.membership}`
  );
  const [seperation, , loadingseperation] = useData(`get-statistics3?type=5`);
  const [category, , loadingcategory] = useData(`get-statistics3?type=6`);

  const [mapOptions, setMapOptions] = React.useState({
    center: [35.715298, 51.404343],
    zoom: 12
  });
  return (
    <Row>
      <Col xs="12" md="4">
        <CustomLoadingOverlay loading={false}>
          <Widget02
            header={tabdil("100")}
            mainText="بدهکاری مارکت به ما"
            icon="fa fa-ticket"
            color="info"
            variant="1"
          />
        </CustomLoadingOverlay>
      </Col>

      <Col xs="12" md="4">
        <CustomLoadingOverlay loading={false}>
          <Widget02
            header={tabdil("100")}
            mainText="بدهکاری ما به مارکت"
            icon="fa fa-ticket"
            color="info"
            variant="1"
          />
        </CustomLoadingOverlay>
      </Col>

      <Col xs="12" md="4">
        <CustomLoadingOverlay loading={false}>
          <Widget02
            header={tabdil("100")}
            mainText="تخفیف های داده شده به کاربران از طرف مارکت"
            icon="fa fa-ticket"
            color="info"
            variant="1"
          />
        </CustomLoadingOverlay>
      </Col>

      <Col xs="12" md="6">
        <Card>
          <CustomLoadingOverlay loading={loadingmarkets}>
            <CardHeader>
              <div className="d-flex justify-content-between">
                <span className="flex-grow-1">تعداد مارکت ها </span>
                <SimpleSelect
                  className="w-50"
                  options={selectOptions}
                  {...bind("markets")}
                />
              </div>
            </CardHeader>
            <CardBody className="static-card-body">
              {markets && <Line data={markets} options={options} />}
            </CardBody>
          </CustomLoadingOverlay>
        </Card>
      </Col>
      <Col xs="12" md="6">
        <Card>
          <CustomLoadingOverlay loading={loadingsales}>
            <CardHeader>
              <div className="d-flex justify-content-between">
                <span className="flex-grow-1">تعداد فروختن</span>
                <SimpleSelect
                  className="w-50"
                  options={selectOptions}
                  {...bind("sales")}
                />
              </div>
            </CardHeader>
            <CardBody className="static-card-body">
              {sales && <Line data={sales} options={options} />}
            </CardBody>
          </CustomLoadingOverlay>
        </Card>
      </Col>

      <Col xs="12" md="6">
        <Card>
          <CustomLoadingOverlay loading={loadingcommission}>
            <CardHeader>
              <div className="d-flex justify-content-between">
                <span className="flex-grow-1">کمیسیون واکی</span>
                <SimpleSelect
                  className="w-50"
                  options={selectOptions}
                  {...bind("commission")}
                />
              </div>
            </CardHeader>
            <CardBody className="static-card-body">
              {commission && <Line data={commission} options={options} />}
            </CardBody>
          </CustomLoadingOverlay>
        </Card>
      </Col>

      <Col xs="12" md="6">
        <Card>
          <CustomLoadingOverlay loading={loadingmembership}>
            <CardHeader>
              <div className="d-flex justify-content-between">
                <span className="flex-grow-1">عضویت مارکت ها</span>
                <SimpleSelect
                  className="w-50"
                  options={selectOptions}
                  {...bind("commission")}
                />
              </div>
            </CardHeader>
            <CardBody className="static-card-body">
              {membership && <Line data={membership} options={options} />}
            </CardBody>
          </CustomLoadingOverlay>
        </Card>
      </Col>

      <div className="offset-8" />

      <Col xs="12" md="6">
        <Card>
          <CustomLoadingOverlay loading={loadingseperation}>
            <CardHeader>تفکیک مارکت</CardHeader>
            <CardBody className="static-card-body">
              <div className="chart-wrapper">
                {seperation && <Doughnut data={seperation} />}
              </div>
            </CardBody>
          </CustomLoadingOverlay>
        </Card>
      </Col>

      <Col xs="12" md="6">
        <Card>
          <CustomLoadingOverlay loading={loadingcategory}>
            <CardHeader>دسته بندی ها</CardHeader>
            <CardBody className="static-card-body">
              <div className="chart-wrapper">
                {category && <Doughnut data={category} />}
              </div>
            </CardBody>
          </CustomLoadingOverlay>
        </Card>
      </Col>

      <Col xs="12" className="mt-4">
        <Card>
          <CardHeader>کاربر ها</CardHeader>
          <div className="ltr mt-3" style={{ height: 400 }}>
            <LeafletMap
              center={mapOptions.center}
              zoom={mapOptions.zoom}
              maxZoom={30}
              attributionControl={true}
              zoomControl={true}
              doubleClickZoom={true}
              scrollWheelZoom={true}
              dragging={true}
            >
              <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
              <HeatmapLayer
                fitBoundsOnLoad
                fitBoundsOnUpdate
                points={addressPoints}
                longitudeExtractor={m => m[1]}
                latitudeExtractor={m => m[0]}
                intensityExtractor={m => parseFloat(m[2])}
              />
              <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
            </LeafletMap>
          </div>
        </Card>
      </Col>

      <Col xs="12">
        <Card>
          <CardHeader>فروشگاها</CardHeader>
          <div className="ltr mt-3" style={{ height: 400 }}>
            <LeafletMap
              center={mapOptions.center}
              zoom={mapOptions.zoom}
              maxZoom={30}
              attributionControl={true}
              zoomControl={true}
              doubleClickZoom={true}
              scrollWheelZoom={true}
              dragging={true}
            >
              <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />

              {marketsPosition &&
                marketsPosition.map(coordinate => (
                  <Marker position={coordinate}>
                    <Popup>popup</Popup>
                  </Marker>
                ))}
            </LeafletMap>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardMarkets;
