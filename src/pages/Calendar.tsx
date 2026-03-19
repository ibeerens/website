import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { ArrowLeft, Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMarkdown, useJson } from "@/hooks/useContent";

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
}

interface CalendarData {
  title?: string;
  subtitle?: string;
  ctaTitle?: string;
  ctaText?: string;
  ctaButton?: string;
  events?: CalendarEvent[];
}

const Calendar = () => {
  const { data: mdData } = useMarkdown<CalendarData>("calendar.md");
  const { data: jsonData } = useJson<CalendarData>("calendar.json");
  // Prefer markdown; fall back to JSON if markdown has no events (e.g. fetch/parse issue)
  const mdEvents = mdData?.data?.events ?? [];
  const data = mdEvents.length > 0 ? mdData?.data : jsonData;
  const events = data?.events ?? [];
  const title = data?.title ?? "Buurtactiviteiten";
  const subtitle = data?.subtitle ?? "Kom naar onze activiteiten en vergaderingen";
  const ctaTitle = data?.ctaTitle ?? "Suggesties voor activiteiten?";
  const ctaText = data?.ctaText ?? "Heb je ideeën voor nieuwe buurtactiviteiten? Laat het ons weten!";
  const ctaButton = data?.ctaButton ?? "Deel je idee";

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "Vergadering":
        return "bg-blue-100 text-blue-800";
      case "Evenement":
        return "bg-orange-100 text-orange-800";
      case "Activiteit":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("nl-NL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      <Seo title="Buurtactiviteiten | Buurtvereniging De Steenstraat" description="Overzicht van aankomende buurtactiviteiten, vergaderingen en evenementen in De Steenstraat." url="https://bvdesteenstraat.nl/calendar" />
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

        <div className="space-y-6">
          {events.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl text-gray-900">{event.title}</CardTitle>
                    <div className="flex items-center text-gray-600 mt-2 text-sm">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {formatDate(event.date)}
                    </div>
                  </div>
                  <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{ctaTitle}</h2>
          <p className="text-gray-600 mb-6">{ctaText}</p>
          <Button asChild className="bg-orange-600 hover:bg-orange-700">
            <Link to="/contact">{ctaButton}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
