import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useJson } from "@/hooks/useContent";

interface NewsItem {
  slug: string;
  title: string;
  date: string;
  author: string;
  image?: string;
  excerpt?: string;
}

const News = () => {
  const { data: newsItems } = useJson<NewsItem[]>("news/index.json");
  const { data: pageContent } = useJson<{ pageTitle?: string; subtitle?: string; ctaTitle?: string; ctaText?: string; ctaButton?: string }>("news.json");

  const items = newsItems ?? [];
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      <Seo title="Nieuws | Buurtvereniging De Steenstraat" description="Laatste nieuws en updates van Buurtvereniging De Steenstraat in Eersel." url="https://bvdesteenstraat.nl/news" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Terug naar home
            </Link>
          </Button>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{pageContent?.pageTitle ?? "Laatste nieuws"}</h1>
          <p className="text-lg text-gray-600">{pageContent?.subtitle ?? "Blijf op de hoogte van het laatste nieuws uit onze buurt"}</p>
        </div>

        <div className="space-y-6">
          {items.map((item) => (
            <Link key={item.slug} to={`/news/${item.slug}`} className="block">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(item.date)}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {item.author}
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base">{item.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  {item.image && (
                    <div className="mb-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className={"w-full max-h-64 object-contain rounded-lg " + (item.image === "/clubkas2025.jpg" ? "rotate-90" : "")}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{pageContent?.ctaTitle ?? "Heb je nieuws te delen?"}</h2>
          <p className="text-gray-600 mb-6">{pageContent?.ctaText ?? "Stuur ons je nieuws en we plaatsen het op onze website!"}</p>
          <Button asChild className="bg-orange-600 hover:bg-orange-700">
            <Link to="/contact">{pageContent?.ctaButton ?? "Stuur nieuws"}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default News;
