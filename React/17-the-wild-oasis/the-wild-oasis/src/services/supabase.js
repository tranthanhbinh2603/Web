import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ldzrmszmzadoliitmkgq.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkenJtc3ptemFkb2xpaXRta2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI1MDE1OTgsImV4cCI6MjAzODA3NzU5OH0.lga-g0VhxhdhsbPfkBdHs2X5NTqBPisRC9QfUxyXvMg";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
