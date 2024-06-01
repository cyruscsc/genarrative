export interface User {
  id: string
  email: string
  display_name: string
  color_mode: 'light' | 'dark'
  temperature: number
  max_words: number
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

export interface ServerError {
  detail: string
}
