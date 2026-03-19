import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { useJson } from "@/hooks/useContent";
import { useMarkdown } from "@/hooks/useContent";

const NewsDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: newsIndex } = useJson<{ slug: string; title: string; date: string; author: string; image?: string; excerpt?: string }[]>("news/index.json");
  const { data: content, loading, error } = useMarkdown(`news/${slug}.md`);

  const meta = newsIndex?.find((n) => n.slug === slug);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
  };

  if (!slug || (!meta && !loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Bericht niet gevonden</h1>
          <p className="text-gray-600 mb-4">Het gevraagde nieuwsbericht bestaat niet of is verwijderd.</p>
          <Button asChild>
            <Link to="/news">Terug naar nieuws</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (error && !meta) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Bericht niet gevonden</h1>
          <p className="text-gray-600 mb-4">Het gevraagde nieuwsbericht bestaat niet of is verwijderd.</p>
          <Button asChild>
            <Link to="/news">Terug naar nieuws</Link>
          </Button>
        </div>
      </div>
    );
  }

  const title = meta?.title ?? slug;
  const dateStr = meta?.date ? formatDate(meta.date) : "";
  const author = meta?.author ?? "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      <Seo
        title={`${title} | Buurtvereniging De Steenstraat`}
        description={meta?.excerpt ?? content?.content?.substring(0, 160) ?? ""}
        url={`https://bvdesteenstraat.nl/news/${slug}`}
        image={meta?.image}
        article={meta?.date ? { headline: title, datePublished: meta.date, author: meta.author } : undefined}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Button asChild variant="ghost">
            <Link to="/news">Terug naar nieuws</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              {dateStr} {author ? `— ${author}` : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {meta?.image && (
              <div className="mb-4">
                <img
                  src={meta.image}
                  alt={title}
                  className={"w-full rounded " + (meta.image === "/clubkas2025.jpg" ? "rotate-90" : "")}
                />
              </div>
            )}
            <div className="text-gray-800">
              {content?.content ? (
                <MarkdownRenderer content={content.content} />
              ) : (
                <p>{loading ? "Laden..." : "Geen inhoud beschikbaar."}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewsDetail;
