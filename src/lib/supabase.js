import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rjcdyqkqwzmhbbanzwty.supabase.co'  
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqY2R5cWtxd3ptaGJiYW56d3R5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMjUxODcsImV4cCI6MjA4NTcwMTE4N30.BhIMoRJLN_hWMfRcWNz6dv_wearDaM9392gU3AUjQTA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)