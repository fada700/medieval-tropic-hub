import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Plus, Trash2, Lock, AlertCircle, Star, MessageSquare } from "lucide-react";

interface Update {
  id: string;
  title: string;
  date: string;
  content: string;
}

interface Review {
  id: string;
  name: string;
  stars: number;
  comment: string;
  date: string;
}

const STORAGE_KEY = "solvianmc_updates";
const REVIEWS_KEY = "solvianmc_reviews";
const ADMIN_PASS = "solvian2025";

const Admin = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [activeTab, setActiveTab] = useState<"updates" | "reviews">("updates");

  useEffect(() => {
    const storedU = localStorage.getItem(STORAGE_KEY);
    if (storedU) setUpdates(JSON.parse(storedU));
    const storedR = localStorage.getItem(REVIEWS_KEY);
    if (storedR) setReviews(JSON.parse(storedR));
  }, []);

  const saveUpdates = (data: Update[]) => {
    setUpdates(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const saveReviews = (data: Review[]) => {
    setReviews(data);
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(data));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    const newUpdate: Update = {
      id: Date.now().toString(),
      title: title.trim(),
      date: new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }),
      content: content.trim(),
    };
    saveUpdates([newUpdate, ...updates]);
    setTitle("");
    setContent("");
  };

  const handleDeleteUpdate = (id: string) => saveUpdates(updates.filter((u) => u.id !== id));
  const handleDeleteReview = (id: string) => saveReviews(reviews.filter((r) => r.id !== id));

  const tryLogin = () => {
    if (password === ADMIN_PASS) {
      setAuthenticated(true);
    } else {
      setError(true);
      setTimeout(() => navigate("/"), 2000);
    }
  };

  if (!authenticated) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-sm">
            <div className="card-medieval p-8 text-center space-y-4">
              <Lock className="mx-auto h-10 w-10 text-primary" />
              <h1 className="font-heading text-2xl font-bold">Panel Admin</h1>
              <p className="font-body text-sm text-muted-foreground">Ingresa la contraseña para acceder</p>
              {error && (
                <div className="flex items-center gap-2 justify-center text-destructive font-body text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>Contraseña incorrecta. Redirigiendo...</span>
                </div>
              )}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") tryLogin(); }}
                className={`w-full px-4 py-2 rounded-lg bg-background border font-body focus:outline-none focus:ring-2 ${error ? "border-destructive focus:ring-destructive" : "border-border focus:ring-primary"}`}
                placeholder="Contraseña"
                disabled={error}
              />
              <button
                onClick={tryLogin}
                disabled={error}
                className="w-full px-4 py-2 bg-primary text-primary-foreground font-heading font-bold rounded-lg disabled:opacity-50"
              >
                Entrar
              </button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-heading text-4xl font-bold text-gradient-gold text-center mb-8">
            Panel Administrativo
          </h1>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 justify-center">
            <button
              onClick={() => setActiveTab("updates")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg font-heading font-bold text-sm transition-colors ${
                activeTab === "updates" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              <Plus className="h-4 w-4" /> Actualizaciones ({updates.length})
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg font-heading font-bold text-sm transition-colors ${
                activeTab === "reviews" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              <MessageSquare className="h-4 w-4" /> Reseñas ({reviews.length})
            </button>
          </div>

          {activeTab === "updates" && (
            <>
              <form onSubmit={handleAdd} className="card-medieval p-8 mb-10 space-y-4">
                <h3 className="font-heading text-lg font-bold flex items-center gap-2">
                  <Plus className="h-5 w-5" /> Nueva Actualización
                </h3>
                <input
                  type="text"
                  placeholder="Título de la actualización"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border font-body focus:outline-none focus:ring-2 focus:ring-primary"
                  maxLength={100}
                />
                <textarea
                  placeholder="Contenido de la actualización..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border font-body focus:outline-none focus:ring-2 focus:ring-primary resize-none h-32"
                  maxLength={2000}
                />
                <button type="submit" className="px-6 py-2 bg-primary text-primary-foreground font-heading font-bold rounded-lg hover:opacity-90 transition-opacity">
                  Publicar
                </button>
              </form>

              <div className="space-y-4">
                {updates.map((u) => (
                  <div key={u.id} className="card-medieval p-6 flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="font-body text-sm text-muted-foreground mb-1">{u.date}</p>
                      <h3 className="font-heading font-bold">{u.title}</h3>
                      <p className="font-body text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{u.content}</p>
                    </div>
                    <button onClick={() => handleDeleteUpdate(u.id)} className="text-destructive hover:opacity-70 transition-opacity mt-1">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                {updates.length === 0 && (
                  <p className="text-center font-body text-muted-foreground">No hay actualizaciones.</p>
                )}
              </div>
            </>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              {reviews.map((r) => (
                <div key={r.id} className="card-medieval p-6 flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-heading font-bold text-sm">{r.name}</span>
                      <span className="font-body text-xs text-muted-foreground">{r.date}</span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`h-4 w-4 ${s <= r.stars ? "text-primary fill-primary" : "text-muted-foreground"}`} />
                      ))}
                    </div>
                    <p className="font-body text-sm text-muted-foreground">{r.comment}</p>
                  </div>
                  <button onClick={() => handleDeleteReview(r.id)} className="text-destructive hover:opacity-70 transition-opacity mt-1">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
              {reviews.length === 0 && (
                <p className="text-center font-body text-muted-foreground">No hay reseñas.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
