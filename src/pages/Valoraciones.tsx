import { useState } from "react";
import Layout from "@/components/Layout";
import { Star, Send } from "lucide-react";

interface Review {
  name: string;
  stars: number;
  comment: string;
}

const Valoraciones = () => {
  const [reviews, setReviews] = useState<Review[]>([
    { name: "Jugador1", stars: 5, comment: "¡El mejor servidor que he jugado!" },
    { name: "Crafter99", stars: 4, comment: "Muy buena comunidad y staff activo." },
  ]);
  const [name, setName] = useState("");
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    setReviews([{ name: name.trim(), stars, comment: comment.trim() }, ...reviews]);
    setName("");
    setComment("");
    setStars(5);
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-heading text-4xl font-bold text-gradient-gold text-center mb-12">
            Valoraciones
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="card-medieval p-8 mb-10 space-y-4">
            <h3 className="font-heading text-lg font-bold">Deja tu opinión</h3>
            <input
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border font-body focus:outline-none focus:ring-2 focus:ring-primary"
              maxLength={30}
            />
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} type="button" onClick={() => setStars(s)}>
                  <Star className={`h-6 w-6 ${s <= stars ? "text-primary fill-primary" : "text-muted-foreground"}`} />
                </button>
              ))}
            </div>
            <textarea
              placeholder="Tu comentario..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border font-body focus:outline-none focus:ring-2 focus:ring-primary resize-none h-24"
              maxLength={300}
            />
            <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-heading font-bold rounded-lg hover:opacity-90 transition-opacity">
              <Send className="h-4 w-4" /> Enviar
            </button>
          </form>

          {/* Reviews */}
          <div className="space-y-4">
            {reviews.map((r, i) => (
              <div key={i} className="card-medieval p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-heading font-bold">{r.name}</span>
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
