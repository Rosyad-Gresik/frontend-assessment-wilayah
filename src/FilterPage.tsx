import {
  useLoaderData,
  useSearchParams,
} from "react-router-dom";

type Province = {
  id: number;
  name: string;
};

type Regency = {
  id: number;
  province_id: number;
  name: string;
};

type District = {
  id: number;
  regency_id: number;
  name: string;
};

export async function loader() {
  const res = await fetch("/data/indonesia_regions.json");
  return res.json();
}

export default function FilterPage() {
  const { provinces, regencies, districts } = useLoaderData() as {
    provinces: Province[];
    regencies: Regency[];
    districts: District[];
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedProvince = searchParams.get("province");
  const selectedRegency = searchParams.get("regency");
  const selectedDistrict = searchParams.get("district");

  const filteredRegencies = selectedProvince
    ? regencies.filter(
        (r) => r.province_id === Number(selectedProvince)
      )
    : [];

  const filteredDistricts = selectedRegency
    ? districts.filter(
        (d) => d.regency_id === Number(selectedRegency)
      )
    : [];

  const handleChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    if (key === "province") {
      newParams.delete("regency");
      newParams.delete("district");
    }

    if (key === "regency") {
      newParams.delete("district");
    }

    setSearchParams(newParams);
  };

  const resetFilters = () => {
    setSearchParams({});
  };

  const getProvinceName = () =>
    provinces.find((p) => p.id === Number(selectedProvince))?.name;

  const getRegencyName = () =>
    filteredRegencies.find(
      (r) => r.id === Number(selectedRegency)
    )?.name;

  const getDistrictName = () =>
    filteredDistricts.find(
      (d) => d.id === Number(selectedDistrict)
    )?.name;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-md p-6 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">
          Filter Wilayah
        </h2>

        <select
          name="province"
          value={selectedProvince || ""}
          onChange={(e) =>
            handleChange("province", e.target.value)
          }
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Pilih Provinsi</option>
          {provinces.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          name="regency"
          value={selectedRegency || ""}
          onChange={(e) =>
            handleChange("regency", e.target.value)
          }
          disabled={!selectedProvince}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        >
          <option value="">
            Pilih Kota/Kabupaten
          </option>
          {filteredRegencies.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>

        <select
          name="district"
          value={selectedDistrict || ""}
          onChange={(e) =>
            handleChange("district", e.target.value)
          }
          disabled={!selectedRegency}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        >
          <option value="">Pilih Kecamatan</option>
          {filteredDistricts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <button
          onClick={resetFilters}
          className="mt-4 bg-gray-200 hover:bg-gray-300 p-2 rounded-md transition"
        >
          Reset
        </button>
      </aside>

      {/* Main Content */}
<main className="flex-1 relative flex items-center justify-center bg-gray-50">
  
  {/* Breadcrumb */}
  <nav className="breadcrumb absolute top-10 text-sm text-gray-400">
    Indonesia
    {selectedProvince && ` > ${getProvinceName()}`}
    {selectedRegency && ` > ${getRegencyName()}`}
    {selectedDistrict && ` > ${getDistrictName()}`}
  </nav>

  {/* Content Center */}
  <div className="text-center space-y-4">
    {!selectedProvince && (
      <h1 className="text-5xl font-bold text-gray-300">
        Indonesia
      </h1>
    )}

    {selectedProvince && (
      <h1 className="text-6xl font-bold tracking-tight">
        {getProvinceName()}
      </h1>
    )}

    {selectedRegency && (
      <h2 className="text-3xl font-medium text-gray-700">
        {getRegencyName()}
      </h2>
    )}

    {selectedDistrict && (
      <h3 className="text-xl text-gray-500">
        {getDistrictName()}
      </h3>
    )}
  </div>

</main>
    </div>
  );
}