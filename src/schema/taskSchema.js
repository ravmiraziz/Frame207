import { z } from 'zod';

export const taskSchema = z.object({
  context: z.string().min(1, 'Контекст задачи обязателен').max(4096, 'Максимум 4096 символов'),
  isTeam: z.boolean().default(false),
  isRoutine: z.boolean().default(false),
  
  routineName: z.string().max(255, 'Максимум 255 символов').optional(),
  periodicity: z.string().optional(),
  routineDescription: z.string().max(1024, 'Максимум 1024 символов').optional(),
  
  assignees: z.array(z.object({
    id: z.string(),
    name: z.string(),
    avatar: z.string().optional()
  })).min(1, 'Укажите хотя бы одного исполнителя'),
  
  deadlineDate: z.string().optional(),
  deadlineTime: z.string().optional(),
  deadlineDays: z.string().optional(),
  
  theme: z.string().min(1, 'Укажите тему'),
  tags: z.array(z.string()).optional(),
  
  files: z.any().optional(),
}).superRefine((data, ctx) => {
  if (data.isRoutine) {
    if (!data.routineName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Укажите название рутинной задачи',
        path: ['routineName'],
      });
    }
    if (!data.periodicity) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Выберите периодичность',
        path: ['periodicity'],
      });
    }
  } else {
    if (!data.deadlineDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Укажите дату',
        path: ['deadlineDate'],
      });
    }
  }
});
