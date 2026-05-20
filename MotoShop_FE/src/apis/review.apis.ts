import httpRequest from "~/constants/httpRequest";

const reviewApi = {
  getReviews: (productId: number | string) =>
    httpRequest.get(`/api/review/${productId}`),
  addReview: (data: { userId: number; productId: number; rating: number; content: string }) =>
    httpRequest.post(`/api/review`, data),
};

export default reviewApi;
