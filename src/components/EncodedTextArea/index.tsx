import { schema } from '@/app/(protected)/decodificador/schema';
import { TextArea, type TextAreaProps } from '@/components/TextArea';
import { decodeBase64 } from '@/services/decoder/base64';
import { isBase64 } from '@/utils/base64';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from 'src/components/Button';
import { copyString } from 'src/utils/clipboard';
import { getErrorMsg } from 'src/utils/errors';

export function EncodedTextArea({
  label,
  value,
  defaultValue,
  ...rest
}: TextAreaProps) {
  const valueToCheck = value || defaultValue;

  const [decodedValue, setDecodedValue] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const isValueBase64 = useMemo(
    () => (typeof valueToCheck === 'string' ? isBase64(valueToCheck) : false),
    [valueToCheck],
  );

  const onDecode = async () => {
    try {
      setLoading(true);

      const { encodedValue } = schema.parse({ encodedValue: valueToCheck });
      const decoded = await decodeBase64(encodedValue);

      setDecodedValue(decoded);
    } catch (error) {
      toast.error(getErrorMsg(error));
    } finally {
      setLoading(false);
    }
  };

  const onEncode = () => setDecodedValue(null);

  const handleCopyDecodedValue = () =>
    copyString(decodedValue ?? '', {
      successMsg: 'Texto decodificado copiado com sucesso!',
    });

  const renderButtons = () => {
    if (!isValueBase64) return;

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
      );
    }

    return (
      <Button
        theme="primary"
        size="xsStrong"
        className="min-w-28"
        loading={isLoading}
        onClick={onDecode}
      >
        Decodificar
      </Button>
    );
  };

  return (
    <TextArea
      {...rest}
      label={label}
      value={decodedValue ?? valueToCheck}
      labelRightElement={renderButtons()}
    />
  );
}
