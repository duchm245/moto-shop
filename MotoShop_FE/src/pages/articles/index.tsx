import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import articleApi from '~/apis/article.apis';
import categoryApi from '~/apis/category.apis';
import Breadcrum from '~/components/breadcrumb';
import Pagination from '~/components/paginationItems';
import SpinLoading from '~/components/spinloading';
import { formatDateNumber, formatDateString } from '~/constants/formatDate';
import path from '~/constants/path';
import { API_URL_IMAGE, resolveImageUrl } from '~/constants/utils';
import { Article } from '~/types/article.type';
import { Category } from '~/types/category.type';
import './styles.css';

const ARTICLE_TYPE = 2;

function getTagClass(title: string): string {
  const t = (title || '').toLowerCase();
  if (t.includes('khuyến') || t.includes('promo'))   return 'tag-promo';
  if (t.includes('tuyển')  || t.includes('recruit')) return 'tag-recruit';
  if (t.includes('dịch vụ') || t.includes('service')) return 'tag-service';
  if (t.includes('sự kiện') || t.includes('event'))  return 'tag-event';
  return 'tag-default';
}

/**
 * Map từ query param ?filter= sang các từ khóa để tìm category tương ứng trong DB.
 * Hỗ trợ cả DB cũ (Bài viết blog, ID=30) và DB mới (Tin tức xe máy ID=35, Tin khuyến mãi ID=36).
 */
const FILTER_KEYWORD_MAP: Record<string, string[]> = {
  'su-kien':    ['sự kiện', 'su kien', 'event', 'tin tức', 'tin tuc', 'news', 'blog'],
  'khuyen-mai': ['khuyến', 'khuyen', 'promo', 'sale', 'giảm', 'ưu đãi'],
  'tuyen-dung': ['tuyển', 'tuyen', 'recruit', 'nhân sự', 'việc làm'],
};

function findCategoryByFilter(
  categories: Category[],
  filterKeyword: string,
): Category | null {
  if (!filterKeyword || !categories.length) return null;
  const matchWords = FILTER_KEYWORD_MAP[filterKeyword.toLowerCase()] ?? [];
  if (!matchWords.length) return null;
  return (
    categories.find((cat) => {
      const t = (cat.title ?? '').toLowerCase();
      return matchWords.some((w) => t.includes(w));
    }) ?? null
  );
}

const Articles = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initCategoryId: number | null = (location.state as any)?.categoryId ?? null;

  // Query param ?filter=khuyen-mai | ?filter=tin-tuc
  const searchParams = new URLSearchParams(location.search);
  const filterKeyword = searchParams.get('filter') ?? '';

  const [categories, setCategories] = React.useState<Category[]>([]);
  const [activeCategoryId, setActiveCategoryId] = React.useState<number | null>(initCategoryId);
  const [articleNewest, setArticleNewest] = React.useState<Article[]>([]);
  const [showNewest, setShowNewest] = React.useState(true);
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  // Tránh fetch 2 lần khi không có filterKeyword
  const didFetch = React.useRef(false);

  const fetchArticles = async (pageNo: number, categoryId: number | null) => {
    try {
      setIsLoading(true);
      const params = { pageNo: String(pageNo) };
      const res = categoryId
        ? await articleApi.getArticlesByCategory(categoryId, params)
        : await articleApi.allArticle(params);
      if (res.data.status) {
        setArticles(res.data.data.data);
        const totalPages = Math.ceil(res.data.data.total / res.data.data.perPage);
        setTotalPage(totalPages);
        setPage(res.data.data.currentPage);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Load categories trước.
   * - Nếu có ?filter=  → tìm category ID khớp → gọi API theo category đó.
   * - Nếu không có     → gọi API lấy tất cả (hoặc theo initCategoryId từ state).
   */
  React.useEffect(() => {
    categoryApi
      .getCategoryType(ARTICLE_TYPE)
      .then((res) => {
        if (res.data.status) {
          const cats = res.data.data as unknown as Category[];
          setCategories(cats);

          if (filterKeyword) {
            const matched = findCategoryByFilter(cats, filterKeyword);
            if (matched) {
              setActiveCategoryId(matched.id);
              fetchArticles(1, matched.id);
            } else {
              // Không tìm thấy category khớp → hiện tất cả
              fetchArticles(1, null);
            }
          } else if (!didFetch.current) {
            // Không có filter → fetch thường
            didFetch.current = true;
            fetchArticles(1, initCategoryId);
          }
        }
      })
      .catch(console.error);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKeyword]);

  React.useEffect(() => {
    articleApi
      .getArticleHome()
      .then((res) => {
        if (res.data.status) setArticleNewest(res.data.data);
      })
      .catch(console.error);
  }, []);

  const handleCategoryFilter = (categoryId: number | null) => {
    setActiveCategoryId(categoryId);
    fetchArticles(1, categoryId);
    // Xóa query param ?filter khi user tự chọn category qua tab
    if (filterKeyword) {
      navigate(location.pathname, { replace: true });
    }
  };

  const handlePageClick = (p: number) => {
    fetchArticles(p, activeCategoryId);
  };

  const pageTitle = React.useMemo(() => {
    if (filterKeyword === 'su-kien')    return 'Tin sự kiện';
    if (filterKeyword === 'khuyen-mai') return 'Tin khuyến mại';
    if (filterKeyword === 'tuyen-dung') return 'Tin tuyển dụng';
    return 'Tin tức';
  }, [filterKeyword]);

  return (
    <div className="layout-blogs">
      <Breadcrum title={pageTitle} />
      <div className="container">
        {isLoading && <SpinLoading />}
        <div className="row">
          <div className="col-lg-9 col-md-12 col-12 column-left mg-page">
            <div className="heading-page">
              <h1>{pageTitle}</h1>
            </div>

            {/* Category tab bar */}
            <div className="articles-tabs-sticky">
              <div className="articles-category-tabs">
                <button
                  className={`cat-tab${activeCategoryId === null ? ' active' : ''}`}
                  onClick={() => handleCategoryFilter(null)}
                >
                  Tất cả
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`cat-tab${activeCategoryId === cat.id ? ' active' : ''}`}
                    onClick={() => handleCategoryFilter(cat.id)}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="row blog-posts">
              {!!articles && articles.length > 0 &&
                articles.map((item, i) => (
                  <article className="article-loop col-lg-4 col-md-6 col-12" key={i}>
                    <div className="article-inner">
                      <div className="article-image">
                        <a
                          onClick={() => navigate(path.detailArticle, { state: item.id })}
                          className="blog-post-thumbnail cursor-pointer"
                          title={item.title}
                          rel="nofollow"
                        >
                          <img
                            src={resolveImageUrl(item.image)}
                            className="lazyloaded"
                            alt={item.title}
                            onError={(e) => {
                              const idx = (item.id ?? 0) % 3 + 1;
                              (e.target as HTMLImageElement).src = `${API_URL_IMAGE}slide_home_${idx}.jpg`;
                            }}
                          />
                        </a>
                      </div>
                      <div className="article-detail">
                        {item.categoryTitle && (
                          <span
                            className={`article-cat-tag ${getTagClass(item.categoryTitle)}`}
                          >
                            {item.categoryTitle}
                          </span>
                        )}
                        <div className="article-title">
                          <h3 className="post-title">
                            <a
                              onClick={() =>
                                navigate(path.detailArticle, { state: item.id })
                              }
                              title={item.title}
                              className="cursor-pointer"
                            >
                              {item.title}
                            </a>
                          </h3>
                        </div>
                        <p
                          className="entry-content"
                          dangerouslySetInnerHTML={{ __html: item.shortContent }}
                        />
                        <div className="article-post-meta">
                          <span className="author">bởi: {item.author}</span>
                          <span className="date">
                            <time>{formatDateString(item.modifiedDate)}</time>
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}

              {!isLoading && (!articles || articles.length === 0) && (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '48px 0',
                    color: '#888',
                    width: '100%',
                  }}
                >
                  <p style={{ fontSize: '16px' }}>
                    Chưa có bài viết nào trong mục này.
                  </p>
                </div>
              )}
            </div>

            <Pagination
              page={page}
              totalPage={totalPage}
              handlePageClick={handlePageClick}
            />
          </div>

          <div className="col-lg-3 col-md-12 col-12 column-right mg-page">
            <aside className="sidebar-blogs blogs-sticky">
              <div className={`group-sidebox ${showNewest ? 'is-open' : ''}`}>
                <div className="sidebox-title" onClick={() => setShowNewest(!showNewest)}>
                  <h3 className="htitle">Bài viết mới nhất</h3>
                </div>
                {showNewest && (
                  <div className="sidebox-content sidebox-content-togged">
                    <div className="list-blogs">
                      {!!articleNewest &&
                        articleNewest.length > 0 &&
                        articleNewest.map((item, i) => {
                          if (i > 5) return null;
                          return (
                            <div
                              className="item-article"
                              key={i}
                              onClick={() =>
                                navigate(path.detailArticle, { state: item.id })
                              }
                            >
                              <div className="item-article__image">
                                <a className="cursor-pointer">
                                  <img
                                    className="lazyloaded"
                                    src={resolveImageUrl(item.image)}
                                    alt={item.title}
                                    onError={(e) => {
                                      const idx = (item.id ?? 0) % 3 + 1;
                                      (e.target as HTMLImageElement).src = `${API_URL_IMAGE}slide_home_${idx}.jpg`;
                                    }}
                                  />
                                </a>
                              </div>
                              <div className="item-article__detail">
                                {item.categoryTitle && (
                                  <span
                                    className={`article-cat-tag ${getTagClass(
                                      item.categoryTitle,
                                    )}`}
                                  >
                                    {item.categoryTitle}
                                  </span>
                                )}
                                <h3 className="title">
                                  <a className="link cursor-pointer">{item.title}</a>
                                </h3>
                                <p className="meta-post">
                                  <span className="cate">Ngày đăng - </span>
                                  {item?.modifiedDate && (
                                    <span className="date">
                                      {formatDateNumber(item.modifiedDate)}
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
