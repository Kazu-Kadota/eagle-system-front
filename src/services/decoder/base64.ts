import { env } from '@/env';
import { request } from '@/utils/request';

type DecodeBase64Response = {
  decodedValue: string;
};

export async function decodeBase64(encodedValue: string) {
  const { data } = await request.post<DecodeBase64Response>(
    env.NEXT_PUBLIC_API_DECODER_URL,
    '/decode/base64',
    { body: { encodedValue } },
  );

  return data.decodedValue;
}
