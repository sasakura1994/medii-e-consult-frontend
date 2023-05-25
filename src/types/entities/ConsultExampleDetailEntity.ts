import { ConsultExampleEntity } from './ConsultExampleEntity';

export type ConsultExampleDetailEntity = Pick<
  ConsultExampleEntity,
  | 'example_id'
  | 'gender'
  | 'title'
  | 'category_name'
  | 'speciality_code'
  | 'age'
  | 'background'
  | 'disease_name'
  | 'like_count'
  | 'comment_count'
  | 'all_like_count'
  | 'all_comment_count'
  | 'first_answer_minutes'
  | 'published_date'
  | 'consultant_date'
  | 'created_date'
> & {
  is_liked: boolean;
};
