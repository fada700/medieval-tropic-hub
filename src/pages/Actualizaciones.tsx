import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Calendar, FileText } from "lucide-react";

interface Update {
  id: string;
  title: string;
  date: string;
  content: string;
}

const STORAGE_KEY = "solvianmc_updates";

const getUpdates = (): Update[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const Actualizaciones = () => {
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    setUpdates(getUpdates());
  }, []);

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-heading text-4xl font-bold text-gradient-gold text-center mb-12">
            Actualizaciones
          </h1>

          {updates.length === 0 ? (
            <div className="card-medieval p-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="font-body text-muted-foreground text-lg">
                No hay actualizaciones por el momento. ¡Vuelve pronto!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {updates.map((update) => (
                <article key={update.id} className="card-medieval p-8">
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" />
                    <span className="font-body text-sm">{update.date}</span>
                  </div>
                  <h2 className="font-heading text-xl font-bold mb-3">{update.title}</h2>
                  <p className="font-body text-muted-foreground whitespace-pre-wrap">{update.content}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Actualizaciones;
