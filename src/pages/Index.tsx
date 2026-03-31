import { Link } from "react-router-dom";
import { ShoppingCart, MessageCircle, Youtube, Vote, Sword, Shield, Palmtree, HelpCircle, BookOpen, ChevronDown } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";
import GoldParticles from "@/components/GoldParticles";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/solvianmc.png";
import avatarSoyNulled from "@/assets/avatar-soynulled.png";
import avatarFelixDevYT from "@/assets/avatar-felixdevyt.png";
import avatarLuisDev from "@/assets/avatar-luisdev.png";

const teamMembers = [
  { name: "SoyNulled", avatar: avatarSoyNulled, role: "Fundador", isFounder: true },
  { name: "FelixDevYT", avatar: avatarFelixDevYT, role: "Fundador", isFounder: true },
  { name: "LuisDev", avatar: avatarLuisDev, role: "Fundador", isFounder: true },
];

const faqs = [
  { q: "¿Cómo entro al servidor?", a: "Abre Minecraft, ve a Multijugador y agrega la IP: play.solvianmc.net" },
  { q: "¿Qué versiones soporta?", a: "Actualmente soportamos las versiones más recientes de Minecraft Java Edition." },
  { q: "¿Es premium o no premium?", a: "El servidor es no premium, ¡todos son bienvenidos!" },
  { q: "¿Puedo usar mods?", a: "Solo están permitidos mods de rendimiento como Optifine o Sodium. No se permiten hacks." },
  { q: "¿Cómo reporto a un jugador?", a: "Puedes reportar jugadores a través de nuestro Discord o directamente con el staff en el servidor." },
];

const rules = [
  "No usar hacks, mods ilegales o exploits.",
  "Respetar a todos los jugadores y al staff.",
  "No hacer spam ni publicidad en el chat.",
  "No griefear construcciones de otros jugadores.",
  "Jugar limpio y con deportivismo.",
];

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="SolvianMC Medieval Tropical" className="absolute inset-0 w-full h-full object-cover" width={1920} height={800} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
        <GoldParticles />
        <div className="relative z-10 text-center space-y-6 px-4">
          <img src={logo} alt="SolvianMC" className="mx-auto h-32 w-32 object-contain animate-float drop-shadow-2xl" />
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-gradient-gold drop-shadow-lg">
            SolvianMC
          </h1>
          <p className="font-body text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
            Un servidor de Minecraft medieval-tropical. ¡Únete a la aventura!
          </p>
          <button
            onClick={() => navigator.clipboard.writeText("play.solvianmc.net")}
            className="inline-block px-8 py-3 bg-primary text-primary-foreground font-heading font-bold rounded-xl text-lg glow-gold hover:scale-105 transition-transform"
          >
            play.solvianmc.net
          </button>
        </div>
      </section>

      {/* Descripción */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-6">
          <h2 className="font-heading text-3xl font-bold text-gradient-gold">¿Qué es SolvianMC?</h2>
          <p className="font-body text-muted-foreground text-lg leading-relaxed">
            SolvianMC es un servidor de Minecraft con temática medieval-tropical donde puedes explorar junglas exóticas,
            construir imperios y vivir aventuras épicas con tus amigos. ¡Una experiencia única te espera!
          </p>
        </div>
      </section>

      {/* Páginas rápidas */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link to="/actualizaciones" className="card-medieval p-8 text-center hover:scale-105 transition-transform group">
              <Shield className="mx-auto h-10 w-10 text-primary mb-4 group-hover:animate-float" />
              <h3 className="font-heading font-bold text-lg">Ver Actualizaciones</h3>
              <p className="font-body text-sm text-muted-foreground mt-2">Entérate de las novedades</p>
            </Link>
            <Link to="/votar" className="card-medieval p-8 text-center hover:scale-105 transition-transform group">
              <Vote className="mx-auto h-10 w-10 text-primary mb-4 group-hover:animate-float" />
              <h3 className="font-heading font-bold text-lg">Votar</h3>
              <p className="font-body text-sm text-muted-foreground mt-2">Apoya al servidor y gana recompensas</p>
            </Link>
            <a href="https://tienda.solvianmc.net" target="_blank" rel="noopener noreferrer" className="card-medieval p-8 text-center hover:scale-105 transition-transform group">
              <ShoppingCart className="mx-auto h-10 w-10 text-primary mb-4 group-hover:animate-float" />
              <h3 className="font-heading font-bold text-lg">Tienda</h3>
              <p className="font-body text-sm text-muted-foreground mt-2">Consigue rangos y más</p>
            </a>
          </div>
        </div>
      </section>

      {/* Modos de juego */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-gradient-gold mb-12">Modos de Juego</h2>
          <div className="max-w-md mx-auto card-medieval p-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sword className="h-8 w-8 text-primary" />
              <Palmtree className="h-8 w-8 text-tropical" />
            </div>
            <h3 className="font-heading text-2xl font-bold mb-3">Survival Semi-Clásico</h3>
            <p className="font-body text-muted-foreground">
              Disfruta de la experiencia survival con mejoras únicas, economía, clanes y mucho más en un mundo medieval-tropical.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center justify-center gap-3 mb-12">
            <HelpCircle className="h-8 w-8 text-primary" />
            <h2 className="font-heading text-3xl font-bold text-gradient-gold">Preguntas Frecuentes</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="card-medieval overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-heading font-bold text-sm">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-primary transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="font-body text-muted-foreground text-sm">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reglas */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center justify-center gap-3 mb-12">
            <BookOpen className="h-8 w-8 text-primary" />
            <h2 className="font-heading text-3xl font-bold text-gradient-gold">Reglas del Servidor</h2>
          </div>
          <div className="card-medieval p-8">
            <ol className="space-y-4">
              {rules.map((rule, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground font-heading font-bold text-sm flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="font-body text-muted-foreground pt-0.5">{rule}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Equipo Administrativo */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-gradient-gold mb-12">Equipo Administrativo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.name} className="card-medieval p-6 flex flex-col items-center gap-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-lg border-2 border-primary object-cover"
                  loading="lazy"
                  style={{ imageRendering: "pixelated" }}
                />
                <h4 className="font-heading text-sm font-bold">{member.name}</h4>
                <span className="text-xs font-body font-semibold px-2 py-1 rounded-full bg-primary text-primary-foreground">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Redes */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-gradient-gold mb-12">Nuestras Redes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <a href="https://tienda.solvianmc.net" target="_blank" rel="noopener noreferrer" className="card-medieval p-6 flex flex-col items-center gap-3 hover:scale-105 transition-transform">
              <ShoppingCart className="h-8 w-8 text-primary" />
              <span className="font-heading text-sm font-bold">Tienda</span>
            </a>
            <a href="https://discord.gg/y4ajWpbGd5" target="_blank" rel="noopener noreferrer" className="card-medieval p-6 flex flex-col items-center gap-3 hover:scale-105 transition-transform">
              <MessageCircle className="h-8 w-8 text-secondary" />
              <span className="font-heading text-sm font-bold">Discord</span>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="card-medieval p-6 flex flex-col items-center gap-3 hover:scale-105 transition-transform">
              <Youtube className="h-8 w-8 text-destructive" />
              <span className="font-heading text-sm font-bold">YouTube</span>
            </a>
            <Link to="/votar" className="card-medieval p-6 flex flex-col items-center gap-3 hover:scale-105 transition-transform">
              <Vote className="h-8 w-8 text-accent" />
              <span className="font-heading text-sm font-bold">Votar</span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
