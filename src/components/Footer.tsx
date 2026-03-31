import logo from "@/assets/solvianmc.png";

const Footer = () => (
  <footer className="bg-card border-t border-border py-10">
    <div className="container mx-auto px-4 flex flex-col items-center gap-4">
      <img src={logo} alt="SolvianMC" className="h-16 w-16 object-contain" />
      <p className="font-heading text-sm text-muted-foreground text-center">
        © 2025 SolvianMC. Todos los derechos reservados.
      </p>
      <div className="flex gap-6">
        <a href="https://tienda.solvianmc.net" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm font-body">Tienda</a>
        <a href="/discord" className="text-muted-foreground hover:text-primary transition-colors text-sm font-body">Discord</a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm font-body">YouTube</a>
        <a href="/votar" className="text-muted-foreground hover:text-primary transition-colors text-sm font-body">Votar</a>
      </div>
    </div>
  </footer>
);

export default Footer;
