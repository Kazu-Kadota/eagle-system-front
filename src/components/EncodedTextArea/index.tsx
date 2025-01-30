import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from 'src/components/Button'
import { TextArea, TextAreaProps } from 'src/components/TextArea'
import { gunzipBase64, isBase64, sanitizeBase64 } from 'src/utils/base64'
import { copyString } from 'src/utils/clipboard'
import { getErrorMsg } from 'src/utils/errors'

export function EncodedTextArea({
  label,
  value,
  defaultValue,
  ...rest
}: TextAreaProps) {
  const valueToCheck = value || defaultValue

  const [decodedValue, setDecodedValue] = useState<string | null>(null)

  const isValueBase64 = useMemo(
    () => (typeof valueToCheck === 'string' ? isBase64(valueToCheck) : false),
    [valueToCheck],
  )

  const onDecode = async () => {
    if (typeof valueToCheck !== 'string') {
      toast.error('O texto deve estar no formato base64 para ser decodificado')
      return
    }

    try {
      const decoded = await gunzipBase64(sanitizeBase64(valueToCheck), {
        prettify: true,
      })

      setDecodedValue(decoded)
    } catch (error) {
      toast.error(getErrorMsg(error))
    }
  }

  const onEncode = () => setDecodedValue(null)

  const handleCopyDecodedValue = () =>
    copyString(decodedValue ?? '', {
      successMsg: 'Texto decodificado copiado com sucesso!',
    })

  const renderButtons = () => {
    if (!isValueBase64) return

    if (decodedValue) {
      return (
        <div className="flex items-center gap-4">
          <Button
            theme="opaque"
            size="xsStrong"
            className="min-w-28"
            onClick={onEncode}
          >
            Limpar
          </Button>
          <Button
            theme="success"
            size="xsStrong"
            className="min-w-28"
            onClick={handleCopyDecodedValue}
          >
            Copiar
          </Button>
        </div>
      )
    }

    return (
      <Button
        theme="primary"
        size="xsStrong"
        className="min-w-28"
        onClick={onDecode}
      >
        Decodificar
      </Button>
    )
  }

  return (
    <TextArea
      {...rest}
      label={label}
      value={decodedValue ?? valueToCheck}
      labelRightElement={renderButtons()}
    />
  )
}
