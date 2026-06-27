import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  CalendarClock,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Droplets,
  ExternalLink,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Star,
  Store,
  Wrench,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import atendimentoAntigaWebp from "@/assets/atendimento-antiga.webp.asset.json";
import estoqueAntigaWebp from "@/assets/estoque-antiga.webp.asset.json";
import fachadaAbertaAntigaWebp from "@/assets/fachada-aberta-antiga.webp.asset.json";
import fotoInternaWebp from "@/assets/foto-interna.webp.asset.json";
import heroFachadaWebp from "@/assets/hero-fachada.webp.asset.json";
import logoPecaqui from "@/assets/logo-pecaqui.png.asset.json";
import trocaDeOleoWebp from "@/assets/troca-de-oleo.webp.asset.json";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "+5517992822597";
const WHATSAPP_BASE_MESSAGE =
  "Olá! Gostaria de solicitar um orçamento de peças para o meu veículo.";
const GOOGLE_MAPS_DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=Av.+Potirendaba,+2110+-+Jardim+Santa+Luzia,+S%C3%A3o+Jos%C3%A9+do+Rio+Preto+-+SP,+15080-000";
const GOOGLE_REVIEWS = "https://g.page/r/CXUhLbpwFHRsEBM/review";

type QuoteFormState = {
  brand: string;
  model: string;
  year: string;
  part: string;
};

const trustItems = [
  { icon: Star, label: "★★★★★ Atendimento especializado" },
  { icon: Award, label: "38 anos de tradição" },
  { icon: Store, label: "Loja física" },
  { icon: Droplets, label: "Troca de óleo" },
  { icon: MessageCircle, label: "WhatsApp rápido" },
  { icon: MapPin, label: "São José do Rio Preto" },
] as const;

const diferencials = [
  "23 mil itens em estoque",
  "Atendimento especializado",
  "Troca de óleo",
  "Orçamento rápido pelo WhatsApp",
  "38 anos de tradição",
  "Loja física",
  "Produtos das melhores marcas",
  "Agilidade para encontrar a peça certa",
] as const;

const services = [
  "Autopeças",
  "Acessórios",
  "Troca de óleo",
  "Lubrificantes",
  "Filtros",
  "Baterias",
  "Palhetas",
  "Lâmpadas",
  "Pastilhas",
  "Discos",
  "Suspensão",
  "Freios",
  "Arrefecimento",
] as const;

const brands = [
  "SKF",
  "SABÓ",
  "NGK",
  "COBREQ",
  "FRAM",
  "LUK",
  "INA",
  "FANIA",
  "CONTROIL",
  "NAKATA",
  "URBA",
  "SPICER",
  "TRW",
  "VARGA",
  "DRIVEWAY",
  "MAGNETI MARELLI",
  "MONROE",
  "AXIOS",
  "MTE",
  "HIPPER FREIOS",
  "CONTITECH",
  "GONEL",
  "TEXACO",
  "BARDAHL",
  "CASTROL",
  "IPIRANGA",
  "WEGA",
  "METAL LEVE",
  "PETROBRAS LUBRIFICANTES",
  "SYL PASTILHAS",
  "ECO PADS",
  "COFAP",
] as const;

const timeline = [
  { year: "1988", title: "Fundação", description: "Início da trajetória da PeçAqui atendendo motoristas e oficinas de Rio Preto." },
  { year: "2000", title: "Ampliação", description: "Expansão da operação e aumento da variedade de autopeças e acessórios." },
  { year: "2010", title: "Modernização", description: "Evolução do atendimento, da estrutura e do mix de marcas automotivas." },
  { year: "2026", title: "38 anos", description: "Tradição, confiança e presença consolidada em São José do Rio Preto." },
] as const;

const testimonials = [
  {
    name: "Motoristas e oficinas da região",
    text: "Quem procura peça com atendimento de verdade encontra uma equipe pronta para orientar e agilizar o orçamento.",
  },
  {
    name: "Clientes de troca de óleo",
    text: "A estrutura une lubrificantes de qualidade, processo rápido e confiança para voltar sempre.",
  },
  {
    name: "Compradores recorrentes",
    text: "A tradição da loja passa segurança: variedade, marcas reconhecidas e uma equipe que conhece o mercado local.",
  },
] as const;

const galleryImages = [
  { src: heroFachadaWebp.url, alt: "Fachada principal da PeçAqui Auto Peças em São José do Rio Preto", category: "Fachada" },
  { src: fotoInternaWebp.url, alt: "Ambiente interno da loja com lubrificantes, atendimento e peças automotivas", category: "Loja" },
  { src: trocaDeOleoWebp.url, alt: "Serviço real de troca de óleo na PeçAqui Auto Peças", category: "Troca de óleo" },
  { src: atendimentoAntigaWebp.url, alt: "Foto histórica do atendimento da PeçAqui Auto Peças", category: "Atendimento" },
  { src: estoqueAntigaWebp.url, alt: "Foto histórica do estoque de autopeças da PeçAqui", category: "Estoque" },
  { src: fachadaAbertaAntigaWebp.url, alt: "Foto histórica da fachada da PeçAqui Auto Peças", category: "Fachada" },
] as const;

const categoryFilters = ["Todos", "Fachada", "Atendimento", "Estoque", "Troca de óleo", "Loja"] as const;

const businessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "AutoPartsStore", "AutomotiveBusiness"],
      "@id": "/#business",
      name: "PeçAqui Auto Peças",
      image: heroFachadaWebp.url,
      url: "/",
      telephone: "+55 17 3227-8323",
      priceRange: "$$",
      description:
        "Autopeças, acessórios, lubrificantes e troca de óleo com atendimento especializado em São José do Rio Preto.",
      sameAs: [
        "https://www.instagram.com/auto.pecas.pecaqui/",
        "https://www.facebook.com/autopecas.pecaqui",
        GOOGLE_REVIEWS,
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Potirendaba, 2110 - Jardim Santa Luzia",
        addressLocality: "São José do Rio Preto",
        addressRegion: "SP",
        postalCode: "15080-000",
        addressCountry: "BR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -20.8239056,
        longitude: -49.3743133,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "07:20",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "07:00",
          closes: "12:30",
        },
      ],
      areaServed: "São José do Rio Preto e região",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "/",
        },
      ],
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PeçAqui Auto Peças | 38 anos de tradição em São José do Rio Preto" },
      {
        name: "description",
        content:
          "PeçAqui Auto Peças em São José do Rio Preto. Há 38 anos oferecendo autopeças, acessórios, lubrificantes e troca de óleo com atendimento especializado e as melhores marcas do mercado.",
      },
      {
        property: "og:title",
        content: "PeçAqui Auto Peças | 38 anos de tradição em São José do Rio Preto",
      },
      {
        property: "og:description",
        content:
          "Há 38 anos oferecendo autopeças, acessórios, lubrificantes e troca de óleo com atendimento especializado em São José do Rio Preto.",
      },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroFachadaWebp.url },
      { name: "twitter:image", content: heroFachadaWebp.url },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: heroFachadaWebp.url, fetchPriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(businessSchema),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const reduceMotion = useReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerSolid, setHeaderSolid] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<(typeof categoryFilters)[number]>("Todos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [formState, setFormState] = useState<QuoteFormState>({ brand: "", model: "", year: "", part: "" });

  useEffect(() => {
    const onScroll = () => setHeaderSolid(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredGallery = useMemo(() => {
    if (selectedCategory === "Todos") return galleryImages;
    return galleryImages.filter((image) => image.category === selectedCategory);
  }, [selectedCategory]);

  const quoteHref = buildQuoteLink(formState);
  const floatingWhatsAppHref = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(WHATSAPP_BASE_MESSAGE)}`;

  const fadeUp = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.3, ease: "easeOut" as const },
  };

  return (
    <div className="bg-background text-foreground">
      <SiteHeader mobileMenuOpen={mobileMenuOpen} onToggleMenu={() => setMobileMenuOpen((open) => !open)} solid={headerSolid} />

      <main>
        <section id="home" className="relative isolate overflow-hidden bg-brand-graphite text-white">
          <img
            src={heroFachadaWebp.url}
            alt="Fachada da PeçAqui Auto Peças"
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-graphite/75 to-transparent" />

          <div className="section-shell relative pt-28 pb-14 md:pt-36 md:pb-24">
            <div className="content-shell grid items-end gap-10 lg:grid-cols-[minmax(0,1.2fr)_24rem] lg:gap-12">
              <motion.div {...fadeUp} className="max-w-3xl space-y-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white/90 backdrop-blur-sm">
                  <ShieldCheck className="size-4 shrink-0" />
                  38 anos de tradição automotiva em Rio Preto
                </div>

                <div className="space-y-4">
                  <h1 className="max-w-4xl text-balance text-4xl font-extrabold leading-tight md:text-6xl md:leading-[1.02]">
                    A peça certa para o seu carro.
                  </h1>
                  <p className="max-w-3xl text-balance text-lg leading-8 text-white/88 md:text-xl">
                    Há 38 anos conquistando a confiança dos motoristas de São José do Rio Preto.
                  </p>
                  <p className="max-w-2xl text-base leading-7 text-white/78 md:text-lg">
                    Peças automotivas, acessórios e troca de óleo com atendimento especializado, rapidez e uma das lojas mais tradicionais da cidade.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="hero" size="hero">
                    <a href={floatingWhatsAppHref} target="_blank" rel="noreferrer">
                      Solicitar orçamento
                      <MessageCircle className="size-4" />
                    </a>
                  </Button>
                  <Button asChild variant="navy" size="hero">
                    <a href={GOOGLE_MAPS_DIRECTIONS} target="_blank" rel="noreferrer">
                      Como chegar
                      <MapPin className="size-4" />
                    </a>
                  </Button>
                </div>
              </motion.div>

              <motion.aside
                {...fadeUp}
                transition={{ duration: 0.3, delay: reduceMotion ? 0 : 0.08, ease: "easeOut" }}
                className="metallic-badge rounded-2xl p-6 text-metal-foreground"
              >
                <div className="mb-6 inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/75">
                  Selo premium
                </div>
                <div className="space-y-5">
                  <div className="space-y-1">
                    <div className="text-6xl font-extrabold leading-none">38</div>
                    <div className="text-sm font-semibold uppercase tracking-[0.14em] text-white/72">Anos</div>
                    <div className="text-lg font-semibold uppercase tracking-[0.16em] text-white">de confiança</div>
                  </div>

                  <ul className="space-y-3 text-sm leading-6 text-white/88">
                    {[
                      "38 anos de mercado",
                      "Grande variedade de peças",
                      "Atendimento especializado",
                      "Troca de óleo",
                      "Loja física em São José do Rio Preto",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="mt-1 size-4 shrink-0 text-white" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-background">
          <div className="section-shell py-5">
            <div className="content-shell grid gap-3 md:grid-cols-3 xl:grid-cols-6">
              {trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-md border border-border/70 bg-background px-4 py-3 text-sm font-medium text-muted-foreground">
                    <Icon className="size-4 shrink-0 text-accent" />
                    <span className="min-w-0 text-foreground/85">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <motion.section id="orcamento" {...fadeUp} className="section-shell py-18 md:py-24">
          <div className="content-shell grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
            <div className="space-y-5">
              <span className="inline-flex rounded-full bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                Orçamento rápido
              </span>
              <div className="space-y-4">
                <h2 className="text-balance text-3xl font-extrabold md:text-5xl">Encontre sua peça em poucos minutos</h2>
                <p className="max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
                  Informe os dados do veículo e a peça desejada. Sua mensagem já sai pronta no WhatsApp para agilizar o atendimento da equipe.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-secondary/45 p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <QuickMetric value="23 mil+" label="itens em estoque" />
                  <QuickMetric value="07:20" label="início do atendimento em dias úteis" />
                  <QuickMetric value="38 anos" label="de tradição local" />
                  <QuickMetric value="WhatsApp" label="orçamento direto e rápido" />
                </div>
              </div>
            </div>

            <form
              className="premium-card rounded-2xl p-6 md:p-8"
              onSubmit={(event) => {
                event.preventDefault();
                window.open(quoteHref, "_blank", "noopener,noreferrer");
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Marca do veículo">
                  <input
                    value={formState.brand}
                    onChange={(event) => setFormState((state) => ({ ...state, brand: event.target.value }))}
                    placeholder="Ex.: Volkswagen"
                    className="h-12 w-full rounded-md border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring"
                  />
                </FormField>
                <FormField label="Modelo">
                  <input
                    value={formState.model}
                    onChange={(event) => setFormState((state) => ({ ...state, model: event.target.value }))}
                    placeholder="Ex.: Gol 1.6"
                    className="h-12 w-full rounded-md border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring"
                  />
                </FormField>
                <FormField label="Ano">
                  <input
                    value={formState.year}
                    onChange={(event) => setFormState((state) => ({ ...state, year: event.target.value }))}
                    placeholder="Ex.: 2018"
                    className="h-12 w-full rounded-md border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring"
                  />
                </FormField>
                <FormField label="Peça desejada">
                  <input
                    value={formState.part}
                    onChange={(event) => setFormState((state) => ({ ...state, part: event.target.value }))}
                    placeholder="Ex.: pastilha de freio dianteira"
                    className="h-12 w-full rounded-md border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring"
                  />
                </FormField>
              </div>

              <Button type="submit" variant="hero" size="hero" className="mt-6 w-full">
                Solicitar orçamento
                <ArrowRight className="size-4" />
              </Button>
            </form>
          </div>
        </motion.section>

        <motion.section id="empresa" {...fadeUp} className="section-shell bg-surface-alt py-18 md:py-24">
          <div className="content-shell space-y-10">
            <SectionHeading
              eyebrow="Diferenciais"
              title="Por que escolher a PeçAqui?"
              description="Uma operação desenhada para transmitir confiança, ganhar tempo no atendimento e resolver com precisão a necessidade de cada motorista ou oficina."
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {diferencials.map((item, index) => (
                <motion.article
                  key={item}
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="premium-card rounded-xl p-5"
                >
                  <div className="mb-5 flex size-11 items-center justify-center rounded-md bg-primary/8 text-primary">
                    {index % 4 === 0 ? <Search className="size-5" /> : index % 4 === 1 ? <ShieldCheck className="size-5" /> : index % 4 === 2 ? <Droplets className="size-5" /> : <Store className="size-5" />}
                  </div>
                  <h3 className="text-lg font-bold leading-7">{item}</h3>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="troca-de-oleo" {...fadeUp} className="section-shell py-18 md:py-24">
          <div className="content-shell grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
            <div className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-soft)]">
              <img src={trocaDeOleoWebp.url} alt="Serviço de troca de óleo na PeçAqui" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="space-y-5">
              <span className="inline-flex rounded-full bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                Troca de óleo
              </span>
              <h2 className="text-balance text-3xl font-extrabold md:text-5xl">Seu motor merece o melhor cuidado.</h2>
              <p className="text-base leading-8 text-muted-foreground md:text-lg">
                Atendimento especializado, lubrificantes reconhecidos no mercado e execução com atenção aos detalhes para preservar o desempenho do veículo.
              </p>
              <Button asChild variant="hero" size="hero">
                <a href={floatingWhatsAppHref} target="_blank" rel="noreferrer">
                  Agendar troca de óleo
                  <CalendarClock className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </motion.section>

        <motion.section id="servicos" {...fadeUp} className="section-shell bg-brand-graphite py-18 text-white md:py-24">
          <div className="content-shell grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
            <div className="space-y-5">
              <span className="inline-flex rounded-full border border-white/14 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-white/75">
                Serviços e linha automotiva
              </span>
              <h2 className="text-balance text-3xl font-extrabold md:text-5xl">Peças, acessórios e soluções para manter seu carro sempre em movimento.</h2>
              <p className="text-base leading-8 text-white/75 md:text-lg">
                A PeçAqui atende desde a reposição do dia a dia até demandas mais específicas, unindo tradição, agilidade e marcas reconhecidas para quem precisa comprar com segurança.
              </p>
              <Button asChild variant="hero" size="hero">
                <a href={floatingWhatsAppHref} target="_blank" rel="noreferrer">
                  Solicitar orçamento
                  <MessageCircle className="size-4" />
                </a>
              </Button>
            </div>

            <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/6 p-6 backdrop-blur-sm sm:grid-cols-2">
              {services.map((service) => (
                <div key={service} className="flex items-center gap-3 rounded-md border border-white/8 bg-white/5 px-4 py-3 text-sm font-medium text-white/88">
                  <Wrench className="size-4 shrink-0 text-accent" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="marcas" {...fadeUp} className="section-shell py-18 md:py-24">
          <div className="content-shell rounded-[1.25rem] border border-border bg-background p-6 shadow-[var(--shadow-soft)] md:p-10">
            <SectionHeading
              eyebrow="Marcas trabalhadas"
              title="Trabalhamos com as principais marcas do mercado"
              description="Um portfólio amplo para atender diferentes necessidades automotivas com confiança, procedência e variedade real no ponto de venda."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {brands.map((brand) => (
                <div
                  key={brand}
                  className="rounded-md border border-border bg-secondary/35 px-4 py-4 text-center text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground grayscale transition duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-background hover:text-foreground hover:grayscale-0"
                >
                  {brand}
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">E a loja trabalha com diversas outras marcas para ampliar ainda mais as possibilidades de atendimento.</p>
          </div>
        </motion.section>

        <motion.section {...fadeUp} className="section-shell bg-brand-graphite py-18 text-white md:py-24">
          <div className="content-shell grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
            <div className="space-y-5">
              <span className="inline-flex rounded-full border border-white/14 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-white/75">
                Nossa história
              </span>
              <h2 className="text-balance text-3xl font-extrabold md:text-5xl">38 anos fazendo parte da história de São José do Rio Preto.</h2>
              <p className="max-w-2xl text-base leading-8 text-white/74 md:text-lg">
                Ao longo das décadas, a PeçAqui construiu uma reputação baseada em atendimento próximo, conhecimento técnico e presença real no dia a dia dos motoristas da cidade.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                {timeline.map((item) => (
                  <div key={item.year} className="rounded-xl border border-white/10 bg-white/5 p-5">
                    <div className="text-sm font-semibold uppercase tracking-[0.1em] text-white/60">{item.year}</div>
                    <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/72">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 md:pt-10">
              <PolaroidCard src={fachadaAbertaAntigaWebp.url} alt="Foto antiga da fachada da PeçAqui" caption="Fachada histórica" rotate="-rotate-2" />
              <PolaroidCard src={atendimentoAntigaWebp.url} alt="Foto antiga de atendimento da PeçAqui" caption="Atendimento próximo" rotate="rotate-2" />
              <PolaroidCard src={estoqueAntigaWebp.url} alt="Foto antiga do estoque da PeçAqui" caption="Estoque robusto" rotate="rotate-1" />
            </div>
          </div>
        </motion.section>

        <motion.section id="loja" {...fadeUp} className="section-shell py-18 md:py-24">
          <div className="content-shell space-y-10">
            <SectionHeading
              eyebrow="Nossa loja"
              title="Conheça a PeçAqui"
              description="Fotos reais para reforçar a estrutura, o ambiente e a tradição da loja física em São José do Rio Preto."
            />

            <div className="flex flex-wrap gap-3">
              {categoryFilters.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${selectedCategory === category ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground"}`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="columns-1 gap-5 md:columns-2 xl:columns-3">
              {filteredGallery.map((image) => {
                const index = filteredGallery.findIndex((entry) => entry.src === image.src);
                return (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className="group relative mb-5 block w-full overflow-hidden rounded-xl border border-border bg-background text-left shadow-[var(--shadow-soft)]"
                  >
                    <img src={image.src} alt={image.alt} loading="lazy" className="h-auto w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-graphite/88 to-transparent px-4 py-4 text-white">
                      <div className="text-xs font-semibold uppercase tracking-[0.08em] text-white/70">{image.category}</div>
                      <div className="mt-1 text-sm font-medium">Abrir imagem</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.section>

        <motion.section {...fadeUp} className="section-shell bg-surface-alt py-18 md:py-24">
          <div className="content-shell space-y-10">
            <SectionHeading
              eyebrow="Depoimentos"
              title="Quem compra, recomenda."
              description="Bloco pronto para futura integração com avaliações do Google, já estruturado para reforçar confiança e prova social local."
            />
            <div className="grid gap-4 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article key={testimonial.name} className="premium-card rounded-xl p-6">
                  <div className="mb-4 flex items-center gap-1 text-accent">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="size-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-base leading-8 text-muted-foreground">“{testimonial.text}”</p>
                  <div className="mt-5 text-sm font-semibold text-foreground">{testimonial.name}</div>
                </article>
              ))}
            </div>
            <Button asChild variant="navy" size="hero">
              <a href={GOOGLE_REVIEWS} target="_blank" rel="noreferrer">
                Ver avaliações no Google
                <ExternalLink className="size-4" />
              </a>
            </Button>
          </div>
        </motion.section>

        <motion.section id="contato" {...fadeUp} className="section-shell py-18 md:py-24">
          <div className="content-shell grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_24rem] lg:items-stretch">
            <div className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-soft)]">
              <iframe
                title="Mapa da PeçAqui Auto Peças"
                src="https://www.google.com/maps?q=Av.%20Potirendaba,%202110%20-%20Jardim%20Santa%20Luzia,%20S%C3%A3o%20Jos%C3%A9%20do%20Rio%20Preto%20-%20SP&z=16&output=embed"
                className="h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <aside className="premium-card flex flex-col rounded-2xl p-6 md:p-8">
              <div className="space-y-5">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">Localização</div>
                  <h2 className="mt-2 text-2xl font-extrabold">Visite a PeçAqui</h2>
                </div>

                <ContactRow icon={MapPin} label="Endereço" value="Av. Potirendaba, 2110 - Jardim Santa Luzia, São José do Rio Preto - SP, 15080-000" />
                <ContactRow icon={Phone} label="Telefone" value="(17) 3227-8323" />
                <ContactRow icon={MessageCircle} label="WhatsApp" value="(17) 99282-2597" />
                <ContactRow icon={Clock3} label="Horário" value="Segunda a sexta: 07:20 às 18:00 • Sábado: 07:00 às 12:30 • Domingo: fechado" />
              </div>

              <div className="mt-8 grid gap-3">
                <Button asChild variant="navy" size="hero">
                  <a href={GOOGLE_MAPS_DIRECTIONS} target="_blank" rel="noreferrer">
                    Como chegar
                    <MapPin className="size-4" />
                  </a>
                </Button>
                <Button asChild variant="hero" size="hero">
                  <a href={floatingWhatsAppHref} target="_blank" rel="noreferrer">
                    Chamar no WhatsApp
                    <MessageCircle className="size-4" />
                  </a>
                </Button>
              </div>
            </aside>
          </div>
        </motion.section>

        <motion.section {...fadeUp} className="section-shell bg-primary py-18 text-primary-foreground md:py-24">
          <div className="content-shell flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <div className="text-xs font-semibold uppercase tracking-[0.1em] text-primary-foreground/70">Atendimento especializado</div>
              <h2 className="text-balance text-3xl font-extrabold md:text-5xl">Há 38 anos ajudando motoristas a manterem seus carros em movimento.</h2>
              <p className="text-base leading-8 text-primary-foreground/78 md:text-lg">
                Fale com a equipe, solicite seu orçamento e visite a loja física para comprar com confiança e agilidade.
              </p>
            </div>
            <Button asChild variant="hero" size="hero" className="shrink-0">
              <a href={floatingWhatsAppHref} target="_blank" rel="noreferrer">
                Solicitar orçamento
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </motion.section>
      </main>

      <footer className="section-shell bg-brand-graphite py-12 text-white">
        <div className="content-shell space-y-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.8fr_0.8fr_0.9fr]">
            <div className="space-y-4">
              <img src={logoPecaqui.url} alt="Logo da PeçAqui Auto Peças" className="h-auto w-52" loading="lazy" />
              <p className="max-w-sm text-sm leading-7 text-white/68">
                Tradição, variedade e atendimento especializado para autopeças, acessórios, lubrificantes e troca de óleo em São José do Rio Preto.
              </p>
            </div>

            <FooterColumn
              title="Menu"
              items={[
                { label: "Home", href: "#home" },
                { label: "Empresa", href: "#empresa" },
                { label: "Serviços", href: "#servicos" },
                { label: "Troca de Óleo", href: "#troca-de-oleo" },
                { label: "Contato", href: "#contato" },
              ]}
            />

            <FooterColumn
              title="Contato"
              items={[
                { label: "Av. Potirendaba, 2110", href: GOOGLE_MAPS_DIRECTIONS },
                { label: "(17) 3227-8323", href: "tel:+551732278323" },
                { label: "WhatsApp", href: floatingWhatsAppHref },
                { label: "Instagram", href: "https://www.instagram.com/auto.pecas.pecaqui/" },
                { label: "Facebook", href: "https://www.facebook.com/autopecas.pecaqui" },
              ]}
            />

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-white/52">Horário</h3>
              <div className="mt-4 space-y-3 text-sm leading-7 text-white/72">
                <p>Segunda a sexta: 07:20 às 18:00</p>
                <p>Sábado: 07:00 às 12:30</p>
                <p>Domingo: fechado</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/52 md:flex-row md:items-center md:justify-between">
            <p>© 2026 PeçAqui Auto Peças. Todos os direitos reservados.</p>
            <p>
              Desenvolvido por{" "}
              <a href="https://mundodigitalsolucoes.com.br" target="_blank" rel="noreferrer" className="font-semibold text-white transition hover:text-accent">
                Mundo Digital Soluções
              </a>
            </p>
          </div>
        </div>
      </footer>

      <a
        href={floatingWhatsAppHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Chamar no WhatsApp"
        className="fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[var(--shadow-premium)] transition duration-300 hover:-translate-y-1"
      >
        <MessageCircle className="size-6" />
      </a>

      <AnimatePresence>
        {lightboxIndex !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-brand-graphite/92 p-4 backdrop-blur-sm"
          >
            <button type="button" className="absolute inset-0" aria-label="Fechar galeria" onClick={() => setLightboxIndex(null)} />
            <div className="relative z-10 flex w-full max-w-6xl items-center gap-4">
              <button
                type="button"
                aria-label="Imagem anterior"
                onClick={() => setLightboxIndex((current) => (current === null ? 0 : (current - 1 + filteredGallery.length) % filteredGallery.length))}
                className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white md:flex"
              >
                <ChevronLeft className="size-5" />
              </button>

              <div className="mx-auto w-full overflow-hidden rounded-2xl border border-white/12 bg-white/6 p-3 shadow-[var(--shadow-premium)]">
                <img
                  src={filteredGallery[lightboxIndex].src}
                  alt={filteredGallery[lightboxIndex].alt}
                  className="max-h-[82vh] w-full rounded-xl object-contain"
                />
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-2 pt-4 text-white">
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-[0.1em] text-white/60">{filteredGallery[lightboxIndex].category}</div>
                    <div className="mt-1 text-sm text-white/78">{filteredGallery[lightboxIndex].alt}</div>
                  </div>
                  <button
                    type="button"
                    aria-label="Fechar"
                    onClick={() => setLightboxIndex(null)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                aria-label="Próxima imagem"
                onClick={() => setLightboxIndex((current) => (current === null ? 0 : (current + 1) % filteredGallery.length))}
                className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white md:flex"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function SiteHeader({ mobileMenuOpen, onToggleMenu, solid }: { mobileMenuOpen: boolean; onToggleMenu: () => void; solid: boolean }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 section-shell pt-4">
      <div className={`content-shell transition-all duration-300 ${solid ? "glass-panel rounded-2xl px-4 py-3 text-foreground" : "px-1 py-3 text-white"}`}>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:flex lg:items-center lg:justify-between">
          <a href="#home" className="flex min-w-0 items-center gap-3">
            <img src={logoPecaqui.url} alt="PeçAqui Auto Peças" className="h-11 w-auto shrink-0 md:h-12" />
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {[
              ["Home", "#home"],
              ["Empresa", "#empresa"],
              ["Serviços", "#servicos"],
              ["Troca de Óleo", "#troca-de-oleo"],
              ["Contato", "#contato"],
            ].map(([label, href]) => (
              <a key={label} href={href} className={`text-sm font-medium transition ${solid ? "text-foreground/80 hover:text-foreground" : "text-white/85 hover:text-white"}`}>
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-3">
            <Button asChild variant="hero" size="lg" className="hidden lg:inline-flex">
              <a href="#orcamento">Solicitar Orçamento</a>
            </Button>
            <button
              type="button"
              aria-label="Abrir menu"
              onClick={onToggleMenu}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-md border transition lg:hidden ${solid ? "border-border bg-background text-foreground" : "border-white/20 bg-white/10 text-white backdrop-blur-sm"}`}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen ? (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden lg:hidden">
              <div className="mt-4 grid gap-3 border-t border-border/70 pt-4">
                {[
                  ["Home", "#home"],
                  ["Empresa", "#empresa"],
                  ["Serviços", "#servicos"],
                  ["Troca de Óleo", "#troca-de-oleo"],
                  ["Contato", "#contato"],
                ].map(([label, href]) => (
                  <a key={label} href={href} className="text-sm font-medium text-foreground/85" onClick={onToggleMenu}>
                    {label}
                  </a>
                ))}
                <Button asChild variant="hero" size="lg" className="mt-2 w-full">
                  <a href="#orcamento" onClick={onToggleMenu}>
                    Solicitar Orçamento
                  </a>
                </Button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="space-y-4">
      <span className="inline-flex rounded-full bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary">{eyebrow}</span>
      <div className="space-y-3">
        <h2 className="max-w-4xl text-balance text-3xl font-extrabold md:text-5xl">{title}</h2>
        <p className="max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">{description}</p>
      </div>
    </div>
  );
}

function QuickMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-background/70 p-4">
      <div className="text-2xl font-extrabold text-primary">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-foreground">
      <span>{label}</span>
      {children}
    </label>
  );
}

function PolaroidCard({ src, alt, caption, rotate }: { src: string; alt: string; caption: string; rotate: string }) {
  return (
    <div className={`rounded-md bg-white p-3 text-brand-graphite shadow-[var(--shadow-soft)] ${rotate}`}>
      <img src={src} alt={alt} loading="lazy" className="aspect-[4/3] w-full rounded-sm object-cover" />
      <div className="px-1 pt-3 pb-2 text-sm font-semibold">{caption}</div>
    </div>
  );
}

function ContactRow({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
      <div className="flex size-10 items-center justify-center rounded-md bg-primary/8 text-primary">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">{label}</div>
        <div className="mt-1 text-sm leading-7 text-foreground/88">{value}</div>
      </div>
    </div>
  );
}

function FooterColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-white/52">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => {
          const external = item.href.startsWith("http") || item.href.startsWith("tel:");
          return (
            <li key={item.label}>
              <a href={item.href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className="text-sm text-white/72 transition hover:text-white">
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function buildQuoteLink(form: QuoteFormState) {
  const lines = [WHATSAPP_BASE_MESSAGE];

  if (form.brand.trim()) lines.push(`Marca do veículo: ${form.brand.trim()}`);
  if (form.model.trim()) lines.push(`Modelo: ${form.model.trim()}`);
  if (form.year.trim()) lines.push(`Ano: ${form.year.trim()}`);
  if (form.part.trim()) lines.push(`Peça desejada: ${form.part.trim()}`);

  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(lines.join("\n"))}`;
}
