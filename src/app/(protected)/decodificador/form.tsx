'use client';

import {
  schema,
  type Base64DecoderSchema,
} from '@/app/(protected)/decodificador/schema';
import { Button } from '@/components/Button';
import { ControlledTextArea } from '@/components/ControlledTextArea';
import { TextArea } from '@/components/TextArea';
import { decodeBase64 } from '@/services/decoder/base64';
import { copyString } from '@/utils/clipboard';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

export function Base64DecordForm() {
  const { control, handleSubmit } = useForm<Base64DecoderSchema>({
    resolver: zodResolver(schema),
    defaultValues: { encodedValue: '' },
  });

  const {
    data: decodedValue = '',
    isPending,
    mutate: onSubmit,
  } = useMutation({
    mutationFn: (data: Base64DecoderSchema) => decodeBase64(data.encodedValue),
  });

  const handleCopyDecodedValue = () =>
    copyString(decodedValue ?? '', {
      successMsg: 'Texto decodificado copiado com sucesso!',
    });

  return (
    <>
      <form
        className="flex flex-col gap-3 sm:gap-4"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <ControlledTextArea
          control={control}
          name="encodedValue"
          label="Texto codificado"
        />

        <Button
          theme="primary"
          size="xsStrong"
          type="submit"
          className="mt-3 min-w-[10rem] self-center sm:mt-0"
          loading={isPending}
        >
          Decodificar
        </Button>
      </form>

      {decodedValue && (
        <div className="mt-4 flex flex-col gap-3 sm:gap-4">
          <TextArea
            disabled
            label="Texto decodificado"
            name="decodedValue"
            defaultValue={decodedValue}
            className="mt-4"
          />
          <Button
            theme="success"
            size="xsStrong"
            className="mt-3 min-w-[10rem] self-center sm:mt-0"
            onClick={handleCopyDecodedValue}
          >
            Copiar
          </Button>
        </div>
      )}
    </>
  );
}
