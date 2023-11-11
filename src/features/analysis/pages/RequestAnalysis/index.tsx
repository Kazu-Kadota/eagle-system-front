import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCompanies } from 'src/features/auth'
import { AnalysisType, RegionPersonAnalysis, UserType } from 'src/models'
import { useAuthStore } from 'src/store/auth'
import { getErrorMsg } from 'src/utils/errors'
import { submitFormPromise } from 'src/utils/form'
import { hasUserType } from 'src/utils/userType'
import {
  requestAnalysisCombo,
  requestAnalysisPerson,
  requestAnalysisPlateHistory,
  requestAnalysisVehicle,
} from '../../services/request'
import {
  AnalysisArrayVehicleSchema,
  AnalysisPersonSchema,
  PlateHistorySchema,
  analysisArrayVehicleSchema,
  analysisPersonSchema,
  plateHistorySchema,
} from './schema'
import { RequestAnalysisUI } from './ui'
import {
  defaultPerson,
  defaultPlateHistory,
  defaultVehicle,
  preparePersonAnalysis,
  preparePersonData,
  prepareVehicleData,
} from './utils'
import { useModal } from 'src/store/modal'

export type RequestAnalysisParams = {
  analysisType: AnalysisType
}

export function RequestAnalysisPage() {
  const modal = useModal()
  const { user } = useAuthStore()

  const [searchParams] = useSearchParams()

  const [analysisType, setAnalysisType] = useState(
    (searchParams.get('analysisType') as AnalysisType) ?? AnalysisType.PERSON,
  )
  const [personAnalysis, setPersonAnalysis] = useState<RegionPersonAnalysis[]>(
    [],
  )
  const [vehicleAnalysisType, setVehicleAnalysisType] = useState(
    AnalysisType.VEHICLE,
  )

  const [analysisTypeLoading, setAnaysisTypeLoading] =
    useState<AnalysisType | null>(null)

  const formValuesOnlyForValidation = {
    userType: user.user_type,
    analysisType,
  }

  const { companiesSelectItems, isLoading: companiesLoading } = useCompanies({
    enabled: hasUserType(user.user_type, UserType.ADMIN),
  })

  const { control: controlPerson, handleSubmit: handleSubmitPerson } =
    useForm<AnalysisPersonSchema>({
      resolver: zodResolver(analysisPersonSchema),
      values: { ...defaultPerson, ...formValuesOnlyForValidation },
    })

  const { control: controlVehicle, handleSubmit: handleSubmitVehicle } =
    useForm<AnalysisArrayVehicleSchema>({
      resolver: zodResolver(analysisArrayVehicleSchema),
      values: {
        vehicles: [{ ...defaultVehicle, ...formValuesOnlyForValidation }],
      },
    })

  const {
    fields: fieldsVehicle,
    append: appendVehicle,
    remove: removeVehicle,
  } = useFieldArray({
    name: 'vehicles',
    control: controlVehicle,
  })

  const {
    control: controlPlateHistory,
    handleSubmit: handleSubmitPlateHistory,
  } = useForm<PlateHistorySchema>({
    resolver: zodResolver(plateHistorySchema),
    values: { ...defaultPlateHistory, ...formValuesOnlyForValidation },
  })

  const onSuccessRequestAnalysis = () => {
    modal.open({
      title: 'Solicitação enviada!',
      buttons: [
        { children: 'Fazer outra solicitação' },
        { children: 'Ir para página inicial' },
      ],
    })
  }

  const onErrorRequestAnalysis = (error: unknown) =>
    toast.error(
      getErrorMsg(
        error,
        'Não foi possível solicitar a análise, verfique os dados e tente novamente.',
      ),
    )

  const onRequestPersonAnalysis = async (data: AnalysisPersonSchema) => {
    try {
      setAnaysisTypeLoading(AnalysisType.PERSON)

      await requestAnalysisPerson({
        person: preparePersonData(data),
        person_analysis: preparePersonAnalysis(
          personAnalysis,
          AnalysisType.PERSON,
        ),
      })

      onSuccessRequestAnalysis()
    } catch (error) {
      onErrorRequestAnalysis(error)
    } finally {
      setAnaysisTypeLoading(null)
    }
  }

  const onRequestVehicleAnalysis = async ({
    vehicles: [data],
  }: AnalysisArrayVehicleSchema) => {
    try {
      setAnaysisTypeLoading(AnalysisType.VEHICLE)

      await requestAnalysisVehicle(prepareVehicleData(data))

      onSuccessRequestAnalysis()
    } catch (error) {
      onErrorRequestAnalysis(error)
    } finally {
      setAnaysisTypeLoading(null)
    }
  }

  const onRequestComboAnalysis = async () => {
    const [personData, vehiclesData] = await Promise.all([
      submitFormPromise(handleSubmitPerson),
      submitFormPromise(handleSubmitVehicle),
    ])

    if (!personData || !vehiclesData) {
      return
    }

    try {
      setAnaysisTypeLoading(AnalysisType.COMBO)

      await requestAnalysisCombo({
        combo_number: vehiclesData.vehicles.length,
        person: preparePersonData(personData),
        person_analysis: preparePersonAnalysis(
          personAnalysis,
          AnalysisType.COMBO,
        ),
        vehicles: vehiclesData.vehicles.map((data) =>
          prepareVehicleData(data, personData),
        ),
      })

      onSuccessRequestAnalysis()
    } catch (error) {
      onErrorRequestAnalysis(error)
    } finally {
      setAnaysisTypeLoading(null)
    }
  }

  const onRequestPlateHistoryAnalysis = async (data: PlateHistorySchema) => {
    try {
      setAnaysisTypeLoading(AnalysisType.VEHICLE_PLATE_HISTORY)

      await requestAnalysisPlateHistory({
        plate: data.plate,
        plate_state: data.plate_state,
        company_name: data.company_name,
        owner_document: data.owner_document,
        owner_name: data.owner_name,
      })

      onSuccessRequestAnalysis()
    } catch (error) {
      onErrorRequestAnalysis(error)
    } finally {
      setAnaysisTypeLoading(null)
    }
  }

  const handleAddVehicleForm = () =>
    appendVehicle({ ...defaultVehicle, ...formValuesOnlyForValidation })

  const handleChangePersonAnalysis = (analysis: RegionPersonAnalysis[]) => {
    setPersonAnalysis(analysis)
    setVehicleAnalysisType(AnalysisType.VEHICLE)
  }

  return (
    <RequestAnalysisUI
      userType={user.user_type}
      analysisType={analysisType}
      personAnalysis={personAnalysis}
      vehicleAnalysisType={vehicleAnalysisType}
      analysisTypeLoading={analysisTypeLoading}
      fieldsVehicle={fieldsVehicle}
      companiesLoading={companiesLoading}
      companiesSelectItems={companiesSelectItems}
      controlPerson={controlPerson}
      controlVehicle={controlVehicle}
      controlPlateHistory={controlPlateHistory}
      onChangePersonAnalysis={handleChangePersonAnalysis}
      onChangeVehicleAnalysisType={setVehicleAnalysisType}
      onChangeAnalysisType={setAnalysisType}
      onRequestPersonAnalysis={handleSubmitPerson(onRequestPersonAnalysis)}
      onRequestComboAnalysis={onRequestComboAnalysis}
      onRequestVehicleAnalysis={handleSubmitVehicle(onRequestVehicleAnalysis)}
      onRequestPlateHistoryAnalysis={handleSubmitPlateHistory(
        onRequestPlateHistoryAnalysis,
      )}
      addVehicleForm={handleAddVehicleForm}
      removeVehicleForm={removeVehicle}
    />
  )
}
