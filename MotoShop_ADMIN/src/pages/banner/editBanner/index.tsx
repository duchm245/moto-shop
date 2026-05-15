import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Api from '~/api/apis';
import { REQUEST_API } from '~/constants/method';
import { RootState } from '~/redux/reducers';
import { toast } from 'react-toastify';
import path from '~/constants/path';
import Images from '~/assets';
import { API_URL_IMAGE } from '~/constants/utils';
import { Banner } from '~/types/banner.type';
import { Category } from '~/types/category.type';

const EditBanner = () => {
  const token = useSelector((state: RootState) => state.ReducerAuth.token);
  const location = useLocation();
  const bannerId = location.state;
  const navigate = useNavigate();

  const [name, setName] = React.useState('');
  // Dùng string để tránh bug type mismatch với value="0" (Banner home)
  const [categoryId, setCategoryId] = React.useState<string>('');
  const [banner, setBanner] = React.useState<Banner>();
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [fileImg, setFileImg] = React.useState<File | undefined>();
  // Dùng state riêng cho img URL thay vì useMemo để tránh caching cũ
  const [img, setImg] = React.useState<string>('');
  const [isLocalFile, setIsLocalFile] = React.useState(false);

  // Cập nhật img mỗi khi fileImg thay đổi
  React.useEffect(() => {
    if (!fileImg) {
      setImg('');
      setIsLocalFile(false);
      return;
    }
    if (fileImg.size === 0) {
      // File rỗng = ảnh cũ từ server
      setImg(`${API_URL_IMAGE}${fileImg.name}`);
      setIsLocalFile(false);
    } else {
      // File mới được chọn từ máy
      const objectUrl = URL.createObjectURL(fileImg);
      setImg(objectUrl);
      setIsLocalFile(true);
      // Revoke object URL khi component unmount hoặc fileImg đổi
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [fileImg]);

  const refInputImage = React.useRef<HTMLInputElement>(null);
  const handleUpload = () => {
    refInputImage.current?.click();
  };
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0];
    if (fileFromLocal) {
      setFileImg(fileFromLocal);
    }
    // Reset input để có thể chọn lại cùng 1 file
    event.target.value = '';
  };

  // Khi banner load xong, điền vào các field
  React.useEffect(() => {
    if (banner != null) {
      setName(banner.name);
      // categoryId = 0 nghĩa là Banner home
      setCategoryId(String(banner.categoryId));
      setFileImg(new File([], banner.src));
    }
  }, [banner]);

  const getBanner = async () => {
    if (!!token) {
      try {
        const url = Api.detailBanner(bannerId);
        const [res] = await Promise.all([
          REQUEST_API({
            url: url,
            method: 'get',
            token: token,
          }),
        ]);
        if (res.status) {
          setBanner(res.data);
        } else {
          toast.error(`Không tìm thấy banner`, {
            position: 'top-right',
            pauseOnHover: false,
            theme: 'dark',
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getAllCategory = async () => {
    if (!!token) {
      try {
        const url = Api.getAllCategory2();
        const [res] = await Promise.all([
          REQUEST_API({
            url: url,
            method: 'get',
            token: token,
          }),
        ]);
        if (res.status) {
          setCategories(res.data);
        } else {
          toast.error(`${res.data}`, {
            position: 'top-right',
            pauseOnHover: false,
            theme: 'dark',
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  React.useEffect(() => {
    getBanner();
    getAllCategory();
  }, []);

  const handleChooseCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setCategoryId(selected); // Giữ dạng string, convert sang số khi gửi API
  };

  const updateBanner = async () => {
    if (!!token) {
      try {
        if (!name) {
          toast.error(`Tên banner không được để trống`, {
            position: 'top-right',
            pauseOnHover: false,
            theme: 'dark',
          });
          return;
        }
        if (!fileImg) {
          toast.error(`Vui lòng chọn 1 ảnh để làm banner`, {
            position: 'top-right',
            pauseOnHover: false,
            theme: 'dark',
          });
          return;
        }
        const data = {
          name: name,
          categoryId: categoryId !== '' ? Number(categoryId) : null,
          src: fileImg?.name,
        };
        const url = Api.updateBanner(bannerId);
        const [res] = await Promise.all([
          REQUEST_API({
            url: url,
            method: 'put',
            token: token,
            data: data,
          }),
        ]);
        if (res.status) {
          navigate(path.banners);
          toast.success(`Banner đã được cập nhật`, {
            position: 'top-right',
            pauseOnHover: false,
            theme: 'dark',
          });
        } else {
          toast.error(`${res.data}`, {
            position: 'top-right',
            pauseOnHover: false,
            theme: 'dark',
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto shadow-md border rounded-lg">
      <div className="flex items-center justify-center pt-3">
        <span className="font-bold text-xl uppercase">Sửa Banner</span>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-around mt-3">
          <div className="w-[30%] text-center text-black font-bold">Tên banner</div>
          <div className="w-[70%] flex items-center">
            <input
              className="w-[80%] rounded-lg h-9 pl-2 border-[#737373]"
              placeholder="Tên banner"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-around mt-3">
          <div className="w-[30%] text-center text-black font-bold">Danh mục</div>
          <div className="w-[70%] flex items-center">
            <select
              className="h-9 border-[#737373] text-black border-[2px] rounded-lg appearance-none text-center w-[80%]"
              onChange={handleChooseCategory}
              value={categoryId}
            >
              <option value="">-- Chọn danh mục --</option>
              {/* value="0" (string) để tránh lỗi type khi so sánh */}
              <option value="0">Banner home</option>
              {categories.map((item, i) => (
                <option value={String(item.id)} key={i}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center justify-around mt-3">
          <div className="w-[30%] text-center text-black font-bold">Hình ảnh</div>
          <div className="w-[70%] flex items-center text-sm text-gray-500">
            {isLocalFile ? 'Ảnh mới được chọn' : img ? 'Ảnh hiện tại' : 'Chưa có ảnh'}
          </div>
        </div>
        <div className="flex mt-3">
          <div className="w-[30%]"></div>
          <div className="w-[50%] h-auto p-3 border-black border border-dashed rounded-lg">
            <input
              className="hidden"
              type="file"
              accept=".jpg,.jpeg,.png"
              ref={refInputImage}
              onChange={onFileChange}
            />
            <div className="flex items-center justify-around cursor-pointer">
              {img ? (
                <div className="relative" onClick={handleUpload} title="Bấm để đổi ảnh">
                  <img src={img} className="w-auto h-auto object-contain max-h-64" />
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setFileImg(undefined);
                      setImg('');
                    }}
                    className="absolute w-[20px] h-[20px] rounded items-center justify-center flex bg-[#00000080] top-0 right-0"
                  >
                    <img src={Images.iconX} className="w-[10px] h-[10px]" />
                  </div>
                </div>
              ) : (
                <div onClick={handleUpload} className="flex flex-col items-center justify-center">
                  <img src={Images.chooseImage} className="w-[120px] h-[120px] object-contain pt-2" />
                  <span>Chọn ảnh để tải lên</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-3 ml-[15%]">
          <div
            className="w-[30%] flex justify-center items-center bg-blue rounded-md h-10 cursor-pointer"
            onClick={() => updateBanner()}
          >
            <span className="text-black font-bold">Cập nhật</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBanner;
