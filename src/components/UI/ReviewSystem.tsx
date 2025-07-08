import React, { useEffect, useState } from "react";
import { Star, User, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Review } from "../../types";
import StarRating from "./StarRating";
import axios from "axios";

interface ReviewSystemProps {
  onAddReview: (review: Omit<Review, "id" | "date">) => void;
  projectId: string;
}

const ReviewSystem: React.FC<ReviewSystemProps> = ({
  onAddReview,
  projectId,
}) => {
  const [newReview, setNewReview] = useState({
    author: "",
    email: "",
    rating: 5,
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get<Review[]>(
          `https://websitemy-backend.onrender.com/review?projectId=${projectId}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [projectId]);


  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // await onAddReview(newReview);
      setNewReview({ author: "", email: "", rating: 5, comment: "" });

      axios
        .post("https://websitemy-backend.onrender.com/review", {
          name: newReview.author,
          email: newReview.email,
          rating: newReview.rating,
          comment: newReview.comment,
          projectId: projectId,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Review Summary */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-white">التقييمات</h3>
          <div className="flex items-center space-x-2">
            <StarRating rating={averageRating} />
            <span className="text-lg font-semibold text-white">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-gray-400">({reviews.length} تقييم)</span>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = reviews.filter((r) => r.rating === rating).length;
            const percentage =
              reviews.length > 0 ? (count / reviews.length) * 100 : 0;

            return (
              <div key={rating} className="flex items-center space-x-2">
                <span className="text-sm text-gray-400 w-8">{rating}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <div className="flex-1 bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-400 w-8">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Review Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700"
      >
        <h3 className="text-xl font-bold text-white mb-6">أضف تقييمك</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              الاسم *
            </label>
            <input
              type="text"
              value={newReview.author}
              onChange={(e) =>
                setNewReview({ ...newReview, author: e.target.value })
              }
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white"
              placeholder="اسمك الكامل"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              البريد الإلكتروني *
            </label>
            <input
              type="email"
              value={newReview.email}
              onChange={(e) =>
                setNewReview({ ...newReview, email: e.target.value })
              }
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            التقييم *
          </label>
          <StarRating
            rating={newReview.rating}
            interactive={true}
            onRatingChange={(rating) => setNewReview({ ...newReview, rating })}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            التعليق *
          </label>
          <textarea
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
            required
            rows={4}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white resize-none"
            placeholder="شاركنا تجربتك مع هذا المشروع..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] font-medium"
        >
          {isSubmitting ? "جاري الإرسال..." : "إرسال التقييم"}
        </button>
      </motion.form>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">التعليقات</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            لا توجد تقييمات حتى الآن. كن أول من يقيم هذا المشروع!
          </p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {review.name}
                      </h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(review.createdAt).toLocaleDateString("ar-SA")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {review.comment}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSystem;
