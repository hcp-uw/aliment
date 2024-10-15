import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types'

const supabaseURL : string = 'https://inmxieqxzaeyeiqqisbk.supabase.co';
const APIKey : string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlubXhpZXF4emFleWVpcXFpc2JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyMjE5NjIsImV4cCI6MjAyODc5Nzk2Mn0.-mTJ1b-9D2gDCifOILgmO6gXqou9ighNBGlQ1g6a_tw';

// Creates supabase client that interacts with database
export const supabase = createClient(supabaseURL, APIKey);