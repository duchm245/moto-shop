import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import articleApi from '~/apis/article.apis';
import categoryApi from '~/apis/category.apis';
import Breadcrum from '~/components/breadcrumb';
import Pagination from '~/components/paginationItems';
import SpinLoading from '~/components/spinloading';
import { formatDateNumber, formatDateString } from '~/constants/formatDate';
import path from '~/constants/path';
import { API_URL_IMAGE } from '~/constants/utils';
import { Article } from '~/types/article.type';
import { Category } from '~/types/category.type';
import './styles.css';

const ARTICLE_TYPE = 2;

function getTagClass(title: string): string {
  const t = (title || '').toLowerCase();
  if (t.includes('khuyến') || t.includes('promo'))  return 'tag-promo';
  if (t.includes('tuyển') || t.includes('recruit'))  return 'tag-recruit';
  if (t.includes('dịch vụ') || t.includes('service')) return 'tag-service';
  if (t.includes('sự kiện') || t.includes('event'))  return 'tag-event';
  return 'tag-default';
}

const Articles = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initCategoryId: number | null = (location.state as any)?.categoryId ?? null;
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [activeCategoryId, setActiveCategoryId] = React.useState<number | null>(initCategoryId);
  const [articleNewest, setArticleNewest] = React.useState<Article[]>([]);
  const [showNewest, setShowNewest] = React.useState(true);
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);

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

  React.useEffect(() => {
    fetchArticles(1, initCategoryId);
  }, []);

  React.useEffect(() => {
    categoryApi.getCategoryType(ARTICLE_TYPE).then((res) => {
      if (res.data.status) {
        setCategories(res.data.data as unknown as Category[]);
      }
    }).catch(console.error);
  }, []);

  React.useEffect(() => {
    articleApi.getArticleHome().then((res) => {
      if (res.data.status) setArticleNewest(res.data.data);
    }).catch(console.error);
  }, []);

  const handleCategoryFilter = (categoryId: number | null) => {
    setActiveCategoryId(categoryId);
    fetchArticles(1, categoryId);
  };

  const handlePageClick = (p: number) => {
    fetchArticles(p, activeCategoryId);
  };

  return (
    <div className="layout-blogs">
      <Breadcrum title={'Tin tức'} />
      <div className="container">
        {isLoading && <SpinLoading />}
        <div className="row">
          <div className="col-lg-9 col-md-12 col-12 column-left mg-page">
            <div className="heading-page">
              <h1>Tin tức</h1>
            </div>

            {/* Category tab bar – sticky khi cuộn */}
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
              {!!articles && !!articles.length && articles.map((item, i) => (
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
                          src={`${API_URL_IMAGE}${item.image}`}
                          className="lazyloaded"
                          alt={item.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
                          }}
                        />
                      </a>
                    </div>
                    <div className="article-detail">
                      {item.categoryTitle && (
                        <span className={`article-cat-tag ${getTagClass(item.categoryTitle)}`}>
                          {item.categoryTitle}
                        </span>
                      )}
                      <div className="article-title">
                        <h3 className="post-title">
                          <a
                            onClick={() => navigate(path.detailArticle, { state: item.id })}
                            title={item.title}
                            className="cursor-pointer"
                          >
                            {item.title}
                          </a>
                        </h3>
                      </div>
                      <p className="entry-content" dangerouslySetInnerHTML={{ __html: item.shortContent }} />
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
            </div>

            <Pagination page={page} totalPage={totalPage} handlePageClick={handlePageClick} />
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
                      {!!articleNewest && !!articleNewest.length && articleNewest.map((item, i) => {
                        if (i > 5) return null;
                        return (
                          <div
                            className="item-article"
                            key={i}
                            onClick={() => navigate(path.detailArticle, { state: item.id })}
                          >
                            <div className="item-article__image">
                              <a className="cursor-pointer">
                                <img
                                  className="lazyloaded"
                                  src={`${API_URL_IMAGE}${item.image}`}
                                  alt={item.title}
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/150x100?text=No+Image';
                                  }}
                                />
                              </a>
                            </div>
                            <div className="item-article__detail">
                              {item.categoryTitle && (
                                <span className={`article-cat-tag ${getTagClass(item.categoryTitle)}`}>
                                  {item.categoryTitle}
                                </span>
                              )}
                              <h3 className="title">
                                <a className="link cursor-pointer">{item.title}</a>
                              </h3>
                              <p className="meta-post">
                                <span className="cate">Ngày đăng - </span>
                                {item?.modifiedDate && (
                                  <span className="date">{formatDateNumber(item.modifiedDate)}</span>
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
