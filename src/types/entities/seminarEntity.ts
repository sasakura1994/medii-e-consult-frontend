import { SeminarReviewEntityType } from "./seminarReviewEntity";

export type SeminarEntityType = {
  uid: number;
  seminar_id: string;
  account_id: string;
  subject: string;
  description: string;
  doctor_name: string;
  doctor_profile: string;
  is_consult_available: boolean;
  seminar_date: string;
  seminar_start_time: string;
  seminar_end_time: string;
  movie_url: string;
  zoom_url: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  seminar_reviews: SeminarReviewEntityType[];
};
