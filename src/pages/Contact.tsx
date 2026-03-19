import { useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { ArrowLeft, Mail, Send, Facebook } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { sendContactEmail } from "@/lib/emailjs";
import { useMarkdown, useJson } from "@/hooks/useContent";

interface ContactData {
  title?: string;
  subtitle?: string;
  contactTitle?: string;
  email?: string;
  emailNote?: string;
  facebookUrl?: string;
  facebookLabel?: string;
  facebookNote?: string;
  boardTitle?: string;
  board?: { name: string; role: string }[];
  formTitle?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: mdData } = useMarkdown<ContactData>("contact.md");
  const { data: jsonData } = useJson<ContactData>("contact.json");
  const data = mdData?.data ?? jsonData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await sendContactEmail(formData);

      if (result.success) {
        toast({
          title: "Bericht verzonden!",
          description: "Uw bericht is succesvol verzonden. We nemen binnen 24 uur contact met u op.",
        });
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        toast({
          title: "Fout bij verzenden",
          description: "Er is een fout opgetreden bij het verzenden van uw bericht. Probeer het later opnieuw.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Fout bij verzenden",
        description: "Er is een fout opgetreden bij het verzenden van uw bericht. Probeer het later opnieuw.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = data?.title ?? "Contact";
  const subtitle = data?.subtitle ?? "Neem contact met ons op voor vragen, suggesties of om lid te worden";
  const contactTitle = data?.contactTitle ?? "Contactgegevens";
  const email = data?.email ?? "buurtverenigingdesteenstraat@outlook.com";
  const emailNote = data?.emailNote ?? "We reageren binnen 24 uur";
  const facebookUrl = data?.facebookUrl ?? "https://www.facebook.com/groups/396194063895407";
  const facebookLabel = data?.facebookLabel ?? "Volg ons op Facebook";
  const facebookNote = data?.facebookNote ?? "Blijf op de hoogte van onze activiteiten";
  const boardTitle = data?.boardTitle ?? "Bestuur";
  const board = data?.board ?? [
    { name: "Stijn van de Ven", role: "Voorzitter" },
    { name: "Edwina Treebusch", role: "Secretaris" },
    { name: "Ivo Beerens", role: "Penningmeester" },
    { name: "Nina Romme", role: "Algemeen bestuurslid" },
    { name: "Rik Bosvelt", role: "Algemeen bestuurslid" },
  ];
  const formTitle = data?.formTitle ?? "Stuur ons een bericht";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      <Seo title="Contact | Buurtvereniging De Steenstraat" description="Neem contact op met Buurtvereniging De Steenstraat voor vragen, nieuws of lidmaatschap." url="https://bvdesteenstraat.nl/contact" />

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

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">{contactTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-orange-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">{email}</p>
                    <p className="text-sm text-gray-500">{emailNote}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Facebook className="h-6 w-6 text-orange-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Facebook</h3>
                    <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-orange-600 transition-colors">
                      {facebookLabel}
                    </a>
                    <p className="text-sm text-gray-500">{facebookNote}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">{boardTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {board.map((member) => (
                  <div key={member.name}>
                    <h4 className="font-semibold text-gray-900">{member.name}</h4>
                    <p className="text-gray-600">{member.role}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">{formTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Naam *</Label>
                    <Input id="name" name="name" type="text" required value={formData.name} onChange={handleInputChange} placeholder="Uw volledige naam" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} placeholder="uw.email@example.com" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Telefoon</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="06-12345678" />
                </div>

                <div>
                  <Label htmlFor="subject">Onderwerp *</Label>
                  <Input id="subject" name="subject" type="text" required value={formData.subject} onChange={handleInputChange} placeholder="Waar gaat uw bericht over?" />
                </div>

                <div>
                  <Label htmlFor="message">Bericht *</Label>
                  <Textarea id="message" name="message" required value={formData.message} onChange={handleInputChange} placeholder="Tot uw bericht hier..." rows={6} />
                </div>

                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isSubmitting}>
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Versturen..." : "Verstuur bericht"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
