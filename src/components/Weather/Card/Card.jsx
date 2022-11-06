export default function Card({ item, index }) {
  const days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="flex flex-col items-center">
      <span className="font-semibold text-lg">
        {Math.round(item.min)} / {Math.round(item.max)} °C
      </span>
      <img
        className="h-10 w-10 fill-current text-gray-400 mt-3"
        src={`http://openweathermap.org/img/w/${item.icon}.png`}
        height="24"
        width="24"
      ></img>
      <span className="font-semibold mt-1 text-sm">{item.weather}</span>
      <span>{days[index]}</span>
    </div>
  );
}
