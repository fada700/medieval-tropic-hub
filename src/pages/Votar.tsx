import Layout from "@/components/Layout";
import { Vote } from "lucide-react";
import logo from "@/assets/solvianmc.png";

const Votar = () => (
  <Layout>
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="card-medieval p-10 text-center border-2 border-primary">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Vote className="h-6 w-6 text-primary" />
            <h2 className="font-heading text-xl font-bold text-primary uppercase tracking-wider">
              Servidores de Minecraft
            </h2>
          </div>

          <h1 className="font-heading text-2xl font-bold mb-6">
            ¡Apoya al servidor y serás recompensado!
          </h1>

          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <img src={logo} alt="SolvianMC" className="h-24 w-24 object-contain animate-float" />
            <p className="font-body text-muted-foreground text-left leading-relaxed">
              Al votar desde este enlace, recibirás recompensa en todas esas modalidades; las recompensas pueden variar, dependiendo de la modalidad. De igual manera, ten en cuenta que no necesitas estar en línea para recibir la recompensa. ¡Puedes votar ahora y al ingresar a la modalidad, recibirás las recompensas que te corresponden! Los votos caducan en 15 días; es decir, si votas y pasas 15 días sin entrar, los votos se perderán.
            </p>
          </div>

          <a
            href="https://example.votar/1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-primary text-primary-foreground font-heading font-bold text-xl rounded-xl glow-gold hover:scale-105 transition-transform"
          >
            🗳️ ¡Votar Ahora!
          </a>
        </div>
      </div>
    </section>
  </Layout>
);

export default Votar;
