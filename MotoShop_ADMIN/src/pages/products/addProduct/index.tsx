import React from 'react';
import { useSelector } from 'react-redux';
import Api from '~/api/apis';
import { REQUEST_API } from '~/constants/method';
import { toast } from 'react-toastify';
import { RootState } from '~/redux/reducers';
import Images from '~/assets';
import { Category } from '~/types/category.type';
import { useNavigate } from 'react-router-dom';
import Editor from '~/components/quill';

interface VariantForm {
  name: string;
  colorName: string;
  colorCode: string;
  stock: string;
}

const AddProduct = () => {
  const token = useSelector((state: RootState) => state.ReducerAuth.token);
  const user = useSelector((state: RootState) => state.ReducerAuth.user);
  const navigate = useNavigate();

  const [productName, setProductName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [salePrice, setSalePrice] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [category, setCategory] = React.useState<Category[]>([]);
  const [categoryId, setCategoryId] = React.useState<any>();

  const [vehicleCondition, setVehicleCondition] = React.useState('new');
  const [manufacturingYear, setManufacturingYear] = React.useState('');
  const [mileage, setMileage] = React.useState('0');

  const [brand, setBrand] = React.useState('');
  const [vehicleType, setVehicleType] = React.useState('');
  const [engineType, setEngineType] = React.useState('');
  const [displacement, setDisplacement] = React.useState('');
  const [maxPower, setMaxPower] = React.useState('');
  const [maxTorque, setMaxTorque] = React.useState('');
  const [transmission, setTransmission] = React.useState('');
  const [fuelSystem, setFuelSystem] = React.useState('');
  const [fuelCapacity, setFuelCapacity] = React.useState('');
  const [fuelConsumption, setFuelConsumption] = React.useState('');
  const [dimensions, setDimensions] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [seatHeight, setSeatHeight] = React.useState('');
  const [groundClearance, setGroundClearance] = React.useState('');
  const [warrantyInfo, setWarrantyInfo] = React.useState('');
  const [origin, setOrigin] = React.useState('');

  const [installmentSupported, setInstallmentSupported] = React.useState(false);
  const [installmentMonths, setInstallmentMonths] = React.useState('36');
  const [downPaymentPercent, setDownPaymentPercent] = React.useState('30');

  const [variants, setVariants] = React.useState<VariantForm[]>([
    { name: '', colorName: '', colorCode: '#000000', stock: '1' },
  ]);

  const [selectedImages, setSelectedImages] = React.useState<File[]>([]);
  const refInputImage = React.useRef<HTMLInputElement>(null);

  const handleVariantChange = (index: number, field: keyof VariantForm, value: string) => {
    setVariants((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddVariant = () => {
    setVariants((prev) => [...prev, { name: '', colorName: '', colorCode: '#000000', stock: '1' }]);
  };

  const handleRemoveVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => refInputImage.current?.click();

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesFromLocal = event.target.files;
    if (filesFromLocal) {
      const newSelectedImages = [...selectedImages];
      for (let i = 0; i < filesFromLocal.length; i++) {
        newSelectedImages.push(filesFromLocal[i]);
      }
      setSelectedImages(newSelectedImages);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const getAllCategory = async () => {
    if (!token) return;
    try {
      const url = Api.getAllCategory2();
      const [res] = await Promise.all([REQUEST_API({ url, method: 'get', token })]);
      if (res.status) {
        setCategory(res.data);
      } else {
        toast.error('Có lỗi xảy ra', { position: 'top-right', pauseOnHover: false, theme: 'dark' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getAllCategory();
  }, []);

  const handleCreateProduct = async () => {
    if (!token) return;
    if (!productName) {
      toast.error('Vui lòng nhập tên sản phẩm', { position: 'top-right', pauseOnHover: false, theme: 'dark' });
      return;
    }
    if (!description) {
      toast.error('Vui lòng mô tả sản phẩm', { position: 'top-right', pauseOnHover: false, theme: 'dark' });
      return;
    }
    if (!price || isNaN(Number(price))) {
      toast.error('Vui lòng nhập giá hợp lệ', { position: 'top-right', pauseOnHover: false, theme: 'dark' });
      return;
    }
    if (selectedImages.length < 4) {
      toast.error('Vui lòng chọn 4 ảnh cho sản phẩm', { position: 'top-right', pauseOnHover: false, theme: 'dark' });
      return;
    }
    if (!categoryId) {
      toast.error('Vui lòng chọn 1 danh mục', { position: 'top-right', pauseOnHover: false, theme: 'dark' });
      return;
    }
    if (!brand) {
      toast.error('Vui lòng nhập hãng xe', { position: 'top-right', pauseOnHover: false, theme: 'dark' });
      return;
    }
    if (variants.length === 0 || !variants[0].name) {
      toast.error('Vui lòng thêm ít nhất 1 phiên bản xe', { position: 'top-right', pauseOnHover: false, theme: 'dark' });
      return;
    }

    const variantsData = variants.map((v) => ({
      name: v.name,
      colorName: v.colorName,
      colorCode: v.colorCode,
      stock: parseInt(v.stock, 10) || 0,
    }));

    const imagesData = selectedImages.map((item) => ({ url: item.name }));

    const data = {
      name: productName,
      description,
      price: Number(price),
      salePrice: salePrice ? Number(salePrice) : null,
      categoryId,
      userId: user.id,
      vehicleCondition,
      manufacturingYear: manufacturingYear ? Number(manufacturingYear) : null,
      mileage: Number(mileage) || 0,
      isNew: vehicleCondition === 'new',
      brand,
      vehicleType,
      engineType,
      displacement: displacement ? Number(displacement) : null,
      maxPower,
      maxTorque,
      transmission,
      fuelSystem,
      fuelCapacity: fuelCapacity ? Number(fuelCapacity) : null,
      fuelConsumption,
      dimensions,
      weight: weight ? Number(weight) : null,
      seatHeight: seatHeight ? Number(seatHeight) : null,
      groundClearance: groundClearance ? Number(groundClearance) : null,
      warrantyInfo,
      origin,
      installmentSupported,
      installmentMonths: Number(installmentMonths) || 36,
      downPaymentPercent: Number(downPaymentPercent) || 30,
      variants: variantsData,
      images: imagesData,
    };

    try {
      const url = Api.createProduct();
      const [res] = await Promise.all([REQUEST_API({ url, method: 'post', token, data })]);
      if (res.status) {
        navigate(-1);
        toast.success('Tạo mới sản phẩm thành công', { position: 'top-right', pauseOnHover: false, theme: 'dark' });
      } else {
        toast.error(`${res.data}`, { position: 'top-right', pauseOnHover: false, theme: 'dark' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val !== '--Chọn danh mục--') setCategoryId(val);
  };

  const specFields: { label: string; value: string; set: React.Dispatch<React.SetStateAction<string>>; placeholder: string }[] = [
    { label: 'Hãng xe *', value: brand, set: setBrand, placeholder: 'Honda, Yamaha, Suzuki...' },
    { label: 'Loại xe', value: vehicleType, set: setVehicleType, placeholder: 'Xe số, Xe ga, Xe côn tay...' },
    { label: 'Loại động cơ', value: engineType, set: setEngineType, placeholder: 'SOHC, DOHC...' },
    { label: 'Dung tích xi-lanh (cc)', value: displacement, set: setDisplacement, placeholder: '110, 150, 250...' },
    { label: 'Công suất tối đa', value: maxPower, set: setMaxPower, placeholder: 'VD: 8.3 kW / 7.500 rpm' },
    { label: 'Mô-men xoắn tối đa', value: maxTorque, set: setMaxTorque, placeholder: 'VD: 11 N.m / 6.000 rpm' },
    { label: 'Hộp số', value: transmission, set: setTransmission, placeholder: 'CVT, 4 số, 5 số...' },
    { label: 'Hệ thống nhiên liệu', value: fuelSystem, set: setFuelSystem, placeholder: 'Phun xăng điện tử, Chế hoà khí...' },
    { label: 'Dung tích bình xăng (L)', value: fuelCapacity, set: setFuelCapacity, placeholder: '3.7, 5.5...' },
    { label: 'Mức tiêu thụ (L/100km)', value: fuelConsumption, set: setFuelConsumption, placeholder: 'VD: 1.8 L/100km' },
    { label: 'Kích thước (D×R×C mm)', value: dimensions, set: setDimensions, placeholder: '1860×680×1040' },
    { label: 'Trọng lượng (kg)', value: weight, set: setWeight, placeholder: '98, 120...' },
    { label: 'Chiều cao yên (mm)', value: seatHeight, set: setSeatHeight, placeholder: '780, 820...' },
    { label: 'Khoảng sáng gầm (mm)', value: groundClearance, set: setGroundClearance, placeholder: '140, 165...' },
  ];

  return (
    <>
      {/* Thông tin cơ bản */}
      <div className="flex items-start justify-around mt-0 gap-4">
        <div className="w-[70%] flex flex-col border rounded-md p-5">
          <span className="text-lg font-semibold text-blue">Thông tin sản phẩm</span>
          <div className="w-full h-[1px] bg-black mb-4"></div>
          <div className="flex items-center pt-3">
            <span className="text-base text-black font-bold w-24">Tên xe:</span>
            <input
              className="h-9 ml-2 pl-2 border-black border-[1px] rounded-lg flex-1"
              placeholder="Nhập tên xe"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="flex flex-col pt-4">
            <span className="text-base text-black font-bold mb-2">Mô tả:</span>
            <Editor value={description} onChange={setDescription} placeholder={'Viết mô tả ở đây'} />
          </div>
        </div>
        <div className="w-[25%] flex flex-col gap-4">
          <div className="flex flex-col border rounded-md p-5">
            <span className="text-lg font-semibold text-blue">Giá</span>
            <div className="w-full h-[1px] bg-black mb-3"></div>
            <div className="flex items-center pt-2">
              <span className="text-sm font-bold w-28">Giá niêm yết:</span>
              <input
                className="h-9 ml-2 pl-2 border-black border-[1px] rounded-lg flex-1"
                placeholder="VND"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex items-center pt-2">
              <span className="text-sm font-bold w-28">Giá KM:</span>
              <input
                className="h-9 ml-2 pl-2 border-black border-[1px] rounded-lg flex-1"
                placeholder="VND (tuỳ chọn)"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col border rounded-md p-5">
            <span className="text-lg font-semibold text-blue">Danh mục</span>
            <div className="w-full h-[1px] bg-black mb-3"></div>
            <select className="h-9 border-black border-[1px] rounded-lg px-2" onChange={handleCategoryChange}>
              <option value="">--Chọn danh mục--</option>
              {category.map((item, i) => (
                <option value={item.id} key={i}>{item.title}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Hình ảnh */}
      <div className="flex items-start justify-around mt-5 gap-4">
        <div className="w-[70%] flex flex-col border rounded-md p-5">
          <span className="text-lg font-semibold text-blue">Hình ảnh</span>
          <div className="w-full h-[1px] bg-black mb-3"></div>
          <div className="w-full h-auto border-black border border-dashed rounded-lg mt-2 p-3">
            <input className="hidden" type="file" accept=".jpg,.jpeg,.png" multiple ref={refInputImage} onChange={onFileChange} />
            <div className="grid grid-cols-4 gap-4 items-center justify-around cursor-pointer">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img src={URL.createObjectURL(image)} className="w-40 h-40 object-contain" />
                  <div
                    onClick={() => handleRemoveImage(index)}
                    className="absolute w-[20px] h-[20px] rounded items-center justify-center flex bg-[#00000080] top-0 right-0"
                  >
                    <img src={Images.iconX} className="w-[10px] h-[10px]" />
                  </div>
                </div>
              ))}
              <div onClick={handleUpload} className="flex flex-col items-center justify-center">
                <img src={Images.chooseImage} className="w-[120px] h-[120px] object-contain" />
                <span>Chọn ảnh để tải lên</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mt-3">
            <span className="text-sm text-black">Hình ảnh đầu tiên và thứ 2 được làm ảnh đại diện</span>
          </div>
        </div>
      </div>

      {/* Tình trạng xe */}
      <div className="flex items-start justify-around mt-5 gap-4">
        <div className="w-[70%] flex flex-col border rounded-md p-5">
          <span className="text-lg font-semibold text-blue">Tình trạng xe</span>
          <div className="w-full h-[1px] bg-black mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="font-bold text-sm mb-1">Tình trạng:</span>
              <select className="h-9 border-black border-[1px] rounded-lg px-2" value={vehicleCondition} onChange={(e) => setVehicleCondition(e.target.value)}>
                <option value="new">Xe mới</option>
                <option value="used">Xe cũ</option>
              </select>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm mb-1">Năm sản xuất:</span>
              <input className="h-9 pl-2 border-black border-[1px] rounded-lg" placeholder="VD: 2024" value={manufacturingYear} onChange={(e) => setManufacturingYear(e.target.value)} />
            </div>
            {vehicleCondition === 'used' && (
              <div className="flex flex-col">
                <span className="font-bold text-sm mb-1">Số km đã đi:</span>
                <input className="h-9 pl-2 border-black border-[1px] rounded-lg" placeholder="km" value={mileage} onChange={(e) => setMileage(e.target.value)} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Thông số kỹ thuật */}
      <div className="flex items-start justify-around mt-5 gap-4">
        <div className="w-[70%] flex flex-col border rounded-md p-5">
          <span className="text-lg font-semibold text-blue">Thông số kỹ thuật</span>
          <div className="w-full h-[1px] bg-black mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            {specFields.map((field) => (
              <div className="flex flex-col" key={field.label}>
                <span className="font-bold text-sm mb-1">{field.label}:</span>
                {field.label === 'Loại xe' ? (
                  <select
                    className="h-9 border-black border-[1px] rounded-lg px-2"
                    value={field.value}
                    onChange={(e) => field.set(e.target.value)}
                  >
                    <option value="">-- Chọn loại xe --</option>
                    <option value="Xe số">Xe số</option>
                    <option value="Xe tay ga">Xe tay ga</option>
                    <option value="Xe côn tay">Xe côn tay</option>
                    <option value="Xe điện">Xe điện</option>
                  </select>
                ) : (
                  <input
                    className="h-9 pl-2 border-black border-[1px] rounded-lg"
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={(e) => field.set(e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bảo hành & Xuất xứ */}
      <div className="flex items-start justify-around mt-5 gap-4">
        <div className="w-[70%] flex flex-col border rounded-md p-5">
          <span className="text-lg font-semibold text-blue">Bảo hành & Xuất xứ</span>
          <div className="w-full h-[1px] bg-black mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="font-bold text-sm mb-1">Thông tin bảo hành:</span>
              <input className="h-9 pl-2 border-black border-[1px] rounded-lg" placeholder="VD: 3 năm hoặc 30.000 km" value={warrantyInfo} onChange={(e) => setWarrantyInfo(e.target.value)} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm mb-1">Xuất xứ:</span>
              <input className="h-9 pl-2 border-black border-[1px] rounded-lg" placeholder="Việt Nam, Thái Lan, Ý..." value={origin} onChange={(e) => setOrigin(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      {/* Trả góp */}
      <div className="flex items-start justify-around mt-5 gap-4">
        <div className="w-[70%] flex flex-col border rounded-md p-5">
          <span className="text-lg font-semibold text-blue">Chính sách trả góp</span>
          <div className="w-full h-[1px] bg-black mb-4"></div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="installmentSupported"
              checked={installmentSupported}
              onChange={(e) => setInstallmentSupported(e.target.checked)}
              className="w-4 h-4 mr-2"
            />
            <label htmlFor="installmentSupported" className="font-bold text-sm cursor-pointer">Hỗ trợ trả góp</label>
          </div>
          {installmentSupported && (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="font-bold text-sm mb-1">Số tháng trả góp:</span>
                <select className="h-9 border-black border-[1px] rounded-lg px-2" value={installmentMonths} onChange={(e) => setInstallmentMonths(e.target.value)}>
                  <option value="12">12 tháng</option>
                  <option value="24">24 tháng</option>
                  <option value="36">36 tháng</option>
                  <option value="48">48 tháng</option>
                  <option value="60">60 tháng</option>
                </select>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm mb-1">Tỷ lệ trả trước (%):</span>
                <input
                  className="h-9 pl-2 border-black border-[1px] rounded-lg"
                  placeholder="30"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Phiên bản xe */}
      <div className="flex items-start justify-around mt-5 gap-4">
        <div className="w-[70%] flex flex-col border rounded-md p-5">
          <span className="text-lg font-semibold text-blue">Phiên bản xe</span>
          <div className="w-full h-[1px] bg-black mb-4"></div>
          <div className="grid grid-cols-4 gap-2 mb-2 font-bold text-sm">
            <span>Tên phiên bản *</span>
            <span>Màu sắc</span>
            <span>Mã màu</span>
            <span>Số lượng</span>
          </div>
          {variants.map((variant, index) => (
            <div key={index} className="grid grid-cols-4 gap-2 mb-2 items-center">
              <input
                type="text"
                className="h-9 pl-2 border-black border-[1px] rounded-lg"
                placeholder="VD: Cao Cấp"
                value={variant.name}
                onChange={(e) => handleVariantChange(index, 'name', e.target.value)}
              />
              <input
                type="text"
                className="h-9 pl-2 border-black border-[1px] rounded-lg"
                placeholder="VD: Đỏ"
                value={variant.colorName}
                onChange={(e) => handleVariantChange(index, 'colorName', e.target.value)}
              />
              <input
                type="color"
                className="h-9 w-full border-black border-[1px] rounded-lg cursor-pointer"
                value={variant.colorCode}
                onChange={(e) => handleVariantChange(index, 'colorCode', e.target.value)}
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  className="h-9 pl-2 border-black border-[1px] rounded-lg flex-1"
                  placeholder="SL"
                  value={variant.stock}
                  onChange={(e) => handleVariantChange(index, 'stock', e.target.value)}
                />
                <button className="bg-red-500 text-white px-3 rounded-md" onClick={() => handleRemoveVariant(index)}>
                  Xóa
                </button>
              </div>
            </div>
          ))}
          <button className="bg-blue cursor-pointer text-white px-4 py-1 mt-2 rounded-md w-fit" onClick={handleAddVariant}>
            + Thêm phiên bản
          </button>
        </div>
        <div className="w-[25%] self-end">
          <div
            className="bg-blue w-full h-10 flex items-center justify-center rounded-lg cursor-pointer"
            onClick={handleCreateProduct}
          >
            <span className="text-white uppercase">Thêm sản phẩm</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
