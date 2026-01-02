import Map from "../components/Map";

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <Map apiUrl="http://127.0.0.1:8000" />
    </div>
  );
}
