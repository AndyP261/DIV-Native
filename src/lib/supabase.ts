import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = "https://qbmtybaztctktgrmpihd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFibXR5YmF6dGN0a3Rncm1waWhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MTIxMzUsImV4cCI6MjA2NTI4ODEzNX0.bvzgRyMLnYuxKIkWP2PGKX2Q6k6RGPBmyYTk_GeJle0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});