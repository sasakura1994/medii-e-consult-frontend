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
  seminar_date: Date;
  seminar_start_time: Date;
  seminar_end_time: Date;
  movie_url: string;
  zoom_url: string;
  image_url: string;
  created_at: Date;
  updated_at: Date;
  seminar_reviews: SeminarReviewEntityType[];
};
