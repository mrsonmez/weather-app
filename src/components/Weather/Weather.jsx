import { useDispatch, useSelector } from "react-redux";
import { weatherAsyncThunk } from "../../redux/slice/weatherSlice";
import Loading from "./../Loading/Loading";
import Card from "./Card/Card";
import { useEffect } from "react";

export default function Weather() {
  const dispatch = useDispatch();
  const city = useSelector((state) => state.city);
  const items = useSelector((state) => state.item);
  const df = useSelector((state) => state.df);
  const firstItem = useSelector((state) => state.firstItem);
  useEffect(() => {
    dispatch(weatherAsyncThunk(city));
  }, [city]);
  const isLoading = useSelector((state) => state.isLoading);
  return (
    <div className="container">
      <div className="w-full screen-sm bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40 content-center">
        {isLoading == true && <Loading />}
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-6xl font-bold">
              {Math.round(firstItem.temp)}°C
            </span>
            <span className="font-semibold mt-1 text-gray-500">
              {items.name},{items.country}
            </span>
          </div>
          <img
            className="h-24 w-24 fill-current text-yellow-400"
            src={`http://openweathermap.org/img/w/${firstItem.icon}.png`}
            height="24"
            width="24"
          ></img>
        </div>
        <div className="flex justify-between mt-12">
          {df.map((item, index) => {
            return <Card item={item} key={index} index={index} />;
          })}
        </div>
      </div>
    </div>
  );
}
