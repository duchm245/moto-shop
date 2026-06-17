import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Api from '~/api/apis';
import { REQUEST_API } from '~/constants/method';
import { RootState } from '~/redux/reducers';
import { toast } from 'react-toastify';
import { Sale } from '~/types/sale.type';
import { Product } from '~/types/product.type';
import { API_URL_IMAGE, resolveImageUrl } from '~/constants/utils';
import path from '~/constants/path';

const DetailSale = () => {
  const location = useLocation();
  const item = location.state.item;
  const token = useSelector((state: RootState) => state.ReducerAuth.token);
  const navigate = useNavigate();
  const [sale, setSale] = React.useState<Sale>();
  const [productSale, setProductSale] = React.useState<Product[]>([]);
  const [keyword, setKeyword] = React.useState('');
  const [removingId, setRemovingId] = React.useState<number | null>(null);

  const getProductSale = async () => {
    if (!!token) {
      try {
        const url = Api.getProductSale(item.id, keyword);
        const [res] = await Promise.all([
          REQUEST_API({ url, method: 'get', token }),
        ]);
        if (res.status) {
          setProductSale(res.data);
        } else {
          toast.error(`${res.data}`, { position: 'top-right', theme: 'dark' });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  React.useEffect(() => {
    getProductSale();
  }, []);

  React.useEffect(() => {
    if (item != null) setSale(item);
  }, [item]);

  const handleRemoveProduct = async (productId: number) => {
    if (!token) return;
    try {
      setRemovingId(productId);
      const url = Api.removeProSale(item.id, [productId]);
      const [res] = await Promise.all([
        REQUEST_API({ url, method: 'post', token }),
      ]);
      if (res.status) {
        toast.success('Đã xóa sản phẩm khỏi khuyến mãi', { position: 'top-right', theme: 'dark' });
        getProductSale();
      } else {
        toast.error(`${res.data}`, { position: 'top-right', theme: 'dark' });
      }
    } catch (e) {
      toast.error('Đã xảy ra lỗi', { position: 'top-right', theme: 'dark' });
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <>
      <div className="flex mt-0">
        {/* ── Thông tin sale ── */}
        <div className="flex flex-col border rounded-md p-5 w-[40%] min-w-[280px]">
          <span className="text-lg font-semibold text-blue">Thông tin khuyến mãi</span>
          <div className="w-full h-[1px] bg-black mb-3" />
          <div className="flex items-center pt-3">
            <span className="text-sm text-black font-bold w-32">Tên khuyến mãi:</span>
            <span className="text-sm ml-2">{sale?.name}</span>
          </div>
          <div className="flex items-center pt-3">
            <span className="text-sm text-black font-bold w-32">Giảm giá:</span>
            <span className="text-sm ml-2 text-red-500 font-bold">{sale?.discount} %</span>
          </div>
          <div className="flex items-center pt-3">
            <span className="text-sm text-black font-bold w-32">Ngày bắt đầu:</span>
            <span className="text-sm ml-2">{sale?.startDate}</span>
          </div>
          <div className="flex items-center pt-3">
            <span className="text-sm text-black font-bold w-32">Ngày kết thúc:</span>
            <span className="text-sm ml-2">{sale?.endDate}</span>
          </div>
          <div className="flex items-center pt-3">
            <span className="text-sm text-black font-bold w-32">Ngày tạo:</span>
            <span className="text-sm ml-2">{sale?.createdDate}</span>
          </div>
          <div className="flex items-center pt-3">
            <span className="text-sm text-black font-bold w-32">Trạng thái:</span>
            {sale?.isActive === 1 && <span className="text-sm ml-2 text-green-500 font-semibold">● Hoạt động</span>}
            {sale?.isActive === 0 && <span className="text-sm ml-2 text-red-500 font-semibold">● Đã khóa</span>}
          </div>

          {/* Nút thêm sản phẩm */}
          <button
            className="mt-6 flex items-center justify-center gap-2 bg-blue text-white rounded-md py-2 px-4 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate(path.addProductToSale, { state: item.id })}
          >
            <i className="bx bxs-plus-circle text-xl" />
            <span className="font-semibold text-sm">Thêm sản phẩm vào sale</span>
          </button>
        </div>

        {/* ── Danh sách sản phẩm trong sale ── */}
        <div className="flex flex-col border rounded-md p-5 ml-5 w-full overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-blue">
                Sản phẩm trong sale
                <span className="ml-2 text-sm text-gray-500 font-normal">({productSale.length} sản phẩm)</span>
              </span>
              <input
                value={keyword}
                className="border-[2px] rounded-md border-black ml-3 pl-3 h-8 text-sm"
                placeholder="Tìm sản phẩm..."
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && getProductSale()}
              />
              <i
                className="bx bx-search text-2xl text-blue cursor-pointer"
                onClick={() => getProductSale()}
              />
            </div>
          </div>
          <div className="w-full h-[1px] bg-black mb-2" />

          {productSale.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <i className="bx bx-package text-5xl mb-2" />
              <p className="text-sm">Chưa có sản phẩm nào trong sale này</p>
              <button
                className="mt-3 text-blue underline text-sm cursor-pointer"
                onClick={() => navigate(path.addProductToSale, { state: item.id })}
              >
                Thêm sản phẩm ngay
              </button>
            </div>
          ) : (
            <table className="table w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="w-[8%] text-center text-black text-sm">SKU</th>
                  <th className="w-[25%] text-left text-black text-sm">Tên sản phẩm</th>
                  <th className="w-[15%] text-center text-black text-sm">Hình ảnh</th>
                  <th className="w-[15%] text-center text-black text-sm">Giá gốc</th>
                  <th className="w-[15%] text-center text-black text-sm">Sau giảm giá</th>
                  <th className="w-[12%] text-center text-black text-sm">Trạng thái</th>
                  <th className="w-[10%] text-center text-black text-sm">Xóa</th>
                </tr>
              </thead>
              <tbody>
                {productSale.map((prod, i) => {
                  const afterDiscount = sale?.discount
                    ? Math.round(prod.price * (1 - sale.discount / 100))
                    : prod.price;
                  return (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="text-center text-sm py-2">{prod.sku}</td>
                      <td className="text-left text-sm py-2 font-medium">{prod.name}</td>
                      <td className="flex justify-center py-2">
                        <img
                          src={resolveImageUrl(prod?.images?.[0]?.url)}
                          className="w-16 h-16 object-contain rounded"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.png'; }}
                        />
                      </td>
                      <td className="text-center text-sm py-2 line-through text-gray-400">
                        {formatPrice(prod.price)}
                      </td>
                      <td className="text-center text-sm py-2 text-red-500 font-semibold">
                        {formatPrice(afterDiscount)}
                      </td>
                      <td className="text-center text-sm py-2">
                        {prod.status === 1
                          ? <span className="text-green-500">Hoạt động</span>
                          : <span className="text-red-500">Đã khóa</span>}
                      </td>
                      <td className="text-center py-2">
                        <button
                          onClick={() => handleRemoveProduct(prod.id)}
                          disabled={removingId === prod.id}
                          className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-40"
                          title="Xóa khỏi sale"
                        >
                          {removingId === prod.id
                            ? <i className="bx bx-loader-alt bx-spin text-xl" />
                            : <i className="bx bx-trash text-xl" />}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailSale;
