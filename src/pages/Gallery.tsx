import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useJson } from "@/hooks/useContent";

interface Photo {
  id: number;
  src: string;
  title: string;
  description: string;
}

interface GalleryData {
  title?: string;
  subtitle?: string;
  ctaTitle?: string;
  ctaText?: string;
  ctaButton?: string;
  photos?: Photo[];
}

const Gallery = () => {
  const { data } = useJson<GalleryData>("gallery.json");
  const photos = data?.photos ?? [];
  const title = data?.title ?? "Fotogalerij";
  const subtitle = data?.subtitle ?? "Bekijk foto's van onze activiteiten en evenementen";
  const ctaTitle = data?.ctaTitle ?? "Wil je jouw foto's delen?";
  const ctaText = data?.ctaText ?? "Heb je mooie foto's van buurtactiviteiten? Stuur ze naar ons op en we plaatsen ze in de galerij!";
  const ctaButton = data?.ctaButton ?? "Stuur foto's";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      <Seo title="Fotogalerij | Buurtvereniging De Steenstraat" description="Foto's van buurtactiviteiten en evenementen in De Steenstraat." url="https://bvdesteenstraat.nl/gallery" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Terug naar home
            </Link>
          </Button>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{photo.title}</h3>
                <p className="text-gray-600 text-sm">{photo.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{ctaTitle}</h2>
          <p className="text-gray-600 mb-6">{ctaText}</p>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link to="/contact">{ctaButton}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
