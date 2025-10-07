import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OfferRequest {
  roomSize: string;
  lighting: string;
  email: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { roomSize, lighting, email, message }: OfferRequest = await req.json();

    const lightingText = lighting === "spots" ? "LED Spots" : 
                        lighting === "strips" ? "LED Strips (indirekte Beleuchtung)" : 
                        lighting === "hanging" ? "Hängelampe" : 
                        "Keine Beleuchtung";

    console.log("Sending offer request to spanndeckenking@gmail.com", { roomSize, lighting, email });

    const { data, error } = await resend.emails.send({
      from: "Spanndeckenking Website <onboarding@resend.dev>",
      to: ["paulfast7799@gmail.com"],
      subject: `Neue Angebotsanfrage - ${roomSize}m²`,
      html: `
        <h2>Neue Angebotsanfrage über den Rechner</h2>
        <p><strong>Raumgröße:</strong> ${roomSize} m²</p>
        <p><strong>Beleuchtung:</strong> ${lightingText}</p>
        <p><strong>Kunden-E-Mail:</strong> ${email}</p>
        ${message ? `<p><strong>Nachricht:</strong> ${message}</p>` : ''}
        <hr>
        <p><em>Bitte senden Sie dem Kunden ein persönliches Angebot an: ${email}</em></p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      throw error;
    }

    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-offer function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
