import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://lywvueqdldajoynbfwpp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5d3Z1ZXFkbGRham95bmJmd3BwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MjkyNzgsImV4cCI6MjA1ODQwNTI3OH0.UGK_Z4x0hREzbcK9kWqsiaygprEIdyWWsTwVSY3G_WE";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase