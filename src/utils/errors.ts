export const getErrorMsg = (
  error: unknown,
  defaultMsg = 'Não foi possível concluir a operação'
) => {
  const msg = error instanceof Error && error.message;

  return msg || defaultMsg;
};
