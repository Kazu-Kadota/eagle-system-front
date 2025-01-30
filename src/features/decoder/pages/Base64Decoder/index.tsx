import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Base64DecoderSchema,
  schema,
} from 'src/features/decoder/pages/Base64Decoder/schema'
import { Base64DecoderUI } from 'src/features/decoder/pages/Base64Decoder/ui'
import { gunzipBase64 } from 'src/utils/base64'
import { copyString } from 'src/utils/clipboard'
import { getErrorMsg } from 'src/utils/errors'

export function Base64DecordPage() {
  const [isLoading, setLoading] = useState(false)
  const [decodedValue, setDecodedValue] = useState<string | null>(null)

  const { control, setError, handleSubmit } = useForm<Base64DecoderSchema>({
    resolver: zodResolver(schema),
  })

  const handleCopyDecodedValue = () =>
    copyString(decodedValue ?? '', {
      successMsg: 'Texto decodificado copiado com sucesso!',
    })

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true)

      const decoded = await gunzipBase64(data.encodedValue, { prettify: true })

      setDecodedValue(decoded)
    } catch (error) {
      console.log(error)
      setError('encodedValue', { message: getErrorMsg(error) })
    } finally {
      setLoading(false)
    }
  })

  return (
    <Base64DecoderUI
      isLoading={isLoading}
      control={control}
      decodedValue={decodedValue}
      onSubmit={onSubmit}
      onCopyDecodedValue={handleCopyDecodedValue}
    />
  )
}
