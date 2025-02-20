import { schema } from '@/app/(protected)/decodificador/schema';
import { getErrorMsg } from '@/utils/errors';
import { prettifyString } from '@/utils/pretty';
import zlib from 'node:zlib';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { encodedValue } = schema.parse(body);

    const decodedValue = zlib
      .gunzipSync(Buffer.from(encodedValue, 'base64'))
      .toString('utf-8');

    return Response.json({ decodedValue: prettifyString(decodedValue) });
  } catch (error) {
    return new Response(getErrorMsg(error), { status: 400 });
  }
}
