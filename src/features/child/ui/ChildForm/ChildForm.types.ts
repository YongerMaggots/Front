import { ChildModel } from '@/entities/child/model';

export type ChildFormType = Pick<ChildModel.Child, 'name' | 'age' | 'gender' | 'surname'>;
