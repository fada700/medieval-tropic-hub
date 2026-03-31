import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Plus, Trash2, Lock } from "lucide-react";

interface Update {
  id: string;
  title: string;
  date: string;
  content: string;
}

const STORAGE_KEY = "solvianmc_updates";
const ADMIN_PASS = "solvian2025";

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [updates, setUpdates] = useState<Update[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setUpdates(JSON.parse(stored));
  }, []);

  const save = (newUpdates: Update[]) => {
    setUpdates(newUpdates);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUpdates));
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
    save([newUpdate, ...updates]);
    setTitle("");
    setContent("");
  };

  const handleDelete = (id: string) => {
    save(updates.filter((u) => u.id !== id));
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
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && password === ADMIN_PASS) setAuthenticated(true);
                }}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border font-body focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Contraseña"
              />
              <button
                onClick={() => { if (password === ADMIN_PASS) setAuthenticated(true); }}
                className="w-full px-4 py-2 bg-primary text-primary-foreground font-heading font-bold rounded-lg"
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
          <h1 className="font-heading text-4xl font-bold text-gradient-gold text-center mb-12">
            Panel Administrativo
          </h1>

          {/* Add update form */}
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

          {/* Existing updates */}
          <div className="space-y-4">
            {updates.map((u) => (
              <div key={u.id} className="card-medieval p-6 flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="font-body text-sm text-muted-foreground mb-1">{u.date}</p>
                  <h3 className="font-heading font-bold">{u.title}</h3>
                  <p className="font-body text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{u.content}</p>
                </div>
                <button onClick={() => handleDelete(u.id)} className="text-destructive hover:opacity-70 transition-opacity mt-1">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
