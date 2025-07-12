import { useState } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddCar = () => {
  const { axios, currency } = useAppContext();

  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (isLoading) return null;

    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append("image", image);

      formData.append("carData", JSON.stringify(car));

      const { data } = await axios.post("/api/owner/add-car", formData);

      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setCar({
          brand: "",
          model: "",
          year: 0,
          pricePerDay: 0,
          category: "",
          transmission: "",
          fuel_type: "",
          seating_capacity: 0,
          location: "",
          description: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title
        title="Add New Car"
        subTitle="Fill in details to list a new car for booking, including price, availability, and car specifications."
      />

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
      >
        {/* Car Image */}
        <div className="flex items-center gap-2 w-full">
          <label htmlFor="car-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt=""
              className="h-14 rounded cursor-pointer"
            />
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="car-image"
              accept="image/*"
              hidden
            />
          </label>
          <p className="text-sm text-gray-500">Upload a picture of your car</p>
        </div>

        {/* Car Brand & Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label>Brand</label>
            <input
              type="text"
              placeholder="e.g, BMW, Mercedes, Audi..."
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Model</label>
            <input
              type="text"
              placeholder="e.g. X5, E-Class, M4..."
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
            />
          </div>
        </div>

        {/* Car Year, Price, Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Year</label>
            <input
              type="number"
              placeholder="2025"
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.year}
              onChange={(e) => setCar({ ...car, year: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Daily Price ({currency})</label>
            <input
              type="number"
              placeholder="100"
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.pricePerDay}
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Category</label>
            <select
              onChange={(e) => setCar({ ...car, category: e.target.value })}
              value={car.category}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">Select a category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

        {/* Car Transmission, Fuel Type, Seating Capacity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Transmission</label>
            <select
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
              value={car.transmission}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">Select a transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Fuel Type</label>
            <select
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
              value={car.fuel_type}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">Select a fuel type</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Seating Capacity</label>
            <input
              type="number"
              placeholder="4"
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.seating_capacity}
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
            />
          </div>
        </div>

        {/* Car Location */}
        <div className="flex flex-col w-full">
          <label>Location</label>
          <select
            onChange={(e) => setCar({ ...car, location: e.target.value })}
            value={car.location}
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
          >
            <option value="">Select a loaction</option>
            <option value="Ampang">Ampang</option>
            <option value="Ampang Jaya">Ampang Jaya</option>
            <option value="Bagan Nakhoda Omar">Bagan Nakhoda Omar</option>
            <option value="Bandar Baru Bangi">Bandar Baru Bangi</option>
            <option value="Bandar Mahkota Cheras">Bandar Mahkota Cheras</option>
            <option value="Bandar Puchong Jaya">Bandar Puchong Jaya</option>
            <option value="Bandar Puncak Alam">Bandar Puncak Alam</option>
            <option value="Banting">Banting</option>
            <option value="Batang Berjuntal">Batang Berjuntal</option>
            <option value="Batang Kali">Batang Kali</option>
            <option value="Batu Arang">Batu Arang</option>
            <option value="Batu Caves">Batu Caves</option>
            <option value="Behrang Stesen">Behrang Stesen</option>
            <option value="Bentong">Bentong</option>
            <option value="Beranang">Beranang</option>
            <option value="Bestari Jaya">Bestari Jaya</option>
            <option value="Broga">Broga</option>
            <option value="Bukit Fraser">Bukit Fraser</option>
            <option value="Bukit Rotan">Bukit Rotan</option>
            <option value="Cheras">Cheras</option>
            <option value="Country Heights">Country Heights</option>
            <option value="Cyberjaya">Cyberjaya</option>
            <option value="Damansara Damai">Damansara Damai</option>
            <option value="Dengkil">Dengkil</option>
            <option value="Dusun Tua">Dusun Tua</option>
            <option value="Endah">Endah</option>
            <option value="Enstek">Enstek</option>
            <option value="Genting Highlands">Genting Highlands</option>
            <option value="Gumut">Gumut</option>
            <option value="Hulu Langat">Hulu Langat</option>
            <option value="Ijok">Ijok</option>
            <option value="Janda Baik">Janda Baik</option>
            <option value="Jenjarom">Jenjarom</option>
            <option value="Jeram">Jeram</option>
            <option value="Jugra">Jugra</option>
            <option value="Kajang">Kajang</option>
            <option value="Kalumpang">Kalumpang</option>
            <option value="Kampong Pulau Sebak">Kampong Pulau Sebak</option>
            <option value="Kampung Bagan Lalang">Kampung Bagan Lalang</option>
            <option value="Kampung Batu Batu">Kampung Batu Batu</option>
            <option value="Kampung Batu Belah">Kampung Batu Belah</option>
            <option value="Kampung Daching">Kampung Daching</option>
            <option value="Kampung Dusun Tua Seberang">
              Kampung Dusun Tua Seberang
            </option>
            <option value="Kampung Hutan Melintang">
              Kampung Hutan Melintang
            </option>
            <option value="Kampung India">Kampung India</option>
            <option value="Kampung Jawa">Kampung Jawa</option>
            <option value="Kampung Jawa Tengah">Kampung Jawa Tengah</option>
            <option value="Kampung Jelebu">Kampung Jelebu</option>
            <option value="Kampung Kelawar">Kampung Kelawar</option>
            <option value="Kampung Kuala Pajam">Kampung Kuala Pajam</option>
            <option value="Kampung Kubang Beras">Kampung Kubang Beras</option>
            <option value="Kampung Labohan Dagang">
              Kampung Labohan Dagang
            </option>
            <option value="Kampung Lubuk Kelubi">Kampung Lubuk Kelubi</option>
            <option value="Kampung Panchang Bedena">
              Kampung Panchang Bedena
            </option>
            <option value="Kampung Parit Baru Baroh">
              Kampung Parit Baru Baroh
            </option>
            <option value="Kampung Parit Serong">Kampung Parit Serong</option>
            <option value="Kampung Paya">Kampung Paya</option>
            <option value="Kampung Rinching Ulu">Kampung Rinching Ulu</option>
            <option value="Kampung Salak">Kampung Salak</option>
            <option value="Kampung Salak Tinggi">Kampung Salak Tinggi</option>
            <option value="Kampung Sekendi">Kampung Sekendi</option>
            <option value="Kampung Selayang Pandang">
              Kampung Selayang Pandang
            </option>
            <option value="Kampung Sesapan Batu Minangkabau">
              Kampung Sesapan Batu Minangkabau
            </option>
            <option value="Kampung Sungai Apong">Kampung Sungai Apong</option>
            <option value="Kampung Sungai Buah">Kampung Sungai Buah</option>
            <option value="Kampung Sungai Burong">Kampung Sungai Burong</option>
            <option value="Kampung Sungai Chinchin">
              Kampung Sungai Chinchin
            </option>
            <option value="Kampung Sungai Gatal">Kampung Sungai Gatal</option>
            <option value="Kampung Sungai Jai">Kampung Sungai Jai</option>
            <option value="Kampung Sungai Kajang">Kampung Sungai Kajang</option>
            <option value="Kampung Sungai Kembong Hilir">
              Kampung Sungai Kembong Hilir
            </option>
            <option value="Kampung Sungai Kembong Ulu Bangi">
              Kampung Sungai Kembong Ulu Bangi
            </option>
            <option value="Kampung Sungai Lalang">Kampung Sungai Lalang</option>
            <option value="Kampung Sungai Lang">Kampung Sungai Lang</option>
            <option value="Kampung Sungai Panjang">
              Kampung Sungai Panjang
            </option>
            <option value="Kampung Sungai Pening">Kampung Sungai Pening</option>
            <option value="Kampung Sungai Rinching">
              Kampung Sungai Rinching
            </option>
            <option value="Kampung Sungai Tengar">Kampung Sungai Tengar</option>
            <option value="Kampung Tangkas">Kampung Tangkas</option>
            <option value="Kampung Tanjong Buloh">Kampung Tanjong Buloh</option>
            <option value="Kampung Teluk Rhu">Kampung Teluk Rhu</option>
            <option value="Kanching">Kanching</option>
            <option value="Kapar">Kapar</option>
            <option value="Kerling">Kerling</option>
            <option value="Klang">Klang</option>
            <option value="Kota Warisan">Kota Warisan</option>
            <option value="Kuala Kubu Bharu">Kuala Kubu Bharu</option>
            <option value="Kuala Lumpur">Kuala Lumpur</option>
            <option value="Kuala Selangor">Kuala Selangor</option>
            <option value="Labu">Labu</option>
            <option value="Lenggeng">Lenggeng</option>
            <option value="Mantin">Mantin</option>
            <option value="Meru">Meru</option>
            <option value="Morib">Morib</option>
            <option value="Nilai">Nilai</option>
            <option value="Pasir Penambang">Pasir Penambang</option>
            <option value="Pelabuhan Klang">Pelabuhan Klang</option>
            <option value="Permatang">Permatang</option>
            <option value="Petaling Jaya">Petaling Jaya</option>
            <option value="Port Dickson">Port Dickson</option>
            <option value="Puchong">Puchong</option>
            <option value="Pulau Carey">Pulau Carey</option>
            <option value="Pulau Ketam">Pulau Ketam</option>
            <option value="Putrajaya">Putrajaya</option>
            <option value="Rantau Panjang">Rantau Panjang</option>
            <option value="Rasa">Rasa</option>
            <option value="Raub">Raub</option>
            <option value="Rawang">Rawang</option>
            <option value="Sabak">Sabak</option>
            <option value="Sabak Bernam">Sabak Bernam</option>
            <option value="Sekinchan">Sekinchan</option>
            <option value="Selekoh">Selekoh</option>
            <option value="Semenyih">Semenyih</option>
            <option value="Sepang">Sepang</option>
            <option value="Serdang">Serdang</option>
            <option value="Serendah">Serendah</option>
            <option value="Seri Kembangan">Seri Kembangan</option>
            <option value="Shah Alam">Shah Alam</option>
            <option value="Slim River">Slim River</option>
            <option value="Subang Jaya">Subang Jaya</option>
            <option value="Sungai Air Tawar">Sungai Air Tawar</option>
            <option value="Sungai Besar">Sungai Besar</option>
            <option value="Sungai Buloh">Sungai Buloh</option>
            <option value="Sungai Gulang Gulang">Sungai Gulang Gulang</option>
            <option value="Sungai Kandis">Sungai Kandis</option>
            <option value="Sungai Pelek">Sungai Pelek</option>
            <option value="Sungai Sekamat">Sungai Sekamat</option>
            <option value="Sungai Tengi Kanan">Sungai Tengi Kanan</option>
            <option value="Taman Bukit Permai">Taman Bukit Permai</option>
            <option value="Taman Melawati">Taman Melawati</option>
            <option value="Taman Muhibah">Taman Muhibah</option>
            <option value="Taman Mulia Jaya">Taman Mulia Jaya</option>
            <option value="Taman Murni 2">Taman Murni 2</option>
            <option value="Taman Paya Jaras Permai">
              Taman Paya Jaras Permai
            </option>
            <option value="Taman Seri Gombak">Taman Seri Gombak</option>
            <option value="Tanjung Karang">Tanjung Karang</option>
            <option value="Tanjung Malim">Tanjung Malim</option>
            <option value="Tanjung Sepat">Tanjung Sepat</option>
            <option value="Tasek Permai">Tasek Permai</option>
            <option value="Teluk Panglima Garang">Teluk Panglima Garang</option>
            <option value="Teras">Teras</option>
            <option value="Teras Jernang">Teras Jernang</option>
          </select>
        </div>
        {/* Car Description */}
        <div className="flex flex-col w-full">
          <label>Description</label>
          <textarea
            rows={5}
            placeholder="e.g. A luxurious SUV with a spacious interior and powerful engine."
            required
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
          ></textarea>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer">
          <img src={assets.tick_icon} alt="" />
          {isLoading ? "Listing..." : "List Your Car"}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
