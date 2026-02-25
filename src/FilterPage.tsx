import {
  useLoaderData,
  useSearchParams,
} from "react-router-dom";

type District = {
  id: string;
  name: string;
};

type Regency = {
  id: string;
  name: string;
  districts: District[];
};

type Province = {
  id: string;
  name: string;
  regencies: Regency[];
};

function App() {
  const provinces = useLoaderData() as Province[];
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedProvinceId = searchParams.get("province") || "";
  const selectedRegencyId = searchParams.get("regency") || "";
  const selectedDistrictId = searchParams.get("district") || "";

  const selectedProvince = provinces.find(
    (p) => p.id === selectedProvinceId
  );

  const regencies = selectedProvince?.regencies || [];

  const selectedRegency = regencies.find(
    (r) => r.id === selectedRegencyId
  );

  const districts = selectedRegency?.districts || [];

  const selectedDistrict = districts.find(
    (d) => d.id === selectedDistrictId
  );

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

  const handleReset = () => {
    setSearchParams({});
  };

  return (
    <main className="min-h-screen bg-gray-50 grid grid-cols-[320px_1fr]">

      {/* SIDEBAR */}
      <aside className="bg-white border-r p-8 space-y-8">

        <h1 className="text-xl font-semibold">
          <span>🌍</span>
          <span>Frontend Assessment</span>
        </h1>

        <div className="space-y-6">
          <label className="block text-xs font-semibold text-gray-400 mb-2 tracking-widest">
            FILTER WILAYAH
          </label>
          <div>
            <label className="block font-semibold mb-2">
              PROVINSI
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                🗺️
              </span>

              <select
                name="province"
                value={selectedProvinceId}
                onChange={(e) =>
                  handleChange("province", e.target.value)
                }
                className="w-full border rounded-lg pl-10 pr-3 py-2 bg-white"
              >
                <option value="">Pilih Provinsi</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-2">
              KOTA / KABUPATEN
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                🏙️
              </span>

              <select
                name="regency"
                value={selectedRegencyId}
                disabled={!selectedProvince}
                onChange={(e) =>
                  handleChange("regency", e.target.value)
                }
                className="w-full border rounded-lg pl-10 pr-3 py-2 bg-white disabled:bg-gray-100"
              >
                <option value="">Pilih Kota/Kabupaten</option>
                {regencies.map((regency) => (
                  <option key={regency.id} value={regency.id}>
                    {regency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-2">
              KECAMATAN
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                📍
              </span>

              <select
                name="district"
                value={selectedDistrictId}
                disabled={!selectedRegency}
                onChange={(e) =>
                  handleChange("district", e.target.value)
                }
                className="w-full border rounded-lg pl-10 pr-3 py-2 bg-white disabled:bg-gray-100"
              >
                <option value="">Pilih Kecamatan</option>
                {districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-full border-2 border-blue-500 text-blue-500 rounded-lg py-2 hover:bg-blue-50 transition flex items-center justify-center gap-2"
          >
            <span>🔄</span>
            <span>RESET</span>
          </button>

        </div>
      </aside>

      {/* CONTENT */}
      <section className="p-16">

        {/* Breadcrumb */}
        <div className="breadcrumb text-sm text-gray-400 mb-16">
          Indonesia
          {selectedProvince && ` > ${selectedProvince.name}`}
          {selectedRegency && ` > ${selectedRegency.name}`}
          {selectedDistrict && ` > ${selectedDistrict.name}`}
        </div>

        <div className="text-center space-y-20">

          {selectedProvince && (
            <div>
              <p className="text-xs tracking-widest text-blue-400 mb-4">
                PROVINSI
              </p>
              <h1 className="text-7xl font-bold text-gray-800">
                {selectedProvince.name}
              </h1>
            </div>
          )}

          {selectedRegency && (
            <div>
              <p className="text-xs tracking-widest text-blue-400 mb-4">
                KOTA / KABUPATEN
              </p>
              <h1 className="text-6xl font-bold text-gray-800">
                {selectedRegency.name}
              </h1>
            </div>
          )}

          {selectedDistrict && (
            <div>
              <p className="text-xs tracking-widest text-blue-400 mb-4">
                KECAMATAN
              </p>
              <h1 className="text-5xl font-bold text-gray-800">
                {selectedDistrict.name}
              </h1>
            </div>
          )}

        </div>

      </section>

    </main>
  );

}


export default App;