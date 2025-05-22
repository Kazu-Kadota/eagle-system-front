import { z } from 'zod';

const numberSchema = z.coerce
  .number({ message: 'Insira um número válido' })
  .min(1, 'Insira um valor maior que zero');

export const schema = z.object({
  flags: z.array(
    z
      .object({
        flag: z.string(),
        selected: z.boolean(),
        fields: z.array(
          z.object({
            label: z.string(),
            placeholder: z.string(),
            name: z.string(),
            value: z.string(),
            type: z.string(),
          }),
        ),
      })
      .superRefine((value, ctx) => {
        if (!value.selected) return;

        value.fields.forEach((field, index) => {
          if (field.type === 'number') {
            const { error } = numberSchema.safeParse(field.value);

            if (error) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: [`fields.${index}.value`],
                message: error.flatten().formErrors.join(', '),
              });
            }
          }
        });
      }),
  ),
});

export type Schema = z.infer<typeof schema>;
