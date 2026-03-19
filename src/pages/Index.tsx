import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { Calendar, Users, Camera, Mail, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMarkdown } from "@/hooks/useContent";
import { useJson } from "@/hooks/useContent";

type HomeData = {
  hero?: { title?: string; subtitle?: string; ctaPrimary?: string; ctaSecondary?: string };
  features?: { title?: string; subtitle?: string; items?: { title: string; description: string; link: string }[] };
  news?: { title?: string; subtitle?: string; cta?: string };
  about?: { title?: string; paragraph1?: string; paragraph2?: string; cta?: string; ctaLink?: string };
};

const Index = () => {
  const { data: homeContent } = useMarkdown<HomeData>("home.md");
  const { data: homeJson } = useJson<HomeData>("home.json");
  const { data: newsIndex } = useJson<{ slug: string; title: string; date: string; author: string; image?: string; excerpt?: string }[]>("news/index.json");

  const home = homeContent?.data ?? homeJson;
  const hero = home?.hero;
  const features = home?.features;
  const newsSection = home?.news;
  const about = home?.about;

  const newsItems = newsIndex ?? [];
  const latestNews = newsItems.slice(0, 3);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      <Seo title="Buurtvereniging De Steenstraat | Home" description="Samen bouwen we aan een sterke, gezellige buurt in Eersel. Bekijk activiteiten, nieuws en contactinformatie." url="https://bvdesteenstraat.nl/" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {hero?.title ?? "Welkom bij Buurtvereniging De Steenstraat in Eersel"}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {hero?.subtitle ?? "Samen bouwen we aan een sterke, gezellige buurt waar iedereen zich thuis voelt."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                <Link to="/word-lid">{hero?.ctaPrimary ?? "Word lid"}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-orange-600">
                <Link to="/calendar">{hero?.ctaSecondary ?? "Bekijk Buurtactiviteiten"}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{features?.title ?? "Wat wij doen"}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {features?.subtitle ?? "Onze buurtvereniging organiseert diverse activiteiten en zorgt voor een sterke gemeenschap."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {(features?.items ?? [
              { title: "Buurtactiviteiten", description: "Regelmatige evenementen zoals buurtfeesten, spelletjesavonden en gezamenlijke maaltijden.", link: "/calendar" },
              { title: "Fotogalerij", description: "Bekijk foto's van onze activiteiten en evenementen uit het verleden.", link: "/gallery" },
              { title: "Contact", description: "Neem contact met ons op voor vragen, suggesties of om lid te worden.", link: "/contact" },
            ]).map((item, i) => {
              const Icon = [Calendar, Camera, Mail][i] ?? Users;
              return (
                <Link key={item.link} to={item.link} className="block">
                  <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <Icon className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                      <CardTitle>{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{item.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{newsSection?.title ?? "Laatste nieuws"}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {newsSection?.subtitle ?? "Blijf op de hoogte van het laatste nieuws uit onze buurt"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {latestNews.map((item) => (
              <Link key={item.slug} to={`/news/${item.slug}`} className="block">
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className={"w-full max-h-48 object-contain rounded mb-4 " + (item.image === "/clubkas2025.jpg" ? "rotate-90" : "")}
                      />
                    )}
                    <div className="flex items-center mb-2">
                      <Newspaper className="h-5 w-5 text-orange-600 mr-2" />
                      <span className="text-sm text-gray-500">{formatDate(item.date)}</span>
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.excerpt ?? ""}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link to="/news">{newsSection?.cta ?? "Bekijk al het nieuws"}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{about?.title ?? "Over onze buurt"}</h2>
              <p className="text-lg text-gray-600 mb-6">
                {about?.paragraph1 ?? "De Steenstraat is een levendige wijk waar buren elkaar kennen en voor elkaar zorgen. Onze buurtvereniging bestaat al meer dan 40 jaar en organiseert het hele jaar door activiteiten voor jong en oud."}
              </p>
              <p className="text-lg text-gray-600 mb-8">
                {about?.paragraph2 ?? "Van jaarlijkse buurt BBQ tot schaatsen, van kerststukjes maken tot sieraden maken , van paaseieren zoeken tot pepernoten rapen en garage-sale, er is altijd wel iets te doen. Word lid en ontmoet je buren!"}
              </p>
              <Button asChild className="bg-orange-600 hover:bg-orange-700">
                <Link to={about?.ctaLink ?? "/contact"}>{about?.cta ?? "Meer informatie"}</Link>
              </Button>
            </div>
            <div className="bg-gradient-to-br from-orange-400 to-green-500 rounded-lg h-64 flex items-center justify-center">
              <Users className="h-24 w-24 text-white" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
