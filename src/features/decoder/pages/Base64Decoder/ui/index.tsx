import { Control } from 'react-hook-form'
import { Box, Button, ControlledTextArea, TextArea } from 'src/components'
import { Base64DecoderSchema } from 'src/features/decoder/pages/Base64Decoder/schema'

interface Props {
  isLoading: boolean
  control: Control<Base64DecoderSchema>
  decodedValue: string | null
  onSubmit: () => void
  onCopyDecodedValue: () => void
}

export function Base64DecoderUI({
  isLoading,
  control,
  decodedValue,
  onSubmit,
  onCopyDecodedValue,
}: Props) {
  return (
    <Box title="Decodificador" className="">
      <h2 className="mb-5 flex items-center gap-2 text-sm text-primary text-opacity-60">
        Preencha o campo abaixo para decodificar o texto.
      </h2>
      <form className="flex flex-col gap-3 sm:gap-4" onSubmit={onSubmit}>
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
          loading={isLoading}
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
            type="submit"
            className="mt-3 min-w-[10rem] self-center sm:mt-0"
            loading={isLoading}
            onClick={onCopyDecodedValue}
          >
            Copiar
          </Button>
        </div>
      )}
    </Box>
  )
}
