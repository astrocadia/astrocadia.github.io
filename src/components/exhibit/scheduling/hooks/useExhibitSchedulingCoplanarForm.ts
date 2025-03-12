import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Event name is required')
    .max(50, 'Event name must be under 50 characters'),
});

type FormSchemaType = z.infer<typeof formSchema>;

export const useExhibitSchedulingCoplanarForm = (
  initialValues: Partial<FormSchemaType> = {}
) => {
  const form = useForm<FormSchemaType>({
    mode: 'all',
    defaultValues: initialValues,
    resolver: zodResolver(formSchema),
  });

  return form;
};
