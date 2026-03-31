import Layout from "@/components/Layout";
import { MessageCircle } from "lucide-react";

const Discord = () => (
  <Layout>
    <section className="py-20">
      <div className="container mx-auto px-4 text-center max-w-xl">
        <MessageCircle className="mx-auto h-16 w-16 text-secondary mb-6" />
        <h1 className="font-heading text-4xl font-bold text-gradient-gold mb-6">Discord</h1>
        <p className="font-body text-muted-foreground text-lg mb-8">
          Únete a nuestra comunidad en Discord para estar al tanto de todo, hablar con el staff y conocer nuevos amigos.
        </p>
        <a
          href="https://discord.gg/y4ajWpbGd5"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-secondary text-secondary-foreground font-heading font-bold rounded-xl text-lg hover:opacity-90 transition-opacity"
        >
          Unirse al Discord
        </a>
      </div>
    </section>
  </Layout>
);

export default Discord;
