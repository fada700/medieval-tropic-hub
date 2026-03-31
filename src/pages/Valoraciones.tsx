import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Star, Send, Clock, AlertCircle } from "lucide-react";

interface Review {
  id: string;
  name: string;
  stars: number;
  comment: string;
  date: string;
}

const REVIEWS_KEY = "solvianmc_reviews";
const COOLDOWN_KEY = "solvianmc_review_cooldown";
const COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes

const getReviews = (): Review[] => {
  const stored = localStorage.getItem(REVIEWS_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveReviews = (reviews: Review[]) => {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
};

const Valoraciones = () => {
  const [reviews, setReviews] = useState<Review[]>(getReviews());
  const [name, setName] = useState("");
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    const lastPost = localStorage.getItem(COOLDOWN_KEY);
    if (lastPost) {
      const remaining = COOLDOWN_MS - (Date.now() - parseInt(lastPost));
      if (remaining > 0) setCooldown(remaining);
    }
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => {
        const next = prev - 1000;
        return next <= 0 ? 0 : next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const formatCooldown = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const avgStars = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length).toFixed(1)
    : "0";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim() || cooldown > 0) return;
    const newReview: Review = {
      id: Date.now().toString(),
      name: name.trim(),
      stars,
      comment: comment.trim(),
      date: new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }),
    };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    saveReviews(updated);
    localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
    setCooldown(COOLDOWN_MS);
    setName("");
    setComment("");
    setStars(5);
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-heading text-4xl font-bold text-gradient-gold text-center mb-4">
            Valoraciones
          </h1>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <div className="text-center">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-primary fill-primary" />
                <span className="font-heading text-2xl font-bold">{avgStars}</span>
              </div>
              <p className="font-body text-xs text-muted-foreground">Promedio</p>
            </div>
            <div className="text-center">
              <span className="font-heading text-2xl font-bold">{reviews.length}</span>
              <p className="font-body text-xs text-muted-foreground">Reseñas</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="card-medieval p-8 mb-10 space-y-4">
            <h3 className="font-heading text-lg font-bold">Deja tu reseña</h3>

            {cooldown > 0 && (
              <div className="flex items-center gap-2 text-accent font-body text-sm bg-muted p-3 rounded-lg">
                <Clock className="h-4 w-4" />
                <span>Podrás enviar otra reseña en {formatCooldown(cooldown)}</span>
              </div>
            )}

            <input
              type="text"
              placeholder="Tu nombre de jugador"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border font-body focus:outline-none focus:ring-2 focus:ring-primary"
              maxLength={30}
              disabled={cooldown > 0}
            />

            <div>
              <p className="font-body text-sm text-muted-foreground mb-2">Puntuación</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => cooldown <= 0 && setStars(s)}
                    disabled={cooldown > 0}
                  >
                    <Star className={`h-7 w-7 transition-colors ${s <= stars ? "text-primary fill-primary" : "text-muted-foreground"}`} />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              placeholder="Escribe tu reseña..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border font-body focus:outline-none focus:ring-2 focus:ring-primary resize-none h-24"
              maxLength={500}
              disabled={cooldown > 0}
            />

            <button
              type="submit"
              disabled={cooldown > 0}
              className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-heading font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Send className="h-4 w-4" /> Enviar Reseña
            </button>
          </form>

          {/* Reviews list */}
          <div className="space-y-4">
            {reviews.length === 0 && (
              <div className="card-medieval p-8 text-center">
                <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                <p className="font-body text-muted-foreground">Sé el primero en dejar una reseña.</p>
              </div>
            )}
            {reviews.map((r) => (
              <div key={r.id} className="card-medieval p-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-heading font-bold">{r.name}</span>
                    <span className="font-body text-xs text-muted-foreground ml-2">{r.date}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`h-4 w-4 ${s <= r.stars ? "text-primary fill-primary" : "text-muted-foreground"}`} />
                    ))}
                  </div>
                </div>
                <p className="font-body text-muted-foreground">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Valoraciones;
