import dayjs from 'dayjs'
import { Analysis, PersonAnalysis, VehicleAnalysis } from 'src/models'

export const personNameKeys: { [key in keyof PersonAnalysis]: string } = {
  analysis_info: 'Descrição da análise',
  analysis_result: 'Resultado da análise',
  analysis_type: 'Tipo da análise',
  birth_date: 'Data de nascimento',
  category_cnh: 'Categoria da CNH',
  cnh: 'CNH',
  company_name: 'Nome da empresa',
  created_at: 'Data de solicitação',
  document: 'CPF',
  person_id: 'ID da pessoa',
  expire_at_cnh: 'Data de expiração da CNH',
  father_name: 'Nome do pai',
  mother_name: 'Nome da mãe',
  name: 'Nome',
  naturalness: 'Naturalidade',
  request_id: 'ID da análise',
  rg: 'RG',
  security_number_cnh: 'Número de segurança da CNH',
  state_rg: 'Estado de Emissão do RG',
  status: 'Status',
  user_id: 'ID do usuário',
  person_analysis_type: 'Tipo da ánalise',
  region_type: 'Tipo da região',
  combo_number: 'Número de combo',
  finished_at: 'Data de finalização',
  region: 'Região',
  updated_at: 'Data de atualização',
}

export const vehicleNameKeys: { [key in keyof VehicleAnalysis]: string } = {
  analysis_info: 'Descrição da análise',
  analysis_result: 'Resultado da análise',
  analysis_type: 'Tipo da análise',
  chassis: 'Chassi',
  company_name: 'Nome da empresa',
  created_at: 'Data de solicitação',
  driver_name: 'Nome do motorista',
  owner_document: 'CPF/CNPJ do Proprietário',
  owner_name: 'Nome do Proprietário',
  plate: 'Placa',
  plate_state: 'Estado de emissão da placa',
  renavam: 'Renavam',
  request_id: 'ID da análise',
  status: 'Status',
  user_id: 'ID do usuário',
  vehicle_id: 'ID da pessoa',
  vehicle_type: 'Tipo de veículo',
  updated_at: 'Data de atualização',
}

export const keysToRemove = [
  'created_at',
  'updated_at',
  'analysis_type',
  'status',
  'person_id',
  'user_id',
  'company_name',
  'request_id',
  'vehicle_id',
  'person_analysis_type',
  'region_type',
  'combo_number',
  'region',
]

export const keysDateToFormat = [
  'birth_date',
  'expire_at_cnh',
  'finished_at',
  'created_at',
  'updated_at',
]

const formatValue = (key: string, value: string) => {
  if (keysDateToFormat.includes(key)) {
    return dayjs(value).format('DD/MM/YYYY')
  }

  return value
}

const getClipboardString = <T extends Analysis>(
  item: T,
  nameKeys: Record<string, string>,
) =>
  Object.entries(item).reduce((string, [key, value]) => {
    if (keysToRemove.includes(key)) {
      return string
    }

    const name = nameKeys[key] ?? key

    const label = `${string}${name.toUpperCase()}`
    const uppercaseValue = String(value).toUpperCase()
    const formattedValue = formatValue(key, uppercaseValue)

    return `${label}: ${formattedValue}\n`
  }, '')

export const copyPersonToClipboard = (person: Analysis) =>
  navigator.clipboard.writeText(getClipboardString(person, personNameKeys))

export const copyVehicleToClipboard = (vehicle: Analysis) =>
  navigator.clipboard.writeText(getClipboardString(vehicle, vehicleNameKeys))
