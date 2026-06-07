import React from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import productApi from '~/apis/product.apis';
import saleApi from '~/apis/sale.apis';
import Breadcrum from '~/components/breadcrumb';
import ItemProduct from '~/components/product';
import { Product } from '~/types/product.type';
import { Sale } from '~/types/sale.type';
import noUiSlider from 'nouislider';
import { formatPrice } from '~/constants/utils';
import 'nouislider/dist/nouislider.css';
import Pagination from '~/components/paginationItems';
import LoadingPage from '~/components/loadingPage';
import SpinLoading from '~/components/spinloading';
import categoryApi from '~/apis/category.apis';
import { Category } from '~/types/category.type';

interface Params {
  brand?: string;
  vehicleType?: string;
  condition?: string;
  minPrice: number;
  maxPrice: number;
  categoryId?: any | undefined;
  saleId?: any | undefined;
  pageNo: number;
  sortBy: string;
  sortDirection: string;
}
const ProductView = () => {
  const [listProduct, setListProduct] = React.useState<Product[]>([]);
  const [sales, setSales] = React.useState<Sale[]>([]);
  const location = useLocation();
  const state = location.state;
  const categoryId = state?.categoryId;
  const saleId = state?.saleId;
  // Brand & keyword pre-filled from mega menu navigation
  const [brand, setBrand] = React.useState(state?.brand ?? '');
  const [keyword, setKeyword] = React.useState(state?.keyword ?? '');
  const [selectedTypeId, setSelectedTypeId] = React.useState<number | null>(null);
  const [typeCategories, setTypeCategories] = React.useState<Category[]>([]);
  const [condition, setCondition] = React.useState('');
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(200000000);

  const BRANDS = ['Honda', 'Yamaha', 'Suzuki', 'TVS', 'Vinfast', 'SYM', 'GPX', 'Zontes'];
  const VEHICLE_TYPES = ['Xe số', 'Xe tay ga', 'Xe côn tay', 'Xe điện'];
  const [page, setPage] = React.useState(1);
  const [sortBy, setSortBy] = React.useState('');
  const [sortDirection, setSortDirection] = React.useState('');
  const [totalPage, setTotalPage] = React.useState(1);
  const [selectedSortOption, setSelectedSortOption] = React.useState('Mới nhất');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isShowFlter, setIsShowFilter] = React.useState(true);
  const [category, setCategory] = React.useState<Category>();
  const [showFillBrand, setShowFillBrand] = React.useState(false);
  const [showFillType, setShowFillType] = React.useState(false);
  const getProduct = async () => {
    try {
      setIsLoading(true);

      // Nếu có keyword từ mega menu → dùng /search?keyword= (tìm theo tên dòng xe)
      if (keyword) {
        const params: any = { keyword, pageNo: page, pageSize: 20, sortBy: sortBy || 'name' };
        const res = await productApi.searchProduct(params);
        if (res.data.status) {
          // searchProduct trả về list trực tiếp (không phân trang)
          const data: Product[] = Array.isArray(res.data.data)
            ? res.data.data
            : res.data.data?.data ?? [];
          // Lọc thêm theo brand nếu có (client-side sau khi nhận data)
          const filtered = brand ? data.filter((p: any) => p.brand?.toLowerCase() === brand.toLowerCase()) : data;
          setListProduct(filtered);
          setTotalPage(1);
        } else {
          setListProduct([]);
        }
        return;
      }

      // Không có keyword → dùng getAllProducts với bộ lọc đầy đủ
      const params: Params = {
        minPrice: minPrice,
        maxPrice: maxPrice,
        pageNo: page,
        sortBy: sortBy,
        sortDirection: sortDirection,
      };
      if (brand) params.brand = brand;
      if (condition) params.condition = condition;
      const effectiveCategoryId = selectedTypeId ?? categoryId;
      if (effectiveCategoryId) params.categoryId = effectiveCategoryId;
      if (saleId) params.saleId = saleId;
      const res = await productApi.getAllProducts(params);
      if (res.data.status) {
        setListProduct(res.data.data.data);
        const totalPages = Math.ceil(res.data.data.total / res.data.data.perPage);
        setTotalPage(totalPages);
        setPage(res.data.data.currentPage);
      } else {
        setListProduct([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    getProduct();
  }, []);

  // Đồng bộ brand & keyword khi điều hướng từ mega menu đến cùng trang product
  // (component không re-mount, chỉ location.state thay đổi)
  React.useEffect(() => {
    setBrand(location.state?.brand ?? '');
    setKeyword(location.state?.keyword ?? '');
  }, [location.state]);

  React.useEffect(() => {
    const loadTypeCategories = async () => {
      try {
        const res = await categoryApi.getAllCategory();
        if (res.data.status) {
          const raw: any = res.data.data;
          const all: Category[] = Array.isArray(raw) ? raw : (Array.isArray(raw?.data) ? raw.data : []);
          setTypeCategories(all.filter(c => VEHICLE_TYPES.includes(c.title)));
        }
      } catch (e) {}
    };
    loadTypeCategories();
  }, []);

  const getSale = async (id: number) => {
    try {
      const res = await saleApi.getSale(id);
      if (res.data.status) {
        const sale = res.data.data;
        setSales((prevMapping) => ({
          ...prevMapping,
          [id]: sale.discount,
        }));
      } else {
        toast.error(`${res.data.data}`, {
          position: 'top-right',
          pauseOnHover: false,
          theme: 'dark',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    if (listProduct.length > 0) {
      listProduct.forEach(async (item) => {
        if (item.sale != null && item.sale !== 0 && item.sale !== undefined) {
          await getSale(item.sale);
        }
      });
    }
  }, [listProduct]);
  const handleChooseBrand = (val: string) => setBrand(brand === val ? '' : val);
  const handleChooseType = (id: number) => setSelectedTypeId(selectedTypeId === id ? null : id);
  const handlePageClick = (page) => {
    setPage(page);
  };
  const handleCacelFilter = () => {
    setBrand('');
    setKeyword('');
    setSelectedTypeId(null);
    setCondition('');
    setMinPrice(0);
    setMaxPrice(200000000);
    setIsShowFilter(false);
  };
  React.useEffect(() => {
    const slider = document.getElementById('range-price') as any;

    noUiSlider.create(slider, {
      start: [minPrice, maxPrice],
      connect: true,
      range: {
        min: 0,
        max: 200000000,
      },
      tooltips: [
        {
          to(value) {
            return formatPrice(value);
          },
          from(value) {
            return formatPrice(value);
          },
        },
        {
          to(value) {
            return formatPrice(value);
          },
          from(value) {
            return formatPrice(value);
          },
        },
      ],
      pips: {
        mode: 'positions',
        values: [0, 100],
        format: {
          to(value) {
            return formatPrice(value);
          },
        },
        density: 100,
      },
    });

    slider.noUiSlider.on('update', (values, handle) => {
      if (handle === 0) {
        setMinPrice(parseInt(values[handle]));
      } else {
        setMaxPrice(parseInt(values[handle]));
      }
    });

    return () => {
      slider.noUiSlider.destroy();
    };
  }, [minPrice, maxPrice]);
  const handleSortChange = (sortByValue, sortDirectionValue, selectedOption) => {
    setSortBy(sortByValue);
    setSortDirection(sortDirectionValue);
    setSelectedSortOption(selectedOption);

    // Gọi hàm để tải sản phẩm với các giá trị sortBy và sortDirection mới
    getProduct();
  };
  React.useEffect(() => {
    getProduct();
  }, [brand, selectedTypeId, condition, minPrice, maxPrice, categoryId, page, sortBy, sortDirection, saleId, keyword]);
  const getCategory = async (id: number) => {
    if (!!categoryId) {
      try {
        const res = await categoryApi.getCategory(id);
        if (res.data.status) {
          setCategory(res.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  React.useEffect(() => {
    if (!!categoryId) {
      getCategory(categoryId);
    }
  }, [categoryId]);
  return (
    <>
      <div className="layout-collections">
        <Breadcrum title={categoryId ? category?.title : saleId ? 'Sản phẩm khuyến mãi' : keyword ? `${brand ? brand + ' ' : ''}${keyword}` : brand ? brand : 'Sản phẩm'} />
        <div className="container">
          {/* Active filter tags from mega menu */}
          {(brand || keyword) && (
            <div style={{ display: 'flex', gap: 8, padding: '10px 0', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: '#888' }}>Đang lọc:</span>
              {brand && (
                <span style={{ background: '#d71a21', color: '#fff', borderRadius: 4, padding: '3px 10px', fontSize: 13, fontWeight: 600 }}>
                  {brand}
                  <span style={{ cursor: 'pointer', marginLeft: 6 }} onClick={() => setBrand('')}>×</span>
                </span>
              )}
              {keyword && (
                <span style={{ background: '#333', color: '#fff', borderRadius: 4, padding: '3px 10px', fontSize: 13, fontWeight: 600 }}>
                  {keyword}
                  <span style={{ cursor: 'pointer', marginLeft: 6 }} onClick={() => setKeyword('')}>×</span>
                </span>
              )}
            </div>
          )}
          <div className="section-collection">
            <div className="row">
              <div className="col-lg-3 col-md-12 col-12 sidebar sidebar-left">
                <div className="filter-wrapper sticky-sidebar">
                  <div
                    className={`filter-content ${isShowFlter ? 'show-filter' : ''}`}
                    style={isShowFlter ? { display: 'block' } : { display: 'none' }}
                  >
                    <div className="filter-inner">
                      <div className="filter-head">
                        <p>Bộ lọc</p>
                        <a className=" btn-filter-close d-sm-block d-lg-none" onClick={() => setIsShowFilter(false)}>
                          <svg viewBox="0 0 19 19" role="presentation">
                            <path
                              d="M9.1923882 8.39339828l7.7781745-7.7781746 1.4142136 1.41421357-7.7781746 7.77817459 7.7781746 7.77817456L16.9705627 19l-7.7781745-7.7781746L1.41421356 19 0 17.5857864l7.7781746-7.77817456L0 2.02943725 1.41421356.61522369 9.1923882 8.39339828z"
                              fillRule="evenodd"
                            />
                          </svg>
                        </a>
                      </div>
                      <div className="filter-options">
                        {/* ./filter price */}
                        <div className="filter_group">
                          <div className="filter_group_block">
                            <div className="filter_group-subtitle">
                              <span>Khoảng giá</span>
                            </div>
                            <div className="filter_group-content filter-price">
                              <div className="filter-price__range">
                                <div
                                  id="range-price"
                                  className="noUi-target noUi-ltr noUi-horizontal noUi-txt-dir-ltr"
                                ></div>
                              </div>
                              <div className="filter-price__value">
                                <div id="smooth-steps-values">
                                  {formatPrice(minPrice)} - {formatPrice(maxPrice)}đ
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* filter hãng xe */}
                        <div className="filter_group">
                          <div className="filter_group_block">
                            <div
                              className={`filter_group-subtitle ${showFillBrand ? 'action-group' : ''}`}
                              onClick={() => setShowFillBrand(!showFillBrand)}
                            >
                              <span>Hãng xe</span>
                            </div>
                            <div className="filter_group-content filter-size" style={showFillBrand ? { display: 'none' } : {}}>
                              <ul className="checkbox-list clearfix">
                                {BRANDS.map((b, i) => (
                                  <li key={i}>
                                    <input
                                      type="checkbox"
                                      id={`brand-${i}`}
                                      onChange={() => handleChooseBrand(b)}
                                      checked={brand === b}
                                    />
                                    <label htmlFor={`brand-${i}`}>{b}</label>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        {/* filter loại xe */}
                        <div className="filter_group">
                          <div className="filter_group_block">
                            <div
                              className={`filter_group-subtitle ${showFillType ? 'action-group' : ''}`}
                              onClick={() => setShowFillType(!showFillType)}
                            >
                              <span>Loại xe</span>
                            </div>
                            <div className="filter_group-content filter-size" style={showFillType ? { display: 'none' } : {}}>
                              <ul className="checkbox-list">
                                {typeCategories.map((cat) => (
                                  <li key={cat.id}>
                                    <input
                                      type="checkbox"
                                      id={`vtype-${cat.id}`}
                                      onChange={() => handleChooseType(cat.id)}
                                      checked={selectedTypeId === cat.id}
                                    />
                                    <label htmlFor={`vtype-${cat.id}`}>{cat.title}</label>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        {/* filter tình trạng */}
                        <div className="filter_group">
                          <div className="filter_group_block">
                            <div className="filter_group-subtitle"><span>Tình trạng</span></div>
                            <div className="filter_group-content filter-size">
                              <ul className="checkbox-list">
                                {[{ val: '', label: 'Tất cả' }, { val: 'new', label: 'Xe mới' }, { val: 'used', label: 'Xe cũ' }].map((c) => (
                                  <li key={c.val}>
                                    <input
                                      type="radio"
                                      id={`cond-${c.val}`}
                                      name="condition"
                                      onChange={() => setCondition(c.val)}
                                      checked={condition === c.val}
                                    />
                                    <label htmlFor={`cond-${c.val}`}>{c.label}</label>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="filter-footer">
                        <button
                          id="clear-btn-filter"
                          className="btn-filter btn-filter-clear"
                          onClick={handleCacelFilter}
                        >
                          Hủy
                        </button>
                        <button
                          id="apply-btn-filter"
                          className="btn-filter btn-filter-apply"
                          onClick={() => setIsShowFilter(false)}
                        >
                          Áp dụng
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-12 col-12 collection main-container">
                <div className="toolbar-products">
                  <div className="head-title">
                    <h1 className="title">
                      {categoryId ? category?.title : saleId ? 'Sản phẩm khuyến mãi' : 'Sản phẩm'}
                    </h1>
                    <div className="product-count">
                      <div className="count">
                        <b>{listProduct.length}</b> sản phẩm
                      </div>
                    </div>
                  </div>
                  <div className="product-filter-mb" onClick={() => setIsShowFilter(!isShowFlter)}>
                    <p>Bộ lọc</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 459 459">
                      <g>
                        <g>
                          <g>
                            <path d="M178.5,382.5h102v-51h-102V382.5z M0,76.5v51h459v-51H0z M76.5,255h306v-51h-306V255z" />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="product-sort">
                    <label className="title">
                      Sắp xếp theo
                      <span className="text">{selectedSortOption}</span>
                    </label>
                    <ul className="sort-by sort-by-content">
                      <li>
                        <span
                          data-value="price-ascending"
                          onClick={() => handleSortChange('salePrice', 'asc', 'Giá: Tăng dần')}
                        >
                          Giá: Tăng dần
                        </span>
                      </li>
                      <li>
                        <span
                          data-value="price-descending"
                          onClick={() => handleSortChange('salePrice', 'desc', 'Giá: Giảm dần')}
                        >
                          Giá: Giảm dần
                        </span>
                      </li>
                      <li>
                        <span data-value="title-ascending" onClick={() => handleSortChange('name', 'asc', 'Tên: A-Z')}>
                          Tên: A-Z
                        </span>
                      </li>
                      <li>
                        <span
                          data-value="title-descending"
                          onClick={() => handleSortChange('name', 'desc', 'Tên: Z-A')}
                        >
                          Tên: Z-A
                        </span>
                      </li>
                      <li>
                        <span data-value="created-ascending" onClick={() => handleSortChange('id', 'asc', 'Cũ nhất')}>
                          Cũ nhất
                        </span>
                      </li>
                      <li>
                        <span
                          data-value="created-descending"
                          onClick={() => handleSortChange('id', 'desc', 'Mới nhất')}
                        >
                          Mới nhất
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row list-product-row listProductFilter">
                  {!!listProduct &&
                    !!listProduct.length &&
                    listProduct.map((item, i) => (
                      <React.Fragment key={item.id}>
                        <ItemProduct
                          id={item.id}
                          name={item.name}
                          price={item.price}
                          salePrice={item.salePrice}
                          img1={item.images?.[0]?.url ?? ''}
                          img2={item.images?.[1]?.url ?? item.images?.[0]?.url ?? ''}
                          sale={`${sales[item.sale]}`}
                          slide={false}
                          condition={item.condition}
                          isNew={item.isNew}
                          displacement={item.displacement}
                        />
                      </React.Fragment>
                    ))}
                </div>
                {isLoading && <SpinLoading />}
                <Pagination page={page} totalPage={totalPage} handlePageClick={handlePageClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductView;
