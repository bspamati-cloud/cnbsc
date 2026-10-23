// js/supabase-client.js
// Configuración centralizada de Supabase para toda la plataforma

const SUPABASE_URL = "https://tzjyhuqmhpbgwdbzesyw.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Oy_I1GmK4d350RvLgrCo0w_IPTEFnej";

// Inicializamos el cliente global de Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);